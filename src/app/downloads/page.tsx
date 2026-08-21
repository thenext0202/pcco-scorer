import fs from "fs";
import path from "path";
import type { Metadata } from "next";

import ResourceLibrary, { type SizedResourceGroup } from "@/components/ResourceLibrary";
import { courses } from "@/data/content";
import { resourceGroups } from "@/data/resources";

export const metadata: Metadata = {
  title: "강의 자료실 | AI 활용 실전 시리즈",
  description: "차수별 슬라이드·워크시트·실습 파일 다운로드",
};

/**
 * public/ 아래 실제 파일을 읽어 용량을 문자열로 만든다.
 * 파일이 없으면 null → 목록에서 제외되므로 죽은 링크가 노출되지 않는다.
 */
function readSize(publicPath: string): string | null {
  try {
    const abs = path.join(process.cwd(), "public", publicPath);
    const bytes = fs.statSync(abs).size;
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  } catch {
    return null;
  }
}

export default function DownloadsPage() {
  // 랜딩에 복습 섹션이 있는 강의만 "복습 보기" 링크를 건다 (없는 차수는 앵커가 죽으므로 숨김)
  const landedCourseIds = new Set(courses.map((course) => course.id));

  const groups: SizedResourceGroup[] = resourceGroups
    .map((group) => ({
      ...group,
      hasDetail: landedCourseIds.has(group.courseId),
      items: group.items.flatMap((item) => {
        const size = readSize(item.file);
        return size ? [{ ...item, size }] : [];
      }),
    }))
    .filter((group) => group.items.length > 0);

  return <ResourceLibrary groups={groups} />;
}
