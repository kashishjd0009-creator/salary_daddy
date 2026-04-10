const WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS = 10

type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now()
  let bucket = buckets.get(ip)

  if (!bucket || now >= bucket.resetAt) {
    bucket = { count: 0, resetAt: now + WINDOW_MS }
    buckets.set(ip, bucket)
  }

  if (bucket.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 }
  }

  bucket.count += 1
  return { allowed: true, remaining: MAX_REQUESTS - bucket.count }
}
