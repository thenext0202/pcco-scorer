// 16차 「데이터를 그린다」 — 02 데이터도 · 04 데이터용어사전 docx 생성 (docx-js)
// 사용: node make_docx.js [출력폴더]   (04는 같은 폴더의 04_데이터용어사전.md를 파싱해 만든다 — md가 원본)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle, ShadingType, PageBreak, HeightRule, VerticalAlign,
} = require("docx");

const OUT = process.argv[2] || __dirname;
const FONT = "Malgun Gothic";
const W = 10092; // A4 content width (DXA), margins 907
const TEAL = "0D9488", INK = "1A2430", MUTED = "6B7280", LINE = "D1D5DB";

const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 20, bold: o.bold, color: o.color, italics: o.italics });
const P = (children, o = {}) => new Paragraph({
  children: typeof children === "string" ? [run(children, o)] : children,
  spacing: { before: o.before ?? 60, after: o.after ?? 60, line: o.line ?? 300 },
  alignment: o.align, shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
  border: o.border, keepNext: o.keepNext,
});
const H1 = (t) => new Paragraph({ children: [run(t, { size: 34, bold: true, color: INK })], spacing: { before: 0, after: 80 } });
const H2 = (t, extra) => new Paragraph({
  children: [run(t, { size: 24, bold: true, color: TEAL })].concat(extra ? [run("  " + extra, { size: 18, color: MUTED })] : []),
  spacing: { before: 220, after: 80 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "B9E8E2", space: 2 } },
});
const H3 = (t) => new Paragraph({ children: [run(t, { size: 21, bold: true, color: INK })], spacing: { before: 160, after: 60 }, keepNext: true });
const NOTE = (t) => P([run("💡 " + t, { size: 18, color: "6B4A16" })], { shade: "FFFBEB", before: 40, after: 40 });
const PIN = (t) => P([run("📌 " + t, { size: 19, bold: true, color: "0F4A44" })], { shade: "F0FDFA", before: 80, after: 80 });
const BLANK = (label, n = 1) => {
  const out = [];
  for (let i = 0; i < n; i++) {
    out.push(new Paragraph({
      children: [run(i === 0 && label ? label + " " : "", { size: 19 })],
      spacing: { before: 80, after: 80, line: 360 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "9CA3AF", space: 1 } },
    }));
    if (i < n - 1) out.push(new Paragraph({ children: [], spacing: { before: 0, after: 0, line: 120 } }));
  }
  return out;
};
const PB = () => new Paragraph({ children: [new PageBreak()] });
const cellBorders = (c = LINE) => ({ top: { style: BorderStyle.SINGLE, size: 4, color: c }, bottom: { style: BorderStyle.SINGLE, size: 4, color: c }, left: { style: BorderStyle.SINGLE, size: 4, color: c }, right: { style: BorderStyle.SINGLE, size: 4, color: c } });
const cell = (content, width, o = {}) => new TableCell({
  width: { size: width, type: WidthType.DXA },
  borders: o.borders || cellBorders(),
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill, color: "auto" } : undefined,
  verticalAlign: o.valign || VerticalAlign.TOP,
  margins: { top: 60, bottom: 60, left: 100, right: 100 },
  children: (Array.isArray(content) ? content : [content]).map((x) =>
    typeof x === "string" ? P([run(x, { size: o.size || 18, bold: o.bold, color: o.color })], { before: 20, after: 20, line: 260 }) : x),
});
const table = (widths, rows, o = {}) => new Table({
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  columnWidths: widths,
  rows: rows.map((r, ri) => new TableRow({
    height: o.rowHeight && ri >= (o.headerRows || 0) ? { value: o.rowHeight, rule: HeightRule.ATLEAST } : undefined,
    tableHeader: ri < (o.headerRows || 0),
    children: r.map((c, ci) => (c instanceof TableCell ? c : cell(c, widths[ci], ri < (o.headerRows || 0) ? { fill: "E6F7F5", bold: true, color: TEAL, size: 17 } : {}))),
  })),
});
const T = (widths, header, rows, o = {}) => table(widths, [header, ...rows], { headerRows: 1, ...o });

