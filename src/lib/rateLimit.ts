/**
 * 간이 Rate Limiter (인메모리)
 * IP당 분당 최대 10회 요청 제한
 *
 * TODO: 프로덕션 환경에서는 Vercel KV나 Redis로 교체 필요
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1분 (ms)
const MAX_REQUESTS_PER_WINDOW = 10;

/**
 * Rate limit 체크
 * @param identifier - IP 주소 또는 고유 식별자
 * @returns 허용 여부
 */
export function checkRateLimit(identifier: string): {
  allowed: boolean;
  remaining: number;
  resetAt: number;
} {
  const now = Date.now();
  const entry = rateLimitMap.get(identifier);

  // 첫 요청이거나 윈도우가 만료된 경우
  if (!entry || now > entry.resetAt) {
    const newEntry: RateLimitEntry = {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    };
    rateLimitMap.set(identifier, newEntry);

    return {
      allowed: true,
      remaining: MAX_REQUESTS_PER_WINDOW - 1,
      resetAt: newEntry.resetAt,
    };
  }

  // 윈도우 내에서 요청 수 확인
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // 요청 수 증가
  entry.count += 1;
  rateLimitMap.set(identifier, entry);

  return {
    allowed: true,
    remaining: MAX_REQUESTS_PER_WINDOW - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * 주기적으로 만료된 엔트리 정리 (메모리 누수 방지)
 */
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);
