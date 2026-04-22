/**
 * 배포 전 환경 검증 스크립트
 * npm run preflight로 실행
 */

const requiredEnvVars = [
  "ANTHROPIC_API_KEY",
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
];

function checkEnvironmentVariables(): boolean {
  console.log("🔍 Checking environment variables...\n");

  const missing: string[] = [];

  for (const varName of requiredEnvVars) {
    if (!process.env[varName]) {
      missing.push(varName);
      console.error(`❌ ${varName} is not set`);
    } else {
      console.log(`✅ ${varName} is set`);
    }
  }

  if (missing.length > 0) {
    console.error("\n❌ Missing environment variables:");
    console.error("Please set them in your .env.local file or Railway Variables\n");
    return false;
  }

  console.log("\n✅ All required environment variables are set!\n");
  return true;
}

async function runPreflight() {
  console.log("🚀 Railway Deployment Preflight Check\n");

  // 환경 변수 확인
  const envOk = checkEnvironmentVariables();

  if (!envOk) {
    console.error("❌ Preflight failed: Environment variables missing\n");
    process.exit(1);
  }

  console.log("✅ Preflight check passed! Ready for deployment.\n");
  process.exit(0);
}

runPreflight().catch((error) => {
  console.error("❌ Preflight check failed:", error);
  process.exit(1);
});