// 표 그림(데이터도용): 제목 + 열 3칸(이름/종류/필수) n줄
const TBLPIC = (title, rows, width, o = {}) => {
  const c1 = Math.round(width * 0.36), c2 = Math.round(width * 0.34), c3 = width - c1 - c2;
  const head = [cell([P([run(title, { size: 17, bold: true, color: "FFFFFF" })], { before: 20, after: 20 })], width, { fill: o.fill || "0F172A", borders: cellBorders("0F172A") })];
  const sub = ["열 이름", "종류", "필수?"].map((h, i) => cell([P([run(h, { size: 14, bold: true, color: TEAL })], { before: 6, after: 6 })], [c1, c2, c3][i], { fill: "F0FDFA" }));
  const body = rows.map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 && x !== "" , color: INK })], { before: o.rowPad ?? 14, after: o.rowPad ?? 14, line: 250 })], [c1, c2, c3][i], { borders: cellBorders("374151") })));
  return new Table({
    width: { size: width, type: WidthType.DXA }, columnWidths: [c1, c2, c3],
    rows: [new TableRow({ children: [new TableCell({ columnSpan: 3, width: { size: width, type: WidthType.DXA }, borders: cellBorders("0F172A"), shading: { type: ShadingType.CLEAR, fill: o.fill || "0F172A", color: "auto" }, margins: { top: 40, bottom: 40, left: 100, right: 100 }, children: [P([run(title, { size: 17, bold: true, color: "FFFFFF" })], { before: 0, after: 0 })] })] }),
      new TableRow({ children: sub }), ...body.map((r) => new TableRow({ children: r }))],
  });
};

