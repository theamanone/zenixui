import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'
import { getClientIp } from './lib/auth'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

// Create rate limiter
const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(
    process.env.NODE_ENV === 'development' ? 100 : 10, 
    '10 s'
  ),
})

// Analytics tracking
async function trackVisit(ipAddress: string, userAgent: string, path: string) {
  // Skip tracking for admin, API, and static routes
  if (path.startsWith('/api/') || 
      path.startsWith('/admin/') || 
      path.startsWith('/_next/') || 
      path.match(/\.(ico|png|jpg|jpeg|gif|svg)$/)) {
    return
  }

  const date = new Date().toISOString().split('T')[0]
  const hour = new Date().getHours()

  try {
    // Run all Redis operations in parallel
    await Promise.all([
      // Increment total visits
      redis.incr(`stats:visits:total:${date}`),
      
      // Track unique visitors
      redis.pfadd(`stats:visitors:unique:${date}`, ipAddress),
      
      // Track hourly visits
      redis.incr(`stats:visits:hourly:${date}:${hour}`),
      
      // Update path visits and metadata
      (async () => {
        const pageTitle = getPageTitle(path)
        const pathKey = `stats:path:visits:${date}`
        const currentVisits = await redis.hget(pathKey, path) || '0'
        await Promise.all([
          redis.hset(pathKey, { [path]: (parseInt(currentVisits) + 1).toString() }),
          redis.hset(`stats:path:metadata:${path}`, {
            title: pageTitle,
            lastVisit: Date.now().toString()
          })
        ])
      })(),
      
      // Store visit details and trim list
      (async () => {
        await redis.lpush('stats:recent_visits', JSON.stringify({
          ip: ipAddress,
          userAgent,
          path,
          pageTitle: getPageTitle(path),
          timestamp: Date.now()
        }))
        await redis.ltrim('stats:recent_visits', 0, 99)
      })()
    ])
  } catch (error) {
    console.error('Error tracking visit:', error)
  }
}

// Helper to get page titles
function getPageTitle(path: string): string {
  const titles: Record<string, string> = {
    '/': 'Home',
    '/components': 'Components',
    '/docs': 'Documentation',
    '/blog': 'Blog',
    '/pricing': 'Pricing'
  }
  return titles[path] || path
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Skip rate limiting for admin routes in development
  if (process.env.NODE_ENV === 'development' && (path.startsWith('/admin/') || path.startsWith('/api/admin/'))) {
    return NextResponse.next()
  }

  // Skip tracking and rate limiting for admin and API routes
  if (path.startsWith('/api/') || path.startsWith('/admin/')) {
    return NextResponse.next()
  }

  // Get IP and user agent
  const ip = getClientIp(request)
  const userAgent = request.headers.get('user-agent') || 'Unknown'

  try {
    // Apply rate limiting
    const { success, limit, reset, remaining } = await ratelimit.limit(ip)

    const response = success 
      ? NextResponse.next()
      : NextResponse.json(
          { error: 'Too many requests' },
          { status: 429, headers: { 'Retry-After': reset.toString() } }
        )

    // Add rate limit headers
    response.headers.set('X-RateLimit-Limit', limit.toString())
    response.headers.set('X-RateLimit-Remaining', remaining.toString())
    response.headers.set('X-RateLimit-Reset', reset.toString())

    // Track analytics only if rate limit passed and not an excluded path
    if (success) {
      // Track asynchronously without waiting
      trackVisit(ip, userAgent, path).catch(console.error)
    }

    return response
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.next()
  }
}
