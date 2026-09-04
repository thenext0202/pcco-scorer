const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle, ShadingType, PageBreak, HeightRule, VerticalAlign,
  LevelFormat,
} = require("docx");

const FONT = "Malgun Gothic";
const W = 10092; // content width DXA (A4 - 2*907)
const TEAL = "0D9488", INK = "1A2430", MUTED = "6B7280", LINE = "D1D5DB";

const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 20, bold: o.bold, color: o.color, italics: o.italics });
const P = (children, o = {}) => new Paragraph({
  children: typeof children === "string" ? [run(children, o)] : children,
  spacing: { before: o.before ?? 60, after: o.after ?? 60, line: o.line ?? 300 },
  alignment: o.align, shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
  border: o.border, keepNext: o.keepNext, numbering: o.numbering,
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
// simple header+rows table
const T = (widths, header, rows, o = {}) => table(widths, [header, ...rows], { headerRows: 1, ...o });
// empty canvas box
const CANVAS = (height, hint) => table([W], [[cell(hint ? [P([run(hint, { size: 16, color: "9CA3AF", italics: true })], { before: 0, after: 0 })] : [P("")], W, { borders: cellBorders("6B7280") })]], { rowHeight: height });

// ───────────────────────── 02 화면도 ─────────────────────────
function makeWorksheet() {
  const ch = [];
  ch.push(H1("내 앱 화면도 — 중급반 2강 숙제"));
  ch.push(P([run("숙제: 12차에 그린 구조도의 「화면」 폴더를 연다 — 화면 목록 · 이동 · 대표 화면 1장의 상자 · 부품 · 상태를 종이에 그린다. 개발 환경 불필요, 종이와 펜이면 충분. ", { size: 18, color: MUTED }), run("16차는 이 종이로 시작합니다. 반드시 지참!", { size: 18, bold: true, color: TEAL })], { before: 0, after: 120 }));
  ch.push(P([run("이름: ______________　　날짜: ______________　　내 앱 이름(구조도와 같게): ____________________", { size: 19 })], { before: 60, after: 120 }));

  ch.push(H2("📖 작성 순서 — 이 다섯 단계면 됩니다", "1쪽 · 이 종이를 쓰는 법"));
  ch.push(T([1500, 6592, 2000], ["단계", "할 일", "어디에"], [
    ["① 화면 목록", "구조도의 [화] 폴더에 있던 화면들을 옮겨 적는다 (3개 이하 권장)", "3쪽 위"],
    ["② 이동 화살표", "화면들을 상자로 놓고 \"이 버튼을 누르면 어느 화면으로\" 화살표를 긋는다", "3쪽 아래"],
    ["③ 상자 그리기", "대표 화면 1장을 골라 큰 상자부터 그리고, 상자마다 이름표를 붙인다 (뼈대)", "4쪽 위"],
    ["④ 부품 표시", "두 번 이상 나오는 상자에 동그라미 치고 부품 이름을 짓는다", "4쪽 위 (같은 그림에)"],
    ["⑤ 상태 4칸", "그 화면이 비어 있을 때 · 기다릴 때 · 잘 됐을 때 · 실패했을 때 각각 뭐가 보이나", "4쪽 아래"],
  ]));
  ch.push(NOTE("막막하면 2쪽의 완성 예시부터 보세요. 베끼는 게 아니라 형식을 빌리는 거예요."));
  ch.push(NOTE("그림은 못 그려도 됩니다 — 네모와 화살표와 글자면 충분합니다. 예쁘게가 아니라 빠뜨리지 않게."));
  ch.push(NOTE("구조도가 없어도 됩니다 — 2쪽 예시 소재(점심 메뉴 뽑기)로 시작해도 되고, 지금 화면 3개를 새로 정해도 됩니다."));

  ch.push(H2("치트시트 — 화면 해부 4단 (오늘 배운 눈)"));
  ch.push(T([1200, 1600, 7292], ["단", "실명", "스스로에게 던지는 질문"], [
    ["뼈대", "HTML", "이 화면에 무슨 상자들이 있나? (제목·문단·버튼·입력칸·목록·카드)"],
    ["옷", "CSS", "그 상자는 무슨 색·크기·자리인가? 폰과 PC에서 다른가?"],
    ["움직임", "JavaScript", "누르면 무엇이 일어나나? 바뀌나·생기나·사라지나·다른 화면으로 가나?"],
    ["부품", "컴포넌트", "두 번 이상 나오는 상자 묶음이 있나? 있으면 이름을 붙인다"],
  ]));
  ch.push(H2("상태 4장 — 화면 하나는 그림 여러 장이다"));
  ch.push(T([1500, 3300, 5292], ["상태", "뜻", "화면에 보통 보이는 것"], [
    ["비어 있음", "아직 아무것도 안 했을 때", "안내문(\"여기에 입력하세요\") · 잠긴 버튼"],
    ["기다림", "누르고 결과를 기다릴 때", "\"…중\" 글자 · 회색 상자 · 빙글"],
    ["성공", "잘 됐을 때", "결과 · 다음 행동 버튼"],
    ["실패", "안 됐을 때", "빨간 문구 · 다시 시도 버튼"],
  ]));

  // ── 2쪽 예시
  ch.push(PB());
  ch.push(H2("완성 예시: 「점심 메뉴 뽑기」", "2쪽 · 12차 예시 구조도의 screens/ 를 그대로 엽니다"));
  ch.push(P([run("① 화면 목록 ", { bold: true, size: 19 }), run("(구조도 screens/ 에서): 1 뽑기 화면 · 2 메뉴 관리 화면 · 3 기록 화면", { size: 19 })]));
  ch.push(P([run("② 이동 화살표", { bold: true, size: 19 })], { after: 20 }));
  // flow as 3-col table with arrow labels
  const box = (t) => cell([P([run(t, { size: 18, bold: true })], { align: AlignmentType.CENTER, before: 80, after: 80 })], 2600, { borders: cellBorders("374151"), valign: VerticalAlign.CENTER });
  const arrow = (t) => cell([P([run(t, { size: 15, color: MUTED })], { align: AlignmentType.CENTER, before: 0, after: 0 }), P([run("──────▶", { size: 16 })], { align: AlignmentType.CENTER, before: 0, after: 0 }), P([run("◀──────", { size: 16 })], { align: AlignmentType.CENTER, before: 0, after: 0 }), P([run("\"돌아가기\"", { size: 15, color: MUTED })], { align: AlignmentType.CENTER, before: 0, after: 0 })], 2446, { borders: cellBorders("FFFFFF"), valign: VerticalAlign.CENTER });
  ch.push(table([2600, 2446, 2600, 2446], [[box("뽑기 화면 (첫 화면)"), arrow("\"메뉴 관리\" 버튼"), box("메뉴 관리 화면"), cell([P("")], 2446, { borders: cellBorders("FFFFFF") })]]));
  ch.push(table([2600, 2446, 2600, 2446], [[cell([P([run("│ \"기록 보기\" 버튼 ▼   ▲ \"돌아가기\"", { size: 15, color: MUTED })], { align: AlignmentType.CENTER, before: 0, after: 0 })], 2600, { borders: cellBorders("FFFFFF") }), cell([P("")], 2446, { borders: cellBorders("FFFFFF") }), cell([P("")], 2600, { borders: cellBorders("FFFFFF") }), cell([P("")], 2446, { borders: cellBorders("FFFFFF") })]]));
  ch.push(table([2600, 2446, 2600, 2446], [[box("기록 화면"), cell([P([run("(기록 화면 → \"돌아가기\" → 뽑기 화면)", { size: 15, color: MUTED })], { before: 0, after: 0 })], 2446, { borders: cellBorders("FFFFFF"), valign: VerticalAlign.CENTER }), cell([P("")], 2600, { borders: cellBorders("FFFFFF") }), cell([P("")], 2446, { borders: cellBorders("FFFFFF") })]]));

  ch.push(P([run("③ 상자 그리기 + ④ 부품 표시", { bold: true, size: 19 }), run(" — 대표 화면 = 뽑기 화면 (폰 세로 기준). ⓟ = 부품", { size: 18, color: MUTED })], { before: 140, after: 40 }));
  // wireframe: outer table 2 cols (mock | notes)
  const mockW = 5200, noteW = W - mockW;
  const inner = (label, body, fill) => table([mockW - 240], [[cell([P([run(label, { size: 14, color: TEAL, bold: true })], { before: 0, after: 0 }), P([run(body, { size: 18 })], { align: AlignmentType.CENTER, before: 20, after: 20 })], mockW - 240, { borders: cellBorders("374151"), fill })]]);
  const gap = () => P("", { before: 0, after: 0, line: 120 });
  const innerRow2 = () => table([Math.floor((mockW - 240) / 2), Math.floor((mockW - 240) / 2)], [[
    cell([P([run("작은 버튼 ⓟ", { size: 14, color: TEAL, bold: true })], { before: 0, after: 0 }), P([run("메뉴 관리", { size: 17 })], { align: AlignmentType.CENTER, before: 10, after: 10 })], Math.floor((mockW - 240) / 2), { borders: cellBorders("374151") }),
    cell([P([run("작은 버튼 ⓟ", { size: 14, color: TEAL, bold: true })], { before: 0, after: 0 }), P([run("기록 보기", { size: 17 })], { align: AlignmentType.CENTER, before: 10, after: 10 })], Math.floor((mockW - 240) / 2), { borders: cellBorders("374151") }),
  ]]);
  const mockCell = cell([
    P([run("뽑기 화면", { size: 14, color: TEAL, bold: true })], { before: 0, after: 40 }),
    inner("제목", "오늘 점심 뭐 먹지?"), gap(),
    inner("결과 카드 ⓟ", "🍜 김치찌개 — 왜: 어제는 안 나온 메뉴", "F0FDFA"), gap(),
    inner("큰 버튼 ⓟ", "🎲 뽑기!", "F0FDFA"), gap(),
    innerRow2(),
  ], mockW, { borders: cellBorders("111827") });
  const noteCell = cell([
    P([run("부품 이름과 \"왜 부품인가\"", { size: 18, bold: true })], { before: 0, after: 40 }),
    P([run("메뉴 카드", { size: 17, bold: true, color: TEAL }), run(" — 왜: 기록 화면에 같은 모양이 여러 장 나온다", { size: 17 })], { before: 20, after: 20, line: 260 }),
    P([run("버튼", { size: 17, bold: true, color: TEAL }), run(" — 왜: 세 화면에서 글자만 다르게 쓴다 (빈칸 = 글자·크기)", { size: 17 })], { before: 20, after: 20, line: 260 }),
    P([run("그리는 순서", { size: 18, bold: true })], { before: 120, after: 40 }),
    P([run("① 큰 상자(화면) → ② 안에 상자들, 위에서 아래로 → ③ 상자마다 이름표 → ④ 두 번 이상 나오는 상자에 ⓟ", { size: 16, color: "4B5563" })], { before: 0, after: 0, line: 260 }),
  ], noteW, { borders: cellBorders("FFFFFF") });
  ch.push(table([mockW, noteW], [[mockCell, noteCell]]));

  ch.push(P([run("⑤ 상태 4칸", { bold: true, size: 19 }), run(" (뽑기 화면)", { size: 18, color: MUTED })], { before: 140, after: 40 }));
  ch.push(T([1500, 8592], ["상태", "화면에 보이는 것"], [
    ["비어 있음", "결과 카드 자리에 \"아직 안 뽑았어요 — 버튼을 눌러보세요\" 안내문 · 메뉴가 0개면 뽑기 버튼 잠김 + \"메뉴를 먼저 등록하세요\""],
    ["기다림", "버튼 글자 \"뽑는 중…\" + 카드 자리에 회색 상자 (1초 정도 돌리는 연출)"],
    ["성공", "메뉴 카드에 메뉴 이름 + \"왜 이 메뉴인지\" 한 줄 + 버튼 다시 켜짐"],
    ["실패", "카드 자리에 빨간 문구 \"뽑을 메뉴가 없어요 (어제 메뉴 빼면 0개)\" + \"메뉴 관리로\" 버튼"],
  ]));
  ch.push(P([run("이 화면에 보이는 데이터 (16차 재료): ", { bold: true, size: 18 }), run("메뉴 이름 · 어제 뽑힌 메뉴(제외용) · 오늘 뽑은 시각", { size: 18 })], { before: 100 }));
  ch.push(P([run("★ 보너스 — 폰/PC 다른 곳 1개: ", { bold: true, size: 18 }), run("PC에서는 결과 카드와 버튼이 가로로 나란히(2열), 폰에선 세로(1열)", { size: 18 })]));
  ch.push(P([run("✅ 합격 기준과 대조: 화면 목록+화살표? ✓ (3개, 화살표 4개) / 대표 화면 상자 그림 + 부품 동그라미 + 왜? ✓ (부품 2개) / 상태 4칸 중 3칸 이상? ✓ (4칸 전부)", { size: 17, color: "0F4A44" })], { shade: "F0FDFA", before: 80 }));

  // ── 3쪽
  ch.push(PB());
  ch.push(H2("① 화면 목록 — 구조도 [화] 폴더에서 옮겨 적으세요", "3쪽 · 내 차례 ①·② (3개 이하 권장 · 없으면 지금 정하기)"));
  ch.push(P([run("무슨 화면이 첫 화면인가? / 사용자가 뭘 하러 그 화면에 가나? (화면마다 목적 한 줄)", { size: 18, color: MUTED })]));
  ch.push(T([1400, 3200, 5492], ["#", "화면 이름", "이 화면의 한 목적 (한 화면 = 한 목적)"], [
    ["1 (첫 화면)", "", ""], ["2", "", ""], ["3", "", ""], ["(4)", "", ""],
  ], { rowHeight: 560 }));
  ch.push(H2("② 이동 화살표 — 화면을 네모로 놓고, \"어느 버튼을 누르면 어디로\"를 화살표로"));
  ch.push(P([run("힌트: 첫 화면을 왼쪽에. 화살표 위에 버튼 이름을 적으세요. 돌아오는 화살표도 잊지 말고. (2쪽 그림처럼)", { size: 17, color: MUTED })], { after: 60 }));
  ch.push(CANVAS(5600, "여기에 네모(화면)와 화살표(버튼 이름)를 그리세요"));
  ch.push(NOTE("화살표가 하나도 없는 화면이 있다면 — 그 화면은 어떻게 가나요? (도착 화살표가 없으면 존재하지 않는 화면입니다)"));

  // ── 4쪽
  ch.push(PB());
  ch.push(H2("③ 상자 그리기 → ④ 부품 표시 (같은 그림 위에)", "4쪽 · 내 차례 ③·④·⑤ — 대표 화면 한 장"));
  ch.push(P([run("대표 화면 이름: ____________________  ", { size: 19 }), run("(첫 화면 또는 제일 중요한 화면 · 폰 세로 기준으로)", { size: 17, color: MUTED })], { after: 40 }));
  ch.push(P([run("큰 상자부터 → 안에 작은 상자 → 상자마다 이름표(제목·문단·버튼·입력칸·목록·카드) → 두 번 이상 나오는 상자에 ⓟ 동그라미 + 부품 이름", { size: 17, color: MUTED })], { after: 60 }));
  ch.push(CANVAS(5000, "폰 세로 화면 — 큰 상자부터"));
  ch.push(P([run("부품 이름과 \"왜 부품인가\" (2쪽처럼)", { bold: true, size: 18 })], { before: 100, after: 20 }));
  ch.push(...BLANK("ⓟ ______________ — 왜:", 1));
  ch.push(...BLANK("ⓟ ______________ — 왜:", 1));
  ch.push(H3("⑤ 상태 4칸 — 이 화면이 각 상태일 때 뭐가 보이나 (3칸 이상 채우면 합격)"));
  ch.push(T([1300, 3700, 5092], ["상태", "유도 질문", "화면에 보이는 것"], [
    ["비어 있음", "아무것도 안 했을 때, 아무것도 없을 때 뭐가 보이나? 버튼은 눌리나?", ""],
    ["기다림", "누르고 나서 결과가 올 때까지 뭐가 보이나?", ""],
    ["성공", "잘 됐을 때 뭐가 보이고, 다음엔 뭘 누르나?", ""],
    ["실패", "안 됐을 때 뭐가 보이나? 다시 하려면?", ""],
  ], { rowHeight: 620 }));
  ch.push(...BLANK("이 화면에 보이는 데이터 (어디선가 가져와야 하는 것 — 16차 재료):", 1));
  ch.push(...BLANK("★ 보너스 — 폰/PC 다르게 보일 곳 1개:", 1));
  ch.push(H3("✅ 제출 전 셀프 체크 (합격 기준)"));
  ch.push(P("☐ 화면 목록 + 이동 화살표 (3쪽 — 도착 화살표 없는 화면이 없다)", { size: 18, before: 20, after: 20 }));
  ch.push(P("☐ 대표 화면 상자 그림 + 부품 동그라미 + \"왜 부품인가\" 한 줄 (4쪽)", { size: 18, before: 20, after: 20 }));
  ch.push(P("☐ 상태 4칸 중 3칸 이상 (비어·기다림·실패는 꼭 후보에)", { size: 18, before: 20, after: 20 }));
  ch.push(...BLANK("메모 — 막힌 것 / 16차에 물어볼 것:", 1));
  ch.push(PIN("다음 시간(16차 — 데이터를 그린다)은 이 종이의 「보이는 데이터」 칸에서 시작합니다. 반드시 지참!"));
  return ch;
}

// ───────────────────────── 04 용어사전 ─────────────────────────
const DICT = [
  ["1부 — 삼형제: 화면을 만드는 설계도 세 장", [
    ["⭐ HTML — 뼈대", "집의 뼈대. 방이 몇 개고 어디에 있는지.", "화면에 무슨 상자들이 있는지를 적은 설계도. 제목·문단·버튼·입력칸·목록·카드 — 화면의 모든 것은 상자고, 상자는 상자 안에 들어갑니다. HTML은 그 상자들의 목록과 겹침을 적은 글입니다.", "브라우저가 \"무엇을 그릴지\" 알아야 하니까. 색이나 움직임 없이도 뼈대만 있으면 화면은 일단 뜹니다(못생기게).", "결과 카드 = 큰 카드 상자 안에 총점 상자·요소 상자·강점 상자·개선 예시 상자.", "HTML은 프로그래밍 언어가 아닙니다 — 계산도, 판단도 못 합니다. \"무엇이 있다\"만 적는 글."],
    ["태그 — 상자의 이름표", "이삿짐 상자에 붙이는 라벨 — \"주방\", \"책\".", "HTML의 상자 하나하나에 붙는 이름표. 제목 상자, 문단 상자, 버튼 상자, 입력칸 상자, 목록 상자… 이름표를 보고 브라우저가 \"아, 이건 버튼이구나\" 하고 그립니다.", "이름표가 있어야 브라우저·검색엔진·화면낭독기가 상자의 역할을 알 수 있습니다. 같은 네모여도 \"제목\"과 \"버튼\"은 다르게 다뤄야 하니까.", "\"📊 요소별 점수\"는 제목 이름표, [복사]는 버튼 이름표, 피드백은 문단 이름표.", "이름표의 영어 이름(h1, p, button, div…)은 오늘 안 외웁니다. 검색하면 10분이면 됩니다."],
    ["⭐ CSS — 옷", "같은 사람에게 입히는 다른 옷. 뼈대는 그대로, 인상은 딴판.", "상자들의 생김새를 적은 설계도 — 색·크기·자리·간격·글꼴·둥근 모서리. HTML이 \"버튼이 있다\"라면 CSS는 \"그 버튼은 파랗고, 가득 차고, 글자는 굵게\".", "뼈대와 옷을 분리하면 옷만 갈아입힐 수 있습니다. 색을 바꾸다 뼈대가 부러지지 않고, 디자이너와 개발자가 서로 다른 파일을 만질 수 있습니다.", "등급 배지 — 같은 배지 뼈대에 S 호박·A 초록·B 파랑·C 회색·D 주황·F 빨강 여섯 벌 옷.", "옷은 움직임을 못 만듭니다. \"누르면 색이 바뀐다\"의 '색'은 옷이지만 '누르면'은 움직임(JS)의 일."],
    ["반응형 — 같은 뼈대, 폰 옷과 PC 옷", "같은 사람이 회사에선 정장, 집에선 잠옷.", "화면 크기에 따라 옷을 다르게 입히는 것. 뼈대(HTML)는 하나인데, 폰에서는 세로 1열로, PC에서는 가로 3열로 — CSS가 화면 너비를 보고 옷을 고릅니다.", "폰과 PC를 따로 만들면 두 배로 만들고 두 배로 고쳐야 하니까. 하나의 뼈대에 옷만 두 벌.", "실습 화면의 버튼들 — 폰에선 세로로 쌓이고 PC에선 가로로 나란히. 등록 카드는 폰에서 화면 하단에 고정.", "4차의 \"디바이스를 안 적으면 PC 기준으로 나와 폰에서 깨진다\"가 바로 이것 — 폰 옷을 안 만들어준 겁니다."],
    ["⭐ JavaScript(JS) — 움직임", "근육. 뼈대와 옷만 있으면 마네킹, 근육이 있어야 움직인다.", "\"이런 일이 생기면 이렇게 하라\"를 적은 설계도이자 프로그래밍 언어. 누르면·입력하면·시간이 지나면 → 상자를 바꾸고·만들고·없애고·다른 화면으로 보냅니다. 삼형제 중 유일하게 계산과 판단을 합니다.", "뼈대+옷만 있는 화면은 전단지입니다. 눌러도 아무 일도 안 일어나요. 앱이 되려면 움직임이 필요합니다.", "채점 버튼을 누르면 — 글자가 \"채점 중…\"으로 바뀌고, 회색 상자가 나타나고, 결과가 오면 카드가 생기고, 화면이 결과로 스크롤됩니다. 전부 JS.", "Java와 JavaScript는 이름만 비슷한 남입니다(햄과 햄스터). 그리고 12차 \"동작(백엔드)\"과 다릅니다 — JS는 브라우저 안에서 도는 움직임. (서버에서도 JS를 쓸 수 있지만 오늘은 화면 안쪽만.)"],
    ["이벤트 — 사건", "초인종. 울리면(사건) 문을 연다(반응).", "화면에서 일어나는 사건 — 누름(클릭·탭), 입력, 스크롤, 시간 경과, 결과 도착. 움직임(JS)은 항상 \"어떤 사건이 나면\"으로 시작합니다.", "화면은 사람이 언제 뭘 할지 모릅니다. 미리 \"사건 → 반응\"을 짝지어 두는 게 앱을 만드는 방식입니다.", "글자를 입력할 때마다(사건) 글자 수가 갱신되고(반응), 30자 미만이면(사건) 빨간 안내가 뜹니다(반응).", "사건이 없으면 반응도 없습니다 — \"자동으로\"라는 말도 사실은 \"시간이 지나면\" 또는 \"결과가 오면\"이라는 사건."],
    ["브라우저가 그리는 순서", "요리사가 레시피 세 장을 받아 한 접시를 만든다.", "브라우저는 서버에서 설계도 세 장(뼈대·옷·움직임)을 받아 — 뼈대로 상자를 세우고, 옷을 입히고, 움직임을 붙여 — 한 화면을 그립니다. 12차 여정 ①의 \"설계도\"가 이 세 장입니다.", "그래서 \"화면은 서버가 보내는 그림\"이 아니라 내 폰이 세 장을 겹쳐 그린 결과입니다. 같은 세 장을 받아도 폰과 PC의 결과가 다른 이유(반응형).", "주소창에 채점기 주소를 치면 → 세 장이 오고 → 폰이 그립니다. 12차에 \"화면은 폰이 그린다\"고 했던 그 문장.", "세 장이 꼭 세 파일은 아닙니다 — 요즘은 부품(컴포넌트) 안에 셋이 함께 들어 있기도 합니다. 그래도 역할은 셋."],
  ]],
  ["2부 — 부품", [
    ["⭐ 컴포넌트 — 부품", "레고 부품. 한 번 만들면 어디든 끼운다.", "반복되는 상자 묶음에 이름을 붙인 것. \"버튼\", \"카드\", \"결과 카드\"처럼 뼈대+옷+움직임을 한 덩어리로 묶어 두고, 필요한 곳마다 그 이름을 부릅니다. 부품 안에 부품이 들어갈 수 있습니다(결과 카드 안에 배지·버튼).", "같은 것을 다섯 번 그리면 다섯 번 고쳐야 합니다. 부품은 한 번 고치면 다섯 곳이 같이 바뀝니다. 그리고 부품끼리 조립하면 화면이 됩니다 — \"화면은 부품의 조립\".", "부품 31개. 채점기 5·결과 카드 5·랜딩 부품 8·기타 5·사온 기성 부품 8. 랜딩 화면 = 부품 8개를 위에서 아래로 쌓은 것.", "부품은 \"작은 것\"이 아니라 \"반복되거나 독립적인 것\"입니다. 화면 전체만 한 부품도 있습니다(결과 카드)."],
    ["빈칸(props) — 부품의 재료 자리", "초대장 양식의 빈칸 — \"____님을 ____에 초대합니다\".", "부품 하나를 여러 곳에서 다르게 쓰려고 뚫어 둔 자리. 버튼 부품의 빈칸은 글자·크기·잠김 여부·옷. 같은 부품에 다른 재료를 넣으면 다른 버튼이 됩니다.", "빈칸이 없으면 \"채점하기 버튼\", \"등록하기 버튼\"을 따로 만들어야 합니다. 빈칸 덕에 부품 하나로 수십 개를 만듭니다.", "배지 부품 하나에 \"🎯 프롬프트 채점\", \"📘 지침 채점\", \"🔍 역설계 채점\"… 등급 배지엔 빈칸 둘 — 글자(S~F)와 옷(색).", "빈칸으로 안 되는 차이(상자 개수가 다르다, 안내문 구조가 다르다)가 있으면 부품을 가릅니다 — 채점기 5종이 부품 하나가 아닌 이유. 개발자들은 이 빈칸을 props(프롭스)라고 부릅니다."],
    ["기성 부품 — 사온 부품 (shadcn/ui)", "이케아 조립 가구. 직접 깎지 않고 사서 조립.", "남이 잘 만들어 공개한 부품 세트 — 버튼·배지·카드·입력칸·알림·스켈레톤·토스트. 우리 앱에 가져와 옷만 조금 바꿔 씁니다.", "버튼 하나도 제대로 만들려면 잠김·키보드·접근성·색 상태를 다 챙겨야 합니다. 12차 \"안 만든 파일들\"과 같은 이유 — 잘 만든 게 있으면 사 온다.", "ui/ 폴더의 8개 — 화면 부품 31개 중 8개는 사온 것. \"화면도 절반은 사온 것\".", "사온 부품도 내 앱 폴더 안에 파일로 들어옵니다(고칠 수 있게). node_modules의 창고와는 다른, \"내 것이 된 부품\"."],
    ["옷장 — Tailwind", "옷을 미리 다 만들어 걸어 둔 옷장. 골라 입히기만 한다.", "CSS(옷)를 한 벌씩 새로 짓지 않고, \"파란 배경\", \"둥근 모서리\", \"가운데 정렬\"처럼 이미 만들어진 옷 조각을 이름으로 골라 입히는 도구.", "옷을 매번 새로 지으면 느리고, 앱 전체의 옷이 제각각이 됩니다. 옷장에서 고르면 빠르고 통일됩니다.", "채점기의 옷은 거의 전부 이 옷장에서 골랐습니다. 등급 배지 여섯 색도 옷장의 색.", "Tailwind는 CSS를 대체하는 게 아니라 CSS를 빨리 입히는 방법입니다. 결국 옷은 CSS."],
    ["움직임 상자 — framer-motion", "무대 장치 — 막이 스르륵 열리는 연출.", "상자가 나타나고 사라지고 움직일 때 부드럽게 연출해 주는 도구. \"생겼다/없어졌다\"를 \"스르륵 나타났다/사라졌다\"로.", "뚝뚝 바뀌는 화면은 사람을 놀라게 합니다. 연출이 있으면 \"무슨 일이 일어났는지\" 눈이 따라갑니다(UX).", "랜딩 화면의 카드들이 스크롤에 따라 스르륵 떠오르는 것.", "이건 선택입니다. 없어도 앱은 됩니다. 이름 셋(기성 부품·옷장·움직임 상자)만 알면 오늘은 충분."],
  ]],
  ["3부 — 상태와 이동", [
    ["⭐ 상태 — 화면 하나는 그림 여러 장이다", "신호등. 같은 기둥인데 빨강·노랑·초록 세 그림.", "같은 화면이 지금 어떤 상황이냐에 따라 다르게 보이는 것. 최소 네 장 — 비어 있음·기다림·성공·실패. 화면을 설계한다는 건 이 네 장을 다 그리는 일입니다.", "사람은 완성된 화면(성공)만 상상합니다. 그래서 AI에게 시킬 때 \"비어 있을 때\", \"기다릴 때\", \"실패했을 때\"를 빠뜨리고, 앱은 그 순간 이상하게 보입니다(버튼을 눌렀는데 아무 일도 없는 것처럼 → 두 번 누름).", "채점 화면 — 비어 있음(안내문+잠긴 버튼) · 기다림(\"채점 중…\"+회색 상자) · 성공(결과 카드) · 실패(빨간 알림). 버튼 하나가 화면을 세 번 바꿉니다.", "상태는 화면이 아닙니다 — 화면은 하나, 상태가 여러 장. 화면도에서 화면 목록엔 하나로, 상태 칸엔 넷으로."],
    ["기다림 상태 (로딩) — \"…중\"", "식당의 진동벨. 주문이 들어갔다는 걸 손님이 알게 한다.", "누르고 나서 결과가 올 때까지의 화면. \"채점 중…\" 글자, 빙글 도는 원, 또는 회색 뼈대 상자(스켈레톤 — 결과가 들어올 자리를 미리 보여줌).", "아무것도 안 보이면 사람은 \"안 눌렸나?\" 하고 다시 누릅니다. 두 번 누르면 두 번 채점됩니다. 기다림 화면은 \"받았어요\"라는 대답입니다.", "버튼이 \"채점 중…\"으로 바뀌며 잠기고, 결과 자리에 회색 상자 세 개가 뜹니다.", "스켈레톤(회색 뼈대)은 오늘 첫 개념 \"뼈대\"의 재등장 — 옷과 내용 없이 상자만 먼저 보여주는 것."],
    ["실패 상태 (에러) — 안 됐을 때", "자판기의 \"품절\" 불. 돈을 넣기 전에 알려준다.", "결과가 안 왔거나, 조건이 안 맞을 때의 화면. 빨간 문구 + 다음에 뭘 하면 되는지(\"다시 시도\", \"30자 이상 입력\").", "실패는 반드시 일어납니다(인터넷 끊김·입력 부족·서버 문제). 그때 화면이 멈춰 있으면 사람은 앱을 닫습니다.", "\"채점에 실패했습니다.\" 빨간 알림 / \"프롬프트가 너무 짧습니다. 최소 30자 이상 입력해주세요.\"", "실패 화면에도 뼈대·옷·움직임이 다 있습니다 — 그것도 설계해야 하는 그림 한 장."],
    ["이동 (라우트) — 화면 사이의 길", "건물 안내도의 화살표 — 이 문을 열면 저 방.", "어느 버튼을 누르면 어느 화면으로 가는가. 12차의 \"폴더가 곧 주소\"가 화면 쪽에서 보이는 모습 — 화면마다 주소가 있고, 이동은 주소를 바꾸는 일.", "화면이 둘 이상이면 길이 필요합니다. 도착 화살표가 없는 화면은 존재하지 않는 화면이고, 돌아오는 길이 없는 화면은 감옥입니다.", "홈 → 실습 / 홈 → 호스트 → 리더보드 / 참가 → 채점 → 등록 → 리더보드. 화면 7개, 화살표로 이어짐.", "상태 변화(같은 화면이 바뀜)와 이동(다른 화면으로 감)은 다릅니다 — 채점 버튼은 상태를 바꾸고, 등록 버튼은 이동시킵니다."],
    ["UI vs UX — 생김새와 겪는 것", "식당의 인테리어(UI)와 \"주문부터 음식까지 편했나\"(UX).", "UI = 보이는 것 — 뼈대+옷. 색·배치·글꼴·둥근 모서리. UX = 겪는 것 — 움직임+상태+이동. 몇 번 눌러야 하나, 기다릴 때 불안하지 않나, 다음에 뭘 할지 보이나.", "둘은 따로 좋고 따로 나쁠 수 있습니다. \"예쁜데 불편한 앱\"과 \"못생겼는데 편한 앱\"이 둘 다 존재하는 이유. 설계할 땐 둘을 따로 점검합니다.", "UI — 등급 배지 색, 큰 점수 숫자. UX — 채점 끝나면 등록 카드가 화면 하단에 고정돼 다음 행동이 보이고, 결과 위치로 자동 스크롤.", "12차에서 \"UI=생김새, UX=경험\"이라고 이름표만 붙였죠. 오늘은 그 이름표를 4단 위에 얹은 겁니다 — UI는 뼈대·옷의 일, UX는 움직임·상태·이동의 일."],
  ]],
];

function makeDict() {
  const ch = [];
  ch.push(H1("화면 용어 사전 — 중급반 2강"));
  ch.push(P([run("못 외워도 됩니다. ", { size: 19, bold: true, color: TEAL }), run("시험 보는 사전이 아니라, 필요할 때 찾아보는 사전입니다. 수업이 끝나면 여기 단어들이 \"아는 단어\"로 바뀌어 있을 거예요. 항목마다 비유 → 무엇인가 → 왜 있나 → 채점기에서 → 헷갈리지 마세요 순서. ⭐ = 오늘의 핵심 (다섯 개: HTML · CSS · JS · 컴포넌트 · 상태).", { size: 18, color: MUTED })], { before: 0, after: 120 }));
  const LAB = ["비유", "무엇인가", "왜 있나", "채점기에서", "헷갈리지 마세요"];
  for (const [part, items] of DICT) {
    ch.push(H2(part));
    for (const [title, ...fields] of items) {
      ch.push(new Paragraph({ children: [run(title, { size: 22, bold: true, color: INK })], spacing: { before: 200, after: 40 }, keepNext: true }));
      ch.push(table([1500, W - 1500], fields.map((f, i) => [
        cell([P([run(LAB[i], { size: 16, bold: true, color: TEAL })], { before: 10, after: 10, line: 240 })], 1500, { fill: i === 0 ? "F0FDFA" : "F9FAFB" }),
        cell([P([run(f, { size: 17, bold: i === 0, color: i === 4 ? "7F1D1D" : INK })], { before: 10, after: 10, line: 250 })], W - 1500, { fill: i === 0 ? "F0FDFA" : undefined }),
      ])));
    }
  }
  ch.push(PIN("이 사전의 단어 17개 중 오늘 몸에 붙여야 할 건 ⭐ 다섯 개뿐입니다 — HTML · CSS · JS · 컴포넌트 · 상태. 나머지는 찾아보면 됩니다."));
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
  await build(makeWorksheet(), "/home/user/14cha/02_화면도_숙제템플릿.docx");
  await build(makeDict(), "/home/user/14cha/04_화면용어사전.docx");
})();