// ───────────────────────── 02 데이터도 ─────────────────────────
function makeWorksheet() {
  const ch = [];
  ch.push(H1("내 앱 데이터도 — 중급반 3강 숙제"));
  ch.push(P([run("숙제: 화면에 보이지만 화면이 만들지 않은 것들 — 그것들이 어느 표의 어느 열에 남는지, 표끼리 어떤 줄로 이어지는지, 누가 읽고 쓰고 고치고 지울 수 있는지를 종이에 그린다. 개발 환경 불필요, 종이와 펜이면 충분. ", { size: 18, color: MUTED }), run("구조도·화면도·데이터도 세 장이 「내 앱 설계 3종 세트」 — 다음 시즌은 이 세 장에서 시작합니다.", { size: 18, bold: true, color: TEAL })], { before: 0, after: 120 }));
  ch.push(P([run("이름: ______________　　날짜: ______________　　내 앱 이름(구조도·화면도와 같게): ____________________", { size: 19 })], { before: 60, after: 120 }));

  ch.push(H2("📖 작성 순서 — 이 다섯 단계면 됩니다", "1쪽 · 이 종이를 쓰는 법"));
  ch.push(T([1600, 6492, 2000], ["단계", "할 일", "어디에"], [
    ["① 남길 것 고르기", "내 앱 화면에 보이는 숫자·이름·글을 쏟아내고, 남는 것 / 흐르는 것으로 가른다", "3쪽 위"],
    ["② 표 이름 짓기", "남는 것을 \"한 종류의 사실\"끼리 묶어 표 2~3개에 이름을 붙인다", "3쪽 아래"],
    ["③ 열 적기", "표마다 열 이름 + 종류(글자·숫자·시각·참/거짓·덩어리) + 필수 여부를 적는다", "4쪽 위"],
    ["④ 줄 긋기", "어느 표의 어느 열이 어느 표를 가리키나 — 표 사이에 줄을 긋고 \"왜 갈랐나\" 한 줄", "4쪽 위 (같은 그림에)"],
    ["⑤ 문지기 표", "표마다 읽기·쓰기·고치기·지우기를 누가 하나 + 비밀 열쇠는 어디에 두나", "4쪽 아래"],
  ]));
  ch.push(NOTE("막막하면 2쪽의 완성 예시부터 보세요. 베끼는 게 아니라 형식을 빌리는 거예요."));
  ch.push(NOTE("화면도가 없어도 됩니다 — 지금 내 앱 화면을 떠올려 \"거기 보이는 숫자·이름·글\"만 적으면 ①이 시작됩니다. 아예 앱이 없으면 2쪽 소재(점심 메뉴 뽑기)로 시작하세요."));
  ch.push(NOTE("열이 많은 순서가 아니라 줄과 문지기를 빠뜨리지 않은 순서로 좋은 데이터도입니다."));

  ch.push(H2("치트시트 — 창고 해부 4단 (오늘 배운 눈)"));
  ch.push(T([1100, 1700, 7292], ["단", "실명", "스스로에게 던지는 질문"], [
    ["표", "테이블", "이 앱이 남겨야 하는 사실은 몇 종류인가? 한 줄(행)이 \"사실 하나\"인가?"],
    ["열", "컬럼", "각 사실에 무엇을 적나? 글자인가 숫자인가 시각인가? 꼭 있어야 하나?"],
    ["규칙", "제약·관계", "같은 값이 둘이면 안 되는 열은? 다른 표를 가리키는 열은?"],
    ["열쇠", "보안", "이 표를 누가 읽고·쓰고·고치고·지우나? 내 앱이 쓰는 비밀 열쇠는 어디 두나?"],
  ]));
  ch.push(H2("남는 것 vs 흐르는 것"));
  ch.push(T([2100, 3800, 4192], ["", "뜻", "예 (채점기)"], [
    ["남는 것 → 창고", "앱을 껐다 켜도, 다른 사람이 봐도 있어야 하는 것", "닉네임 · 점수 · 제출 시각 · 세션 코드"],
    ["흐르는 것 → 창고 밖", "그 순간만 필요한 것", "채점 중 \"빙글\" · 등록 안 누른 결과 카드 · 쓰다 만 프롬프트(주머니)"],
  ]));

  // ── 2쪽 예시
  ch.push(PB());
  ch.push(H2("완성 예시: 「점심 메뉴 뽑기」", "2쪽 · 12차 구조도 · 14차 화면도와 같은 앱을 그대로 잇습니다"));
  ch.push(P([run("① 남길 것 고르기 ", { bold: true, size: 19 }), run("— 화면도의 「보이는 데이터」 칸에서: 메뉴 이름 · 어제 뽑힌 메뉴 · 오늘 뽑은 시각 · 메뉴 종류", { size: 18 })]));
  ch.push(P([run("남는 것: ", { bold: true, size: 17, color: TEAL }), run("메뉴 이름 · 메뉴 종류 · 뽑은 시각 · 뽑힌 메뉴 · 먹었나　　", { size: 17 }), run("흐르는 것: ", { bold: true, size: 17, color: "B45309" }), run("\"뽑는 중…\" 연출 · \"왜 이 메뉴인지\" 문장(매번 계산)", { size: 17 })], { before: 20, after: 60 }));
  ch.push(P([run("② 표 이름 짓기 ", { bold: true, size: 19 }), run("— 사실이 두 종류: \"이런 메뉴가 있다\" / \"언제 무엇을 뽑았다\"", { size: 18 })], { after: 20 }));
  ch.push(T([1800, 3200, 5092], ["표", "한 종류의 사실", "한 줄 ="], [
    ["메뉴 표", "등록해 둔 메뉴", "\"김치찌개(한식)를 3월 2일에 등록했다\""],
    ["뽑기기록 표", "뽑은 사건", "\"3월 9일 12:10에 김치찌개가 뽑혔고, 먹었다\""],
  ]));
  ch.push(P([run("③ 열 적기 + ④ 줄 긋기", { bold: true, size: 19 })], { before: 140, after: 40 }));
  const half = 4700, mid = W - half * 2;
  const left = TBLPIC("메뉴 표", [["번호", "덩어리 번호", "필수 · 자동"], ["이름", "글자 30자", "필수 · 유일"], ["종류", "글자", "허용목록"], ["등록 시각", "시각", "안 적으면 지금"]], half, { rowPad: 10 });
  const right = TBLPIC("뽑기기록 표", [["번호", "덩어리 번호", "필수 · 자동"], ["메뉴번호 →", "덩어리 번호", "필수 · 메뉴.번호"], ["뽑은 시각", "시각", "안 적으면 지금"], ["먹었나", "참/거짓", "기본 \"아니오\""]], half, { rowPad: 10, fill: "0D9488" });
  ch.push(table([half, mid, half], [[
    cell([left], half, { borders: cellBorders("FFFFFF") }),
    cell([P([run("◀━━ 줄", { size: 15, bold: true, color: TEAL })], { align: AlignmentType.CENTER, before: 600, after: 0 })], mid, { borders: cellBorders("FFFFFF"), valign: VerticalAlign.TOP }),
    cell([right], half, { borders: cellBorders("FFFFFF") }),
  ]]));
  ch.push(P([run("줄: ", { bold: true, size: 17, color: TEAL }), run("뽑기기록.메뉴번호 → 메뉴.번호 (메뉴를 지우면 그 메뉴의 기록도 같이 — 삭제 연쇄)", { size: 17 })], { before: 60, after: 10 }));
  ch.push(P([run("왜 갈랐나: ", { bold: true, size: 17, color: TEAL }), run("김치찌개를 열 번 뽑으면 \"김치찌개·한식\"이 열 줄에 반복된다 → 이름을 고치면 열 군데. 메뉴는 메뉴 표에 한 번만, 기록은 번호로 가리킨다.", { size: 17 })], { before: 10, after: 60 }));
  ch.push(P([run("⑤ 문지기 표", { bold: true, size: 19 })], { before: 80, after: 20 }));
  ch.push(T([2100, 1998, 1998, 1998, 1998], ["표", "읽기", "쓰기", "고치기", "지우기"], [
    ["메뉴 표", "모두", "나만", "나만", "나만"],
    ["뽑기기록 표", "모두", "모두", "X (뽑힌 건 뽑힌 것)", "X"],
  ]));
  ch.push(P([run("비밀 열쇠: ", { bold: true, size: 17, color: TEAL }), run("없음 (외부 AI·결제 안 씀) → 공개 열쇠만, 문지기가 지킨다. (만약 \"왜 이 메뉴인지\"를 AI가 쓰게 한다면 → 그 열쇠는 서버 서랍에)", { size: 17 })], { before: 60 }));
  ch.push(P([run("★ 보너스 — 흐르는 것 1개: ", { bold: true, size: 17 }), run("\"뽑는 중…\" 1초 연출 — 창고에 안 남긴다", { size: 17 })]));
  ch.push(P([run("✅ 합격 기준과 대조: 표 2개 이상 + 열 3개 이상? ✓ (2표, 4열·4열) / 줄 1개 + 왜 갈랐나? ✓ / 문지기 표 고치기·지우기 칸 채움? ✓ (X도 답)", { size: 17, color: "0F4A44" })], { shade: "F0FDFA", before: 80 }));

  // ── 3쪽
  ch.push(PB());
  ch.push(H2("① 남길 것 고르기 — 내 앱 화면에 보이는 숫자·이름·글을 전부 쏟아내세요", "3쪽 · 내 차례 ①·②"));
  ch.push(P([run("화면도가 있으면 「보이는 데이터」 칸에서 옮겨 적고, 없으면 화면을 떠올려서. 사용자가 입력하는 것 + 앱이 보여주는 것 둘 다.", { size: 17, color: MUTED })]));
  ch.push(T([3300, 1900, 4892], ["화면에 보이는 것", "남는 것 / 흐르는 것", "남는다면 — 왜? (껐다 켜도 있어야 하나? 남이 봐야 하나?)"],
    Array.from({ length: 6 }, () => ["", "☐ 남음   ☐ 흐름", ""]), { rowHeight: 520 }));
  ch.push(NOTE("\"흐름\"이 하나도 없다면 — 기다림 연출·화면에만 잠깐 뜨는 계산 결과·쓰다 만 입력은 보통 흐르는 것입니다."));
  ch.push(H2("② 표 이름 짓기 — 남는 것을 \"한 종류의 사실\"끼리 묶으세요 (2~3개 권장)"));
  ch.push(P([run("\"이 표의 한 줄은 무엇 하나인가?\"를 문장으로 쓸 수 있으면 표가 잘 갈린 겁니다.", { size: 17, color: MUTED })]));
  ch.push(T([900, 3000, 6192], ["#", "표 이름", "한 종류의 사실 (이 표의 한 줄 = \"____가 ____했다\")"], [["1", "", ""], ["2", "", ""], ["(3)", "", ""]], { rowHeight: 620 }));
  ch.push(NOTE("한 표의 한 줄에 같은 글이 반복해서 들어갈 것 같으면 (예: 기록마다 메뉴 이름) — 그건 다른 표로 빼서 번호로 가리킬 후보입니다. 4쪽 ④에서 줄을 긋습니다."));

  // ── 4쪽
  ch.push(PB());
  ch.push(H2("③ 열 적기 → ④ 줄 긋기 (같은 그림 위에)", "4쪽 · 내 차례 ③·④·⑤ — 표 그림과 문지기"));
  ch.push(P([run("표마다 네모 → 첫 열은 번호(창고가 자동으로) → 열마다 이름 · 종류 · 필수? → 다른 표를 가리키는 열에서 화살표로 줄 긋기", { size: 17, color: MUTED })], { after: 40 }));
  const blankRows = [["번호", "덩어리 번호", "필수 · 자동"], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""], ["", "", ""]];
  ch.push(table([half, mid, half], [[
    cell([TBLPIC("표 1: ______________", blankRows, half, { rowPad: 60 })], half, { borders: cellBorders("FFFFFF") }),
    cell([P("")], mid, { borders: cellBorders("FFFFFF") }),
    cell([TBLPIC("표 2: ______________", blankRows, half, { rowPad: 60, fill: "0D9488" })], half, { borders: cellBorders("FFFFFF") }),
  ]]));
  ch.push(P([run("종류: 글자 · 숫자 · 시각 · 참/거짓 · 덩어리　　필수?: 필수 · 선택 · 기본값 있음", { size: 15, color: MUTED })], { before: 20, after: 40 }));
  ch.push(...BLANK("줄 (어느 표의 어느 열 → 어느 표의 번호):  ________ . ________  →  ________ . 번호", 1));
  ch.push(...BLANK("왜 갈랐나 (한 표에 다 넣으면 무슨 일이?):", 1));
  ch.push(...BLANK("유일해야 하는 열 (같은 값이 둘이면 안 되는 것 — 코드·아이디·이메일 같은):", 1));
  ch.push(H3("⑤ 문지기 표 — 표마다 네 칸을 채우세요 (X도 답입니다 · 빈칸은 안 됩니다)"));
  ch.push(T([2100, 1998, 1998, 1998, 1998], ["표", "읽기 — 누가?", "쓰기 — 누가?", "고치기 — 누가?", "지우기 — 누가?"], [["표 1", "", "", "", ""], ["표 2", "", "", "", ""], ["(표 3)", "", "", "", ""]], { rowHeight: 480 }));
  ch.push(P([run("보기: 모두 · 로그인한 사람 · 본인만 · 나(관리자)만 · X(아무도)", { size: 15, color: MUTED })], { before: 20, after: 40 }));
  ch.push(...BLANK("내 앱이 쓰는 비밀 열쇠 (AI·결제·문자 같은 외부 서비스 — 없으면 \"없음\"):  ____________  → 두는 곳: ☐ 서버 서랍  (브라우저는 절대 X)", 1));
  ch.push(...BLANK("★ 보너스 — 흐르는 것 1개 (창고에 일부러 안 남기는 것과 그 이유):", 1));
  ch.push(H3("✅ 제출 전 셀프 체크 (합격 기준)"));
  ch.push(P("☐ 표 2개 이상, 표마다 열 3개 이상 (이름 + 종류 — 4쪽 위)", { size: 18, before: 20, after: 20 }));
  ch.push(P("☐ 표 사이 줄 1개 이상 + \"왜 갈랐나\" 한 줄 (4쪽 위)", { size: 18, before: 20, after: 20 }));
  ch.push(P("☐ 문지기 표에서 고치기·지우기 칸을 비워두지 않음 (4쪽 아래 — X도 답)", { size: 18, before: 20, after: 20 }));
  ch.push(...BLANK("메모 — 막힌 것 / 다음 시즌에 물어볼 것:", 1));
  ch.push(PIN("구조도(12차)·화면도(14차)·데이터도(16차) — 세 장을 한 봉투에. 다음 시즌 「진짜 만들기」의 첫 프롬프트는 이 세 장에서 나옵니다."));
  return ch;
}

