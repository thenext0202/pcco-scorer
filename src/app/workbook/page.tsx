import fs from "fs";
import path from "path";
import type { Metadata } from "next";

import WorkbookShelf from "@/components/WorkbookShelf";
import { workbooks } from "@/data/workbooks";

export const metadata: Metadata = {
  title: "실습서 | AI 활용 실전 시리즈",
  description: "브라우저에서 바로 따라 하는 GOLD9 실습서 모음",
};

/** public/workbooks/{slug}.html 이 실제로 있는 실습서만 노출한다 (죽은 링크 방지) */
function exists(slug: string): boolean {
  try {
    return fs.statSync(path.join(process.cwd(), "public", "workbooks", `${slug}.html`)).isFile();
  } catch {
    return false;
  }
}

export default function WorkbookIndexPage() {
  return <WorkbookShelf workbooks={workbooks.filter((w) => exists(w.slug))} />;
}
