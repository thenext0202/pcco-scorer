// 17차 「내 캘린더를 주소로」 — 02 UX 설계 카드(1쪽) · 04 참고 카드 합본(2쪽) docx 생성 (docx-js)
// 사용: cd 17차 && NODE_PATH=$(npm root -g) node make_docx_17.js
// 헬퍼는 16차 make_docx.js 그대로. CLAUDE.md 예시는 04_참고카드/CLAUDE.md_예시.txt가 원본(그대로 읽어 그린다).
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

const H2c = (t, extra) => new Paragraph({
  children: [run(t, { size: 22, bold: true, color: TEAL })].concat(extra ? [run("  " + extra, { size: 16, color: MUTED })] : []),
  spacing: { before: 130, after: 50 }, keepNext: true,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "B9E8E2", space: 2 } },
});
// 17차 추가 헬퍼 — 셀 안 기입 밑줄 / 작은 회색 줄 / 복사 상자
const ULINE = (label, o = {}) => new Paragraph({
  children: [run(label || "", { size: o.size || 17, color: o.color || MUTED })],
  spacing: { before: o.before ?? 60, after: o.after ?? 60, line: o.line ?? 380 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "9CA3AF", space: 1 } },
});
const G = (t, o = {}) => P([run(t, { size: o.size || 16, color: o.color || MUTED, bold: o.bold })], { before: o.before ?? 10, after: o.after ?? 10, line: o.line ?? 250 });
const BOX = (lines, o = {}) => table([W], [[cell(lines.map((l) => P([run(l, { size: o.size || 17, color: o.color || INK, bold: o.bold })], { before: 2, after: 2, line: o.line ?? 240 })), W, { fill: o.fill || "F9FAFB", borders: cellBorders(o.border || "9CA3AF") })]]);

