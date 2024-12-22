import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'default-secret-change-this-in-production'
)

export async function generateToken(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

export async function verifyAuth(req: NextRequest) {
  try {
    const token = req.cookies.get('auth_token')?.value
    if (!token) {
      return null
    }

    const payload = await verifyToken(token)

    if (!payload || !payload.username || !payload.role) {
      return null
    }

    return payload
  } catch (error) {
    console.error('Auth verification error:', error)
    return null
  }
}

// Rate limiting with memory store (for demo purposes)
const rateLimit = new Map()

export function checkRateLimit(ipAddress: string, limit: number = 100, window: number = 60000) {
  const now = Date.now()
  const windowStart = now - window

  if (!rateLimit.has(ipAddress)) {
    rateLimit.set(ipAddress, [now])
    return true
  }

  const requests = rateLimit.get(ipAddress).filter((time: number) => time > windowStart)
  requests.push(now)
  rateLimit.set(ipAddress, requests)

  return requests.length <= limit
}

// Get client IP address safely
export function getClientIp(req: NextRequest): string {
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }
  
  const realIp = req.headers.get('x-real-ip')
  if (realIp) {
    return realIp
  }

  return 'unknown'
}

// API Protection Middleware
export function withProtection(handler: Function) {
  return async (req: NextRequest) => {
    const ipAddress = getClientIp(req)

    // Check rate limit
    if (!checkRateLimit(ipAddress)) {
      return NextResponse.json(
        { error: 'Too Many Requests' },
        { status: 429 }
      )
    }

    // Verify authentication
    const isAuthenticated = await verifyAuth(req)
    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    try {
      return await handler(req)
    } catch (error) {
      console.error('API Error:', error)
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      )
    }
  }
}
