import { NextRequest, NextResponse } from 'next/server'
import { verifyAuth, getClientIp } from './auth'

export function createProtectedRoute(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async function protectedHandler(req: NextRequest) {
    try {
      // Handle CORS preflight
      if (req.method === 'OPTIONS') {
        return new NextResponse(null, {
          status: 204,
          headers: {
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
          },
        })
      }

      // Get token from cookie
      const token = req.cookies.get('auth_token')?.value
      if (!token) {
        return NextResponse.json({ error: 'Missing or invalid authorization token' }, { status: 401 })
      }

      // Verify authentication
      const isAuthenticated = await verifyAuth(req)
      if (!isAuthenticated) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 })
      }

      // Execute the handler
      const response = await handler(req)
      
      // Add security headers
      const headers = new Headers(response.headers)
      headers.set('X-Content-Type-Options', 'nosniff')
      headers.set('X-Frame-Options', 'DENY')
      headers.set('X-XSS-Protection', '1; mode=block')

      // Add CORS headers
      const origin = req.headers.get('origin')
      const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000']
      
      if (origin && allowedOrigins.includes(origin)) {
        headers.set('Access-Control-Allow-Origin', origin)
        headers.set('Access-Control-Allow-Credentials', 'true')
        headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, Cookie')
      }

      return new NextResponse(response.body, {
        status: response.status,
        headers
      })
    } catch (error) {
      console.error('Protected route error:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}

// Helper function to safely parse JSON
export function safeJSONParse(str: string) {
  try {
    return JSON.parse(str)
  } catch (error) {
    console.error('JSON Parse Error:', error)
    return null
  }
}