// ───────────────────────── 02 UX 설계 카드 (A4 1쪽) ─────────────────────────
function makeCard() {
  const ch = [];
  ch.push(new Paragraph({ children: [run("UX 설계 카드 — 질문 다섯 개", { size: 30, bold: true, color: INK }), run("   17차 「내 캘린더를 주소로」", { size: 17, color: MUTED })], spacing: { before: 0, after: 40 } }));
  ch.push(P([run("양식이 아니라 질문입니다. 답은 각자 — 월 보기든 주 보기든, 체크를 어떻게 하든. ", { size: 17, color: MUTED }), run("다섯 답이 있으면 AI에게 시킬 수 있고, 없으면 AI가 멋대로 정합니다.", { size: 17, bold: true, color: TEAL }), run(" 한 줄씩이면 충분합니다(10분).", { size: 17, color: MUTED })], { before: 0, after: 60, line: 260 }));
  ch.push(P([run("이름: ______________　　내 캘린더 이름: ______________________　　날짜: ____________", { size: 18 })], { before: 40, after: 80 }));

  const L = 3700, R = W - L;
  const q = (num, title, sub, miss, right) => [
    cell([
      P([run(num + " " + title, { size: 19, bold: true, color: INK })], { before: 20, after: 10, line: 260 }),
      G(sub, { size: 16, color: INK }),
      G("빠뜨리면 → " + miss, { size: 15 }),
    ], L, { fill: "F9FAFB" }),
    cell(right, R),
  ];
  ch.push(table([L, R], [
    q("①", "쓰는 사람 한 명", "누가, 하루 몇 번, 어디서(폰/PC) 여나", "AI가 \"모두를 위한 앱\"을 만든다 = 누구에게도 안 맞는 앱", [ULINE(), ULINE()]),
    q("②", "핵심 과업 하나", "이 앱으로 가장 자주 하는 일", "모든 기능이 같은 크기 → 가장 자주 하는 일이 3탭", [ULINE(), ULINE()]),
    q("③", "상태 4칸", "비어 있을 때 · 기다릴 때 · 됐을 때 · 안 됐을 때 — 화면에 뭐가 보이나", "빈 화면이 고장처럼 보이고, 저장됐는지 몰라 두 번 누른다",
      [ULINE("비어 있을 때:"), ULINE("기다릴 때:"), ULINE("됐을 때:"), ULINE("안 됐을 때:")]),
    q("④", "이동과 돌아오는 길", "어디서 어디로, 오늘로 어떻게 돌아오나", "다음 달 갔다가 못 돌아온다", [ULINE(), ULINE()]),
    q("⑤", "폰 먼저", "엄지로 되나, 누르는 건 44px", "PC에선 되는데 폰에서 깨진다",
      [P([run("☐ 엄지 하나로 핵심 과업이 되나", { size: 18 })], { before: 60, after: 40 }), P([run("☐ 누르는 건 전부 44px 이상 (7열이 가로 스크롤 없이)", { size: 18 })], { before: 40, after: 60 })]),
  ]));
  ch.push(P([run("→ 이 다섯 답을 그대로 Claude Code에 읽어 주세요 ", { size: 18, bold: true, color: "0F4A44" }), run("(또는 CLAUDE.md ## 화면 에 옮기세요 — 참고 카드 A).  \"쓰는 사람은 ___, 핵심 과업은 ___, 상태는 ___, 이동은 ___, 폰 먼저. 이대로 업무 일정체크 캘린더 v1을 만들어. 파일은 폴더 3단계로.\"", { size: 16, color: "0F4A44" })], { shade: "F0FDFA", before: 80, after: 40, line: 250 }));
  ch.push(P([run("내 주소:  https:// ________________ .github.io/ ________________ /", { size: 18 })], { before: 40, after: 40 }));

  ch.push(H2("손님 테스트 기록 — 실습 ③", "내 폰에서 내 주소 → ②의 핵심 과업을 처음 쓰는 사람처럼 · 바퀴 수는 자유"));
  ch.push(P([run("규칙 하나: \"아는 길로 가지 않는다. 화면이 알려주는 길로만 간다.\"", { size: 19, bold: true, color: INK }), run("   센다 → 하나 고친다 → push → 폰 새로고침 → 다시 손님", { size: 16, color: MUTED })], { before: 20, after: 40 }));
  ch.push(T([800, 1200, 2700, 1900, W - 800 - 1200 - 2700 - 1900], ["바퀴", "탭 수", "멈칫한 곳", "됐는지 화면이 말했나", "고친 것 한 가지 (\"___만 고쳐\")"], [
    ["1", "___탭", "", "O  /  X", ""], ["2", "___탭", "", "O  /  X", ""], ["3", "___탭", "", "O  /  X", ""],
  ], { rowHeight: 680 }));
  ch.push(G("관찰 → 고칠 것:  멈칫 → 보이지 않는 것(상태·안내)  ｜  헤맴 → 이름·위치(이동)  ｜  확인 불가 → 피드백 없음(상태)", { size: 15, before: 40, after: 40 }));
  ch.push(P([run("슬랙 제출 — ", { size: 18, bold: true }), run("주소: ______________________________　고친 것 한 줄: ______________________________　(설치했으면 홈 화면 캡처)", { size: 17 })], { before: 40, after: 40 }));
  ch.push(G("손님인 척해도 주인은 주인 — 마지막엔 강사가 누릅니다. \"화면이 알려줬나요, 아셨나요?\"", { size: 15, before: 20, after: 0 }));
  return ch;
}

