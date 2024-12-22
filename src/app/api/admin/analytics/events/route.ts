import { NextRequest } from 'next/server'
import { Redis } from '@upstash/redis'
import { verifyAuth } from '@/lib/auth'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

async function getAnalyticsData() {
  const date = new Date().toISOString().split('T')[0]

  // Get latest stats
  const [totalVisits, uniqueVisitors, recentVisits] = await Promise.all([
    redis.get(`stats:visits:total:${date}`),
    redis.pfcount(`stats:visitors:unique:${date}`),
    redis.lrange('stats:recent_visits', 0, 9)
  ])

  // Get page visits
  const pathVisits = await redis.hgetall(`stats:path:visits:${date}`) || {}
  
  // Sort and get top 5 pages
  const sortedPages = Object.entries(pathVisits)
    .map(([path, visits]) => ({ path, visits: parseInt(visits || '0') }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 5)

  // Get metadata for popular pages
  const popularPages = await Promise.all(
    sortedPages.map(async ({ path, visits }) => {
      const metadata = await redis.hgetall(`stats:path:metadata:${path}`) || {}
      return {
        path,
        visits,
        title: metadata.title || path,
        lastVisit: metadata.lastVisit ? parseInt(metadata.lastVisit) : null
      }
    })
  )

  return {
    totalVisits: Number(totalVisits) || 0,
    uniqueVisitors: Number(uniqueVisitors) || 0,
    popularPages,
    recentVisits: recentVisits
      .map(visit => {
        try {
          return typeof visit === 'string' ? JSON.parse(visit) : visit
        } catch (e) {
          console.error('Error parsing visit:', e)
          return null
        }
      })
      .filter(Boolean)
  }
}

// This route has been deprecated in favor of regular polling
// Analytics data is now fetched directly from /api/admin/analytics endpoint
// The frontend polls this endpoint every 30 seconds instead of using SSE
export async function GET() {
  return new Response('This endpoint has been deprecated', { status: 410 })
}
