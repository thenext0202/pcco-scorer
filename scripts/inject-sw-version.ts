import fs from "fs";
import path from "path";

/**
 * Service Worker 파일에 빌드 타임스탬프를 주입
 * 빌드할 때마다 새로운 버전 번호를 생성하여 캐시 무효화
 */
function injectServiceWorkerVersion() {
  const swPath = path.join(process.cwd(), "public", "sw.js");

  if (!fs.existsSync(swPath)) {
    console.error("❌ sw.js not found at:", swPath);
    process.exit(1);
  }

  let swContent = fs.readFileSync(swPath, "utf-8");

  // 타임스탬프 기반 버전 생성
  const buildVersion = Date.now().toString();

  // BUILD_TIMESTAMP_PLACEHOLDER를 실제 타임스탬프로 치환
  swContent = swContent.replace(/BUILD_TIMESTAMP_PLACEHOLDER/g, buildVersion);

  fs.writeFileSync(swPath, swContent, "utf-8");

  console.log(`✅ Service Worker version injected: ${buildVersion}`);
}

injectServiceWorkerVersion();