// ───────────────────────── 04 참고 카드 합본 (A4 2쪽) ─────────────────────────
function readClaudeExample() {
  const txt = fs.readFileSync(path.join(OUT, "04_참고카드", "CLAUDE.md_예시.txt"), "utf8");
  return txt.split("\n").slice(3).join("\n").trimEnd().split("\n"); // 맨 위 주석 2줄 + 빈 줄 제외
}
function claudeLines(lines) {
  return lines.map((l) => {
    if (l.startsWith("# ")) return P([run(l, { size: 17, bold: true, color: INK })], { before: 0, after: 20, line: 240 });
    if (l.startsWith("## ")) return P([run(l, { size: 16, bold: true, color: TEAL })], { before: 60, after: 10, line: 240 });
    if (l === "") return P([run("", { size: 8 })], { before: 0, after: 0, line: 120 });
    return P([run(l, { size: 15, color: INK })], { before: 0, after: 0, line: 235 });
  });
}
function makeCardA() {
  const ch = [];
  ch.push(new Paragraph({ children: [run("참고 카드 A — 작업실", { size: 28, bold: true, color: INK }), run("   참고용 · 이름·개수는 자유", { size: 17, color: MUTED })], spacing: { before: 0, after: 40 } }));
  ch.push(G("17차 「내 캘린더를 주소로」 · 이 카드는 예시입니다. 폴더 이름도 파일 개수도 CLAUDE.md도 — 쓰든 안 쓰든 자유. \"이렇게 하세요\"가 아니라 \"빠뜨리면 이렇게 됩니다\"만 적었습니다.", { size: 16, after: 40 }));

  ch.push(H2c("① 폴더 3단계 — 예시 트리", "12차 지도 3층 그대로: 지형(루트) · 골목(폴더) · 문패(파일)"));
  const tw = [1700, 3500, W - 5200];
  const tree = [
    ["1 루트 · 지형", "내-캘린더/", "주소가 가리키는 곳 — PWA 서류(manifest·sw)는 여기"],
    ["", "  index.html", "화면 한 장"],
    ["", "  manifest.json", "앱 정보 — 이름·아이콘·색 (실습 ④에서 생김)"],
    ["", "  sw.js", "오프라인·캐시 (실습 ④에서 생김)"],
    ["", "  CLAUDE.md", "지침 한 장 (권장 — 아래 ②)"],
    ["2 폴더 · 골목", "  css/  ·  js/  ·  icons/", "옷 · 움직임 · 그림을 가른다 — \"옷 바꾸다 뼈 부러지지 않게\". data/ 등 추가 자유"],
    ["3 파일 · 문패", "    style.css · app.js · icon-192.png …", "이름·개수 자유. 한 파일에 한 역할"],
  ];
  ch.push(T(tw, ["단계", "이름 (예시)", "역할"], tree.map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 && x !== "", color: i === 1 ? "0F4A44" : INK })], { before: 10, after: 10, line: 240 })], tw[i], { fill: i === 0 && x !== "" ? "F0FDFA" : undefined }))), {}));
  ch.push(P([run("왜 3단계 — ", { size: 17, bold: true, color: INK }), run("한 폴더에 다 쏟으면 AI가 다음 과업에서 엉뚱한 파일을 건드린다. 3단계면 충분하고, 3단계는 있어야 한다.", { size: 17 })], { before: 60, after: 20, line: 260 }));

  ch.push(H2c("② CLAUDE.md 예시 — 권장", "써두면 매 과업마다 다시 말하지 않아도 됩니다 · 안 써도 됩니다"));
  ch.push(G("15차 지침의 Claude Code판. 쓰는 사람은 ___ 와 ## 화면 절만 내 것으로 — 설계 카드 질문 5의 답을 거기에 옮기면 그게 곧 지침. 복사용 전문은 CLAUDE.md_예시.txt (zip 안).", { size: 15, after: 40 }));
  const lines = readClaudeExample();
  const cut = lines.findIndex((l) => l.startsWith("## 화면"));
  const half = Math.floor((W - 200) / 2);
  ch.push(table([half, 200, half], [[
    cell(claudeLines(lines.slice(0, cut)), half, { fill: "F9FAFB", borders: cellBorders("9CA3AF") }),
    cell([P("")], 200, { borders: cellBorders("FFFFFF") }),
    cell(claudeLines(lines.slice(cut)), half, { fill: "F9FAFB", borders: cellBorders("9CA3AF") }),
  ]]));

  ch.push(H2c("③ 시키는 문장 예 3", "길게 쓰지 마세요 — 다섯 답이면 됩니다 · 형용사는 숫자(탭 수·px·초)로"));
  ch.push(T([1700, W - 1700], ["언제", "문장"], [
    ["실습 ② 만들기", "\"설계 카드 다섯 답대로 업무 일정체크 캘린더 v1을 만들어. 파일은 폴더 3단계로.\"  (CLAUDE.md에 옮긴 사람은 \"CLAUDE.md대로 v1\"로 끝)"],
    ["실습 ② 주소", "\"이 폴더를 GitHub 공개 저장소로 올리고 Pages를 켜서 주소를 알려줘. 내가 직접 해야 하는 게 있으면 그것부터 한 단계씩.\""],
    ["실습 ③ 고치기", "\"___만 고쳐. 다른 건 건드리지 마.\"  (UI를 바꾸고 싶으면 한 문장 — \"분위기 ○○, 주색 ○○, 구조는 그대로\")"],
  ].map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 })], { before: 10, after: 10, line: 250 })], [1700, W - 1700][i]))), {}));
  return ch;
}
function makeCardB() {
  const ch = [];
  ch.push(new Paragraph({ children: [run("참고 카드 B — 앱으로, 그리고 막혔을 때", { size: 28, bold: true, color: INK }), run("   참고용", { size: 17, color: MUTED })], spacing: { before: 0, after: 40 } }));
  ch.push(G("실습 ④(앱으로 만들기·설치)와 막혔을 때 보는 카드. 여기까지 못 가도 결과물입니다 — 주소만 있어도 제출.", { size: 16, after: 40 }));

  ch.push(H2c("① PWA 5요소 — 7차 복습 한 줄씩"));
  const w5 = [1500, 3000, W - 4500];
  ch.push(T(w5, ["요소", "뜻", "오늘 내 캘린더에서"], [
    ["화 · 화면", "폰 세로 먼저", "7열이 가로 스크롤 없이 · 누르는 건 44px (설계 질문 ⑤)"],
    ["정 · 정보", "manifest.json — 이름·아이콘·색", "홈 화면에 뜰 이름과 아이콘(icons/)"],
    ["오 · 오프라인", "sw.js — 서비스워커", "지하철에서도 열린다 (대신 캐시 — 아래 ③)"],
    ["저 · 저장", "localStorage — 오늘의 주머니", "일정은 이 브라우저에만 남는다. 창고는 다음 강의"],
    ["배 · 배포", "HTTPS 주소", "= github.io. 그래서 설치가 된다"],
  ].map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0, color: i === 0 ? "0F4A44" : INK })], { before: 8, after: 8, line: 240 })], w5[i]))), {}));

  ch.push(H2c("② 시키는 문장 — 한 줄이면 Claude Code가 합니다"));
  ch.push(BOX(["\"이 주소를 앱으로 만들어 홈 화면에 설치할 수 있게 — manifest.json과 sw.js를 추가해. 아이콘은 icons/에.\""], { bold: true, fill: "F0FDFA", border: "B9E8E2", size: 17 }));
  ch.push(G("→ push → 1~3분 → 폰 브라우저에서 내 주소 열기 → '홈 화면에 추가' (iPhone: 공유 버튼 / Android: 메뉴 ⋮)", { size: 16, color: INK, before: 30, after: 0 }));

  ch.push(H2c("③ 설치는 마지막 — 고치기가 끝난 뒤에"));
  ch.push(NOTE("설치하면 서비스워커가 화면을 캐시합니다 → 설치 후엔 고쳐서 push해도 느리게(또는 안) 바뀌어 보입니다. 고치기를 반복하는 실습 ③은 설치 전에. 설치 후 꼭 고쳐야 하면 앱을 완전히 닫았다 열거나, 브라우저로 주소를 열어 확인."));

  ch.push(H2c("④ 사람이 직접 해야 하는 2가지 — LLM이 대신 못 하는 것"));
  const w4 = [1800, 3600, W - 5400];
  ch.push(T(w4, ["", "어디서", "두 줄"], [
    ["(a) GitHub 로그인", "터미널 gh auth login → GitHub.com → HTTPS → \"Login with a web browser\"", "브라우저가 열리면 로그인하고 터미널의 코드를 입력. gh auth status 로 확인"],
    ["(b) Pages 켜기", "GitHub 저장소 → Settings → Pages", "Branch main / (root) → Save. Claude Code가 못 켜면 이 두 번 클릭 — 1~3분 뒤 주소가 열림"],
  ].map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 })], { before: 8, after: 8, line: 240 })], w4[i]))), {}));
  ch.push(G("\"내가 직접 해야 하는 게 있으면 그것부터 한 단계씩\" 한 줄을 붙이면 Claude Code가 이 두 곳을 짚어 줍니다.", { size: 15, before: 20, after: 0 }));

  ch.push(H2c("⑤ 막힘 해결 3단계 — 안 될 때 하는 순서", "자유도가 큰 수업일수록 더 필요"));
  const w3 = [1700, 4300, W - 6000];
  ch.push(T(w3, ["단계", "하는 것", "하지 않는 것"], [
    ["① 복사", "에러를 그대로 복사 — 줄이지 않는다", "\"안 돼요\"라고만 쓰기 · 요약하기"],
    ["② 세 줄로 묻기", "아래 틀대로 OS · 하려던 것 · 에러 + 마지막 한 줄", "처음부터 다 설명하기 · 여러 질문 한 번에"],
    ["③ 한 단계만", "시키는 첫 단계만 → 확인 → 안 되면 ①로", "다 한 번에 하기 · 안 됐는데 다음 단계"],
  ].map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 })], { before: 8, after: 8, line: 240 })], w3[i]))), {}));
  ch.push(G("묻는 문장 틀 — 복사해서 빈칸만", { size: 16, bold: true, color: INK, before: 40, after: 10 }));
  ch.push(BOX(["내 OS: ___", "하려던 것: ___", "에러: ___", "내가 직접 해야 하는 게 있으면 그것부터, 한 번에 한 단계만."], { size: 16 }));
  ch.push(G("어디에: Claude Code 프롬프트 안에서 바로. 안 뜨면 claude.ai 새 대화에.  3분 규칙 — 3분 안에 안 풀리면 세팅 창구(3분) → 아래 긴급 경로.", { size: 15, color: INK, before: 30, after: 0 }));

  ch.push(H2c("⑥ 긴급 경로 — 창구에서도 안 될 때"));
  const w6 = [900, 2600, W - 3500];
  ch.push(T(w6, ["경로", "언제", "하는 것"], [
    ["A", "Claude Code가 안 뜸", "claude.ai에 설계 카드 다섯 답 + \"단일 HTML 캘린더\" → 다운로드 → 내 폴더에 넣기"],
    ["B", "gh(저장소·push)가 안 됨", "강사 공용 저장소 17-class — 파일을 슬랙으로 보내면 강사가 push → 강사주소/17-class/내이름/ 이 내 주소"],
    ["C", "노트북이 없음", "강사 예비 노트북"],
  ].map((r) => r.map((x, i) => cell([P([run(x, { size: 16, bold: i === 0 })], { before: 8, after: 8, line: 240 })], w6[i]))), {}));
  ch.push(G("어느 경로든 손님 테스트(실습 ③)는 그대로 — 주소만 있으면 됩니다. 경로 B였던 사람은 선택 과제 ⑦(내 계정으로 옮기기).", { size: 15, before: 20, after: 0 }));
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
  await build(makeCard(), path.join(OUT, "02_UX설계카드.docx"));
  await build([...makeCardA(), PB(), ...makeCardB()], path.join(OUT, "04_참고카드", "04_참고카드.docx"));
})();
