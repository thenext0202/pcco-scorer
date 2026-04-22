import { z } from "zod";

/**
 * 환경 변수 스키마
 */
const envSchema = z.object({
  // Anthropic API
  ANTHROPIC_API_KEY: z.string().min(1, "ANTHROPIC_API_KEY is required"),

  // Supabase
  NEXT_PUBLIC_SUPABASE_URL: z
    .string()
    .url("NEXT_PUBLIC_SUPABASE_URL must be a valid URL"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1, "NEXT_PUBLIC_SUPABASE_ANON_KEY is required"),

  // Node 환경
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
});

/**
 * 환경 변수 타입
 */
export type Env = z.infer<typeof envSchema>;

/**
 * 환경 변수 검증 및 파싱
 * 앱 시작 시점에 호출하여 누락된 환경 변수를 조기 발견
 */
export function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missing = error.errors.map((err) => err.path.join(".")).join(", ");
      throw new Error(
        `❌ Missing or invalid environment variables: ${missing}\n\n` +
          `Please check your .env.local file (development) or Railway Variables (production).`
      );
    }
    throw error;
  }
}

/**
 * 검증된 환경 변수
 * 서버 코드에서만 사용 (클라이언트에서는 process.env.NEXT_PUBLIC_* 직접 사용)
 */
let cachedEnv: Env | null = null;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = validateEnv();
  }
  return cachedEnv;
}