// ───────────────────────── 04 용어사전 (md 파싱) ─────────────────────────
function parseDict(md) {
  const parts = []; let cur = null, item = null;
  for (const line of md.split("\n")) {
    if (line.startsWith("## ")) { cur = { title: line.slice(3).trim(), items: [] }; parts.push(cur); }
    else if (line.startsWith("### ") && cur) { item = { title: line.slice(4).trim(), fields: [] }; cur.items.push(item); }
    else if (line.startsWith("- **") && item) { const m = line.match(/^- \*\*(.+?)\*\*:\s*(.*)$/); if (m) item.fields.push(m[2].replace(/\*\*/g, "").replace(/`/g, "")); }
  }
  return parts;
}
function makeDict() {
  const md = fs.readFileSync(path.join(OUT, "04_데이터용어사전.md"), "utf8");
  const ch = [];
  ch.push(H1("데이터 용어 사전 — 중급반 3강"));
  ch.push(P([run("못 외워도 됩니다. ", { size: 19, bold: true, color: TEAL }), run("시험 보는 사전이 아니라, 필요할 때 찾아보는 사전입니다. 수업이 끝나면 여기 단어들이 \"아는 단어\"로 바뀌어 있을 거예요. 항목마다 비유 → 무엇인가 → 왜 있나 → 채점기에서 → 헷갈리지 마세요 순서. ⭐ = 오늘의 핵심 (여섯 개: DB · 테이블 · 컬럼 · 외래키 · 공개/비밀 열쇠 · 문지기).", { size: 18, color: MUTED })], { before: 0, after: 120 }));
  const LAB = ["비유", "무엇인가", "왜 있나", "채점기에서", "헷갈리지 마세요"];
  let n = 0;
  for (const part of parseDict(md)) {
    ch.push(H2(part.title));
    for (const it of part.items) {
      n++;
      ch.push(new Paragraph({ children: [run(it.title, { size: 22, bold: true, color: INK })], spacing: { before: 200, after: 40 }, keepNext: true }));
      ch.push(table([1500, W - 1500], it.fields.map((f, i) => [
        cell([P([run(LAB[i], { size: 16, bold: true, color: TEAL })], { before: 10, after: 10, line: 240 })], 1500, { fill: i === 0 ? "F0FDFA" : "F9FAFB" }),
        cell([P([run(f, { size: 17, bold: i === 0, color: i === 4 ? "7F1D1D" : INK })], { before: 10, after: 10, line: 250 })], W - 1500, { fill: i === 0 ? "F0FDFA" : undefined }),
      ])));
    }
  }
  ch.push(PIN(`이 사전의 단어 ${n}개 중 오늘 몸에 붙여야 할 건 ⭐ 여섯 개뿐입니다 — DB · 테이블 · 컬럼 · 외래키(줄 잇기) · 공개/비밀 열쇠 · 문지기. 나머지는 찾아보면 됩니다.`));
  return ch;
}

async function build(children, out) {
  const doc = new Document({
    styles: { default: { document: { run: { font: FONT, size: 20 } } } },
    sections: [{ properties: { page: { margin: { top: 850, bottom: 850, left: 907, right: 907 } } }, children }],
  });
  fs.writeFileSync(out, await Packer.toBuffer(doc));
  console.log("wrote", out);
}
(async () => {
  await build(makeWorksheet(), path.join(OUT, "02_데이터도_숙제템플릿.docx"));
  await build(makeDict(), path.join(OUT, "04_데이터용어사전.docx"));
})();
