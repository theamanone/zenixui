import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
})

export async function safeGet(key: string) {
  try {
    const value = await redis.get(key)
    return value
  } catch (error) {
    console.error(`Redis GET error for key ${key}:`, error)
    return null
  }
}

export async function safeSet(key: string, value: any) {
  try {
    await redis.set(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Redis SET error for key ${key}:`, error)
    return false
  }
}

export async function safeLPush(key: string, value: any) {
  try {
    await redis.lpush(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Redis LPUSH error for key ${key}:`, error)
    return false
  }
}

export async function safeLRange(key: string, start: number, stop: number) {
  try {
    const values = await redis.lrange(key, start, stop)
    return values.map(value => {
      try {
        return typeof value === 'string' ? JSON.parse(value) : value
      } catch {
        return value
      }
    })
  } catch (error) {
    console.error(`Redis LRANGE error for key ${key}:`, error)
    return []
  }
}

export async function safeIncr(key: string) {
  try {
    return await redis.incr(key)
  } catch (error) {
    console.error(`Redis INCR error for key ${key}:`, error)
    return 0
  }
}

export async function safePFAdd(key: string, value: string) {
  try {
    return await redis.pfadd(key, value)
  } catch (error) {
    console.error(`Redis PFADD error for key ${key}:`, error)
    return 0
  }
}

export async function safePFCount(key: string) {
  try {
    return await redis.pfcount(key)
  } catch (error) {
    console.error(`Redis PFCOUNT error for key ${key}:`, error)
    return 0
  }
}

export { redis }
