import { NextRequest, NextResponse } from 'next/server'
import { createProtectedRoute } from '@/lib/api-wrapper'
import { safeGet, safeLRange, safePFCount } from '@/lib/redis'

async function handler(req: NextRequest) {
  try {
    const date = new Date().toISOString().split('T')[0]
    
    // Get total visits for today
    const totalVisits = await safeGet(`stats:visits:total:${date}`) || 0

    // Get unique visitors for today
    const uniqueVisitors = await safePFCount(`stats:visitors:unique:${date}`) || 0

    // Get hourly visits
    const hourlyVisits = await Promise.all(
      Array.from({ length: 24 }, async (_, i) => ({
        hour: i.toString().padStart(2, '0'),
        visits: Number(await safeGet(`stats:visits:hourly:${date}:${i}`)) || 0
      }))
    )

    // Get recent visits (already parsed by safeLRange)
    const recentVisits = await safeLRange('stats:recent_visits', 0, 9) || []

    // Get popular pages (using mock data for now)
    const popularPages = [
      { path: '/', visits: 150 },
      { path: '/components', visits: 120 },
      { path: '/admin', visits: 80 },
      { path: '/docs', visits: 60 },
      { path: '/blog', visits: 40 }
    ]

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      hourlyVisits,
      popularPages,
      recentVisits
    })
  } catch (error) {
    console.error('Analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

// Export the protected handler
export const GET = createProtectedRoute(handler)
