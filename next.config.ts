import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Railway 배포 최적화

  // 실습서: public/workbooks/{slug}.html 을 /workbook/{slug} 주소로 연다
  async rewrites() {
    return [{ source: "/workbook/:slug", destination: "/workbooks/:slug.html" }];
  },
};

export default nextConfig;
