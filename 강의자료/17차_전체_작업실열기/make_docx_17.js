// 17차 「작업실을 연다 — 지침 한 장, 주소 하나」 — 02 UX점검표 · 03 캘린더 설계도 3장 · 08 세팅 가이드 docx 생성 (docx-js)
// 사용: cd /mnt/user-data/outputs/17차 && NODE_PATH=$(npm root -g) node make_docx_17.js [출력폴더]
// 헬퍼·폰트(Malgun Gothic)·여백(907)·색(TEAL 0D9488)은 16차 make_docx.js 그대로.
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

// 표 그림(데이터도용): 제목 + 열 n칸 — 16차 TBLPIC를 열 이름 가변으로 (cols = 소제목 배열)
const TBLPIC = (title, cols, rows, width, o = {}) => {
  const n = cols.length;
  const ws = o.colWidths || cols.map((_, i) => (i === n - 1 ? width - Math.floor(width / n) * (n - 1) : Math.floor(width / n)));
  const sub = cols.map((h, i) => cell([P([run(h, { size: 14, bold: true, color: TEAL })], { before: 6, after: 6 })], ws[i], { fill: "F0FDFA" }));
  const body = rows.map((r) => r.map((x, i) => {
    const grey = o.greyRows && o.greyRows.includes(rows.indexOf(r));
    return cell([P([run(x, { size: 16, bold: i === 0 && x !== "" && !grey, color: grey ? "9CA3AF" : INK, italics: grey })], { before: o.rowPad ?? 14, after: o.rowPad ?? 14, line: 250 })], ws[i], { borders: cellBorders("374151") });
  }));
  return new Table({
    width: { size: width, type: WidthType.DXA }, columnWidths: ws,
    rows: [new TableRow({ children: [new TableCell({ columnSpan: n, width: { size: width, type: WidthType.DXA }, borders: cellBorders("0F172A"), shading: { type: ShadingType.CLEAR, fill: o.fill || "0F172A", color: "auto" }, margins: { top: 40, bottom: 40, left: 100, right: 100 }, children: [P([run(title, { size: 17, bold: true, color: "FFFFFF" })], { before: 0, after: 0 })] })] }),
      new TableRow({ children: sub }), ...body.map((r) => new TableRow({ children: r }))],
  });
};
// 코드/트리 블록 — 고정폭 느낌(회색 상자, 줄 간격 좁게)
const CODE = (lines, o = {}) => new Table({
  width: { size: o.width || W, type: WidthType.DXA }, columnWidths: [o.width || W],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: o.width || W, type: WidthType.DXA }, borders: cellBorders("CBD5E1"),
    shading: { type: ShadingType.CLEAR, fill: o.fill || "F8FAFC", color: "auto" }, margins: { top: 80, bottom: 80, left: 140, right: 140 },
    children: lines.map((l) => new Paragraph({ children: [new TextRun({ text: l, font: o.font || "Consolas", size: o.size || 17, color: INK, bold: o.bold })], spacing: { before: 0, after: 0, line: o.line || 250 } })),
  })] })],
});
const CHK = (t, o = {}) => P([run("☐ " + t, { size: o.size || 18 })], { before: o.before ?? 20, after: o.after ?? 20, line: 280 });
const RL = (parts, o = {}) => P(parts.map((p) => typeof p === "string" ? run(p, { size: o.size || 18 }) : run(p.t, { size: p.size || o.size || 18, bold: p.b, color: p.c, italics: p.i })), o);
const HEAD = (title, sub) => [
  new Paragraph({ children: [run(title, { size: 26, bold: true, color: INK }), run(sub ? "   " + sub : "", { size: 17, color: MUTED })], spacing: { before: 0, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: TEAL, space: 3 } } }),
];

// ───────────────────────── 02 UX 점검표 (A4 1쪽) ─────────────────────────
function makeChecklist() {
  const ch = [];
  const s = 17;
  ch.push(new Paragraph({ children: [run("UX 점검표", { size: 30, bold: true, color: INK }), run("   17차 「작업실을 연다」 · A4 1쪽 · 상단은 실습 ②, 하단은 실습 ③", { size: 16, color: MUTED })], spacing: { before: 0, after: 40 } }));
  ch.push(RL([{ t: "이름: ______________　　날짜: ______________　　", size: 18 }, { t: "🧭 손님 모드 규칙 — ", b: true, c: "0F4A44", size: 18 }, { t: "\"아는 길로 가지 않는다. 화면이 알려주는 길로만 간다.\"", b: true, c: "0F4A44", size: 18 }], { before: 40, after: 40, shade: "F0FDFA" }));

  ch.push(H2("상단 — 자가 진단", "실습 ② 첫 실행 뒤 · 체크가 적을수록 좋다 — 빈칸이 오늘 고칠 것"));
  ch.push(RL([{ t: "상태 4칸 ", b: true, size: s }, { t: "— 내 달력에 지금 있는 것만 ✔ (보통 1~2칸 — 그게 오늘의 증명)", c: MUTED, size: 16 }], { before: 40, after: 20 }));
  ch.push(T([2523, 2523, 2523, 2523], ["비어 있음", "기다림", "성공", "실패"], [
    ["☐ 일정 없는 달에\n안내 한 줄", "☐ 저장 중 / 저장됨\n표시", "☐ 추가됨\n(넣은 게 보임)", "☐ 잘못 입력 거절\n(제목·날짜 없음 → 이유)"],
  ].map((r) => r.map((x) => cell(x.split("\n").map((l) => P([run(l, { size: 16 })], { before: 6, after: 6, line: 240 })), 2523)))));
  ch.push(RL([{ t: "이동 2  ", b: true, size: s }, "☐ ◀ ▶ 달 넘기기　☐ 어느 달에서든 「오늘」로 1탭　　", { t: "폰  ", b: true, size: s }, "☐ 폰 세로에서 7열이 가로 스크롤 없이 다 보인다"], { before: 60, after: 20, size: s }));
  ch.push(RL([{ t: "좋은 화면의 원칙 5 (14차)  ", b: true, size: s }, "☐ ① 한 화면 한 목적　☐ ② 반복되면 부품　☐ ③ 상태를 빠뜨리지 않는다　☐ ④ 폰 먼저　☐ ⑤ 보이는 것과 하는 것 분리"], { before: 20, after: 20, size: s }));
  ch.push(...BLANK("내 주소:  https://", 1));

  ch.push(H2("하단 — 손님 테스트 기록표", "실습 ③ · 내 폰에서 내 주소 · 처음 보는 앱인 것처럼 · 과업은 그대로 수행"));
  ch.push(T([4292, 900, 3400, 1500], ["과업", "탭 수", "멈칫한 곳 (화면이 안 알려준 자리)", "화면이 알려줬나"], [
    ["① 다음 주 화요일에 '○○'(내 업무 종류 하나) 일정을 넣는다", "", "", "O  /  X"],
    ["② 방금 넣은 걸 지운다", "", "", "O  /  X"],
    ["③ 다음 달로 넘어갔다가 오늘로 돌아온다", "", "", "O  /  X"],
  ], { rowHeight: 620 }));
  ch.push(RL([{ t: "관찰 → 규칙 3패턴  ", b: true, c: TEAL, size: 16 }, { t: "멈칫", b: true, size: 16 }, { t: " → 보이지 않는 것(상태·안내)　", size: 16 }, { t: "헤맴", b: true, size: 16 }, { t: " → 이름·위치(이동·부품)　", size: 16 }, { t: "확인 불가", b: true, size: 16 }, { t: " → 피드백 없음(상태)　", size: 16 }, { t: "· 기록이 전부 \"없음\"이면 — 화면이 알려줬나요, 아셨나요?", c: MUTED, size: 15 }], { before: 40, after: 20 }));
  ch.push(...BLANK("고칠 것 1 (___에서 멈칫):", 1));
  ch.push(...BLANK("→ 규칙 한 줄 (측정 가능하게 — \"알기 쉽게\" ✗ → \"1초간 초록 띠\" ○ · CLAUDE.md 「규칙」 6번에):", 1));
  ch.push(RL([{ t: "재시도 결과 ", b: true, size: s }, "(push → 폰 새로고침 → 같은 과업 손님 모드):  탭 수  ______  →  ______　　멈칫이 없어졌나  ☐ 예  ☐ 아니오"], { before: 60, after: 40, size: s }));

  ch.push(RL([{ t: "슬랙 제출 양식 ", b: true, c: TEAL, size: 18 }, { t: "— 복사해서 4칸 채우기 · 주소만 필수 (로컬까지만 됐으면 \"주소 없음\" + 규칙 한 줄)", c: MUTED, size: 15 }], { before: 80, after: 20 }));
  ch.push(T([2300, 7792], ["칸", "적을 것"], [["이름", ""], ["주소", "https://"], ["고친 규칙 한 줄", ""], ["탭 수 변화", "______  →  ______"]], { rowHeight: 440 }));
  ch.push(PIN("매주 눌렀습니다. 오늘은 남이 누릅니다. — 제출된 주소를 강사가 폰에서 열어 같은 과업 ①을 수행하며 탭 수를 셉니다."));
  return ch;
}

// ───────────────────────── 03 캘린더 설계도 3장 (A4 3쪽) ─────────────────────────
function makeBlueprints() {
  const ch = [];
  // ── 1쪽 구조도
  ch.push(...HEAD("17차 · 캘린더 설계도 ① 구조도", "12차 양식 · 완성 견본(읽기용) · 작성 순서: 한 문장 → 트리 → 루트 파일 체크 — 쓰지 않습니다"));
  ch.push(RL([{ t: "이름: ____________　날짜: ____________　작업실 이름: ____________　", size: 17 }, { t: "설계도 세 장 = CLAUDE.md의 세 절(구조·화면·데이터). 오늘 각자 채우는 칸은 ③의 「종류」 표 하나뿐.", c: MUTED, size: 15 }], { before: 20, after: 60 }));
  ch.push(RL([{ t: "① 이 앱 — 한 문장 ", b: true, size: 18 }, { t: "(누가 · 무엇을 하면 · 무엇이 남는가)", c: MUTED, size: 15 }], { before: 40, after: 10 }));
  ch.push(P([run("내가 날짜를 고르고 일정을 넣으면 내 업무 종류 색으로 달력에 표시되고, 새로고침해도 남는다.", { size: 18, bold: true, color: "0F4A44" })], { shade: "F0FDFA", before: 20, after: 40 }));
  ch.push(RL([{ t: "② 쏟아내기 → ③ 묶기  ", b: true, size: 18 }, { t: "이번 달 그리드 · 오늘 표시 · 달 넘기기 · 오늘로 돌아오기 · 일정 넣기 · 일정 지우기 · 종류별 색 · 껐다 켜도 남기 → ", size: 16 }, { t: "보이는 것", b: true, size: 16 }, { t: " = 뼈대 + 옷 / ", size: 16 }, { t: "계산·저장·그리기", b: true, size: 16 }, { t: " = 움직임 / ", size: 16 }, { t: "남는 것", b: true, size: 16 }, { t: " = 브라우저 저장(주머니)", size: 16 }], { before: 40, after: 40 }));
  ch.push(RL([{ t: "④ 트리 ", b: true, size: 18 }, { t: "— 파일마다 \"왜\" 한 줄 + 태그 ([화] 화면 · [동] 동작 · [데] 데이터)", c: MUTED, size: 15 }], { before: 40, after: 20 }));
  const treeRow = (name, why, tag, o = {}) => [
    cell([P([run(name, { size: 17, bold: !o.dim, color: o.dim ? MUTED : INK })], { before: 10, after: 10, line: 250 })], 2400, { fill: "F8FAFC", borders: cellBorders("F8FAFC") }),
    cell([P([run("왜: " + why, { size: 16, color: o.dim ? MUTED : INK })], { before: 10, after: 10, line: 250 })], 6392, { fill: "F8FAFC", borders: cellBorders("F8FAFC") }),
    cell([P([run(tag, { size: 16, bold: true, color: TEAL })], { before: 10, after: 10, line: 250 })], 1300, { fill: "F8FAFC", borders: cellBorders("F8FAFC") }),
  ];
  ch.push(new Table({ width: { size: W, type: WidthType.DXA }, columnWidths: [2400, 6392, 1300], rows: [
    new TableRow({ children: [new TableCell({ columnSpan: 3, width: { size: W, type: WidthType.DXA }, borders: cellBorders("F8FAFC"), shading: { type: ShadingType.CLEAR, fill: "F8FAFC", color: "auto" }, margins: { top: 60, bottom: 20, left: 100, right: 100 }, children: [P([run("내-캘린더/", { size: 18, bold: true })], { before: 0, after: 0 })] })] }),
    new TableRow({ children: treeRow("├─ CLAUDE.md", "AI용 문패 — 지침 한 장 (설계도 세 장이 세 절로 접힘)", "[문패]") }),
    new TableRow({ children: treeRow("├─ index.html", "뼈대 — 상단(월 이름·◀ ▶·오늘 버튼) / 달력 그리드 / 일정 입력 폼 / 선택한 날의 일정 목록", "[화]") }),
    new TableRow({ children: treeRow("├─ style.css", "옷 — 색·크기·간격만 (분위기·주색은 여기서 바뀜)", "[화]") }),
    new TableRow({ children: treeRow("└─ app.js", "움직임 — 달 계산 · 저장(브라우저) · 그리기", "[동][데]") }),
    new TableRow({ children: treeRow("     (창고 자리)", "비워 둠 — 오늘 데이터는 주머니(브라우저 저장). 창고는 다음 강의", "★ 보너스", { dim: true }) }),
  ] }));
  ch.push(RL([{ t: "파일 3개 = 14차 삼형제 ", b: true, size: 18 }, { t: "— 오늘 유일한 '정체 공개'. 열어 보지 않습니다, 이름만 압니다.", c: MUTED, size: 15 }], { before: 100, after: 20 }));
  ch.push(T([1500, 1900, 3692, 3000], ["파일", "실명", "한 줄 역할", "오늘 누가 건드리나"], [
    ["index.html", "뼈대 (HTML)", "무슨 상자들이 있나 — 상단 · 그리드 · 폼 · 목록", "과업 1에서 Claude Code가 만든다"],
    ["style.css", "옷 (CSS)", "그 상자의 색 · 크기 · 자리", "과업 4(UI 한 문장)에서만 바뀐다"],
    ["app.js", "움직임 (JavaScript)", "누르면 무엇이 일어나나 — 달 계산 · 저장 · 그리기", "과업 3(규칙 한 줄)에서 바뀐다"],
  ]));
  ch.push(RL([{ t: "⑤ 루트에 둘 파일  ", b: true, size: 18 }, { t: "☑ CLAUDE.md (AI용 문패 — 04 배포키트 템플릿)  ·  ☐ README — 생략(강사가 주소로 본다)  ·  ☐ 재료 목록 — 생략(규칙 1 \"빌드 도구·패키지 금지\")  ·  ☐ .env — 생략(비밀 열쇠 없음)  ·  ☐ .gitignore — 생략(숨길 것 없음).  ", size: 16 }, { t: "비워도 되는 칸이 있다는 것도 설계.", b: true, size: 16 }], { before: 80, after: 40 }));
  ch.push(P([run("✅ 합격 기준과 대조: 최상위 3~6개? → 파일 3 + 문패 1 ✓ / 모든 파일에 \"왜\"? ✓ / 태그? ✓ / 보너스(안 만들 자리 = 창고)? ✓", { size: 16, color: "0F4A44" })], { shade: "F0FDFA", before: 40, after: 40 }));
  ch.push(NOTE("초급반에서 '데이터·동작·화면·연결'이라 부른 네 칸이 이 세 장입니다 — 연결은 오늘 없음(혼자 쓰는 달력)."));
  ch.push(PIN("→ CLAUDE.md `## 구조 (구조도)` 절 — 이 쪽이 그 세 줄입니다."));

  // ── 2쪽 화면도
  ch.push(PB());
  ch.push(...HEAD("17차 · 캘린더 설계도 ② 화면도", "14차 양식 5단계 · 완성 견본 · 작성 순서: ①~④ 읽기 → ⑤ 상태 4칸만 실습 ②에서 채우기"));
  ch.push(RL([{ t: "① 화면 목록 ", b: true, size: 18 }, { t: "(한 화면 = 한 목적):  ", c: MUTED, size: 15 }, { t: "1 월 보기", b: true, size: 17 }, { t: " — 이번 달을 보고, 날짜를 골라 일정을 넣고 지운다. (주 보기·설정 화면 없음 — 임무 밖)", size: 17 }], { before: 40, after: 20 }));
  ch.push(RL([{ t: "② 이동 화살표 ", b: true, size: 18 }, { t: "— 화면이 하나라 화살표는 자기 자신으로 돌아옵니다:", c: MUTED, size: 15 }], { before: 40, after: 20 }));
  ch.push(CODE(["[월 보기] ──\"◀ ▶\" 버튼──▶ [월 보기 · 다른 달] ──\"오늘\" 버튼──▶ [월 보기 · 이번 달]"], { font: FONT, size: 16 }));
  ch.push(RL([{ t: "③ 상자 그리기 + ④ 부품 표시 ", b: true, size: 18 }, { t: "— 대표 화면 = 월 보기 (폰 세로 390px 기준 · ⓟ = 부품)", c: MUTED, size: 15 }], { before: 80, after: 20 }));
  // 폰 목업 (표로)
  const PW = 5200, NW = W - PW - 200;
  const mk = (txt, o = {}) => P([run(txt, { size: o.size || 15, bold: o.bold, color: o.color || INK })], { before: 4, after: 4, line: 220, align: o.align || AlignmentType.CENTER });
  const boxCell = (children, width, fill, border = "94A3B8") => cell(children, width, { fill, borders: cellBorders(border) });
  const cw = Math.floor((PW - 160) / 7);
  const gridRow = (vals, o = {}) => new TableRow({ children: vals.map((v) => boxCell([mk(v, { size: 14, bold: o.bold, color: o.color })], cw, o.fill || "FFFFFF", "CBD5E1")) });
  const grid = new Table({ width: { size: cw * 7, type: WidthType.DXA }, columnWidths: Array(7).fill(cw), rows: [
    gridRow(["일", "월", "화", "수", "목", "금", "토"], { bold: true, fill: "F1F5F9", color: MUTED }),
    gridRow(["", "", "", "1", "2", "3", "4"]), gridRow(["5", "6", "7 ●", "8", "9", "10", "11"]),
    new TableRow({ children: ["12", "13", "14", "15", "16", "17", "18"].map((v, i) => boxCell([mk(v, { size: 14, bold: i === 2, color: i === 2 ? TEAL : INK })], cw, i === 2 ? "E6F7F5" : "FFFFFF", i === 2 ? TEAL : "CBD5E1")) }),
    gridRow(["19", "20", "21", "22", "23 ●", "24", "25"]), gridRow(["26", "27", "28", "29", "30", "31", ""]),
  ] });
  const phone = new Table({ width: { size: PW, type: WidthType.DXA }, columnWidths: [PW], rows: [
    new TableRow({ children: [new TableCell({ width: { size: PW, type: WidthType.DXA }, borders: cellBorders("0F172A"), margins: { top: 80, bottom: 80, left: 80, right: 80 }, children: [
      mk("월 보기", { size: 13, color: MUTED, align: AlignmentType.LEFT }),
      new Table({ width: { size: PW - 160, type: WidthType.DXA }, columnWidths: [PW - 160], rows: [new TableRow({ children: [boxCell([mk("◀      2026년 10월      ▶        [ 오늘 ]", { size: 16, bold: true })], PW - 160, "F8FAFC")] })] }),
      mk("상단 — 이동 2 (◀ ▶ · 오늘)", { size: 12, color: MUTED, align: AlignmentType.LEFT }),
      grid,
      mk("그리드 (7열) — ⓟ 날짜 칸 ×31 · 오늘 칸 테두리 · 일정은 종류 색 점 ●", { size: 12, color: MUTED, align: AlignmentType.LEFT }),
      new Table({ width: { size: PW - 160, type: WidthType.DXA }, columnWidths: [PW - 160], rows: [new TableRow({ children: [boxCell([mk("ⓟ 일정 입력 폼 ─ 날짜 [10/14]  제목 [            ]", { size: 14, align: AlignmentType.LEFT }), mk("종류 [미팅 ▾]  메모 [        ]            [ 추가 ]", { size: 14, align: AlignmentType.LEFT })], PW - 160, "F8FAFC")] })] }),
      mk("폼 — 날짜·제목·종류·메모 + 추가 (누르는 것 44px 이상)", { size: 12, color: MUTED, align: AlignmentType.LEFT }),
      new Table({ width: { size: PW - 160, type: WidthType.DXA }, columnWidths: [PW - 160], rows: [new TableRow({ children: [boxCell([mk("ⓟ 선택한 날(14일)의 일정 목록", { size: 14, align: AlignmentType.LEFT, bold: true }), mk("●  10:00 ○○ 미팅                        [ 삭제 ]", { size: 14, align: AlignmentType.LEFT }), mk("●  마감 — 보고서                          [ 삭제 ]", { size: 14, align: AlignmentType.LEFT })], PW - 160, "F8FAFC")] })] }),
      mk("목록 — 한 줄 = 일정 하나 · 종류 색 ● · 삭제 버튼", { size: 12, color: MUTED, align: AlignmentType.LEFT }),
    ] })] }),
  ] });
  const notes = [
    P([run("부품 3과 \"왜 부품인가\"", { size: 17, bold: true, color: TEAL })], { before: 0, after: 20 }),
    RL([{ t: "날짜 칸 ⓟ", b: true, size: 16 }, { t: " — 왜: 한 달에 28~31번 같은 모양. 숫자·오늘 테두리·색 점만 다르다", size: 15 }], { before: 10, after: 10, line: 250 }),
    RL([{ t: "일정 입력 폼 ⓟ", b: true, size: 16 }, { t: " — 왜: 날짜마다 같은 폼. 날짜만 바뀐다", size: 15 }], { before: 10, after: 10, line: 250 }),
    RL([{ t: "일정 목록 ⓟ", b: true, size: 16 }, { t: " — 왜: 한 줄이 여러 번 반복. 제목·색·삭제 버튼", size: 15 }], { before: 10, after: 10, line: 250 }),
    P([run("이동 2 (완성)", { size: 17, bold: true, color: TEAL })], { before: 80, after: 20 }),
    P([run("◀ ▶ 달 넘기기 · 「오늘」 버튼으로 어느 달에서든 1탭에 돌아오기", { size: 15 })], { before: 10, after: 10, line: 250 }),
    P([run("이 화면에 보이는 데이터 (③ 재료)", { size: 17, bold: true, color: TEAL })], { before: 80, after: 20 }),
    P([run("날짜 · 제목 · 종류(색) · 메모 · 오늘", { size: 15 })], { before: 10, after: 10, line: 250 }),
    NOTE("폰 세로에서 7열이 가로 스크롤 없이 다 보여야 한다 — CLAUDE.md 규칙 4. 그 아래 폼과 목록은 세로로 쌓인다."),
  ];
  ch.push(table([PW, 200, NW], [[cell([phone], PW, { borders: cellBorders("FFFFFF") }), cell([P("")], 200, { borders: cellBorders("FFFFFF") }), cell(notes, NW, { borders: cellBorders("FFFFFF") })]]));
  ch.push(RL([{ t: "⑤ 상태 4칸 — 내 달력엔 뭐가 보이나 ", b: true, size: 18 }, { t: "(실습 ② 자가 진단에서 채우기 · 없으면 \"없음\" — 그게 오늘 고칠 것)", c: MUTED, size: 15 }], { before: 100, after: 20 }));
  ch.push(T([2300, 4200, 3592], ["상태", "유도 질문", "내 달력에 보이는 것 (첫 실행)"], [
    ["비어 있음 — 일정 없는 달", "일정이 0개인 달을 열면 뭐가 보이나? 안내 한 줄이 있나?", ""],
    ["기다림 — 저장 중 / 저장됨", "추가·삭제를 누른 뒤 \"됐다\"가 보이나? 몇 초?", ""],
    ["성공 — 추가됨", "넣은 일정이 어디에 어떻게 나타나나? 색은?", ""],
    ["실패 — 잘못 입력", "제목 없이·날짜 없이 추가를 누르면? 이유가 보이나?", ""],
  ], { rowHeight: 600 }));
  ch.push(PIN("→ CLAUDE.md `## 화면 (화면도)` 절 — 부품 3 · 상태 4 · 이동 2가 그 세 줄입니다."));

  // ── 3쪽 데이터도
  ch.push(PB());
  ch.push(...HEAD("17차 · 캘린더 설계도 ③ 데이터도", "16차 양식 · 반완성 · 작성 순서: ①② 읽기 → ③ 「종류」 표 채우기(실습 ①) → ④⑤ 읽기 → CLAUDE.md에 옮겨 적기"));
  ch.push(NOTE("「종류」 표가 오늘 유일하게 각자 채우는 칸입니다. 내 업무 종류 3~6개 + 색 이름(한글 — \"짙은 초록\"). 이것이 16차 허용목록의 실물 — 목록에 없는 종류는 저장이 거부됩니다."));
  ch.push(RL([{ t: "① 남길 것 고르기 ", b: true, size: 18 }, { t: "— 화면도의 「보이는 데이터」에서: 날짜 · 제목 · 종류(색) · 메모 · 오늘", size: 16 }], { before: 60, after: 10 }));
  ch.push(RL([{ t: "남는 것: ", b: true, c: TEAL, size: 16 }, { t: "일정(날짜·제목·종류·메모·만든 시각) · 종류(이름·색)　　", size: 16 }, { t: "흐르는 것: ", b: true, c: "B45309", size: 16 }, { t: "\"저장됨\" 1초 띠 · 지금 보는 달 · 선택한 날 · 오늘(기기 날짜에서 매번 계산)", size: 16 }], { before: 10, after: 40 }));
  ch.push(RL([{ t: "② 표 이름 짓기 ", b: true, size: 18 }, { t: "— 사실이 두 종류: \"이런 일정이 있다\" / \"이런 종류는 이 색이다\"", size: 16 }], { before: 40, after: 20 }));
  ch.push(T([1800, 3200, 5092], ["표", "한 종류의 사실", "한 줄 ="], [
    ["일정 표", "넣어 둔 일정", "\"10월 7일에 '○○ 미팅'(미팅)을 넣었다\""],
    ["종류 표", "내 업무 종류와 색", "\"미팅은 파랑이다\""],
  ]));
  ch.push(RL([{ t: "③ 열 적기 + ④ 줄 긋기 ", b: true, size: 18 }, { t: "— 왼쪽은 완성, 오른쪽 「종류」 표를 채우세요 (예시 줄은 지워도 됩니다)", c: MUTED, size: 15 }], { before: 120, after: 40 }));
  const half = 4550, mid = W - half * 2;
  const left = TBLPIC("일정 표 (완성)", ["열 이름", "종류", "필수?"], [
    ["번호", "덩어리 번호", "필수 · 자동"], ["날짜", "날짜", "필수"], ["제목", "글자 30자", "필수"], ["종류 →", "글자", "허용목록 · 종류.이름"], ["메모", "글자", "선택"], ["만든 시각", "시각", "안 적으면 지금"],
  ], half, { rowPad: 10 });
  const right = TBLPIC("종류 표 — 내가 채운다 (3~6줄)", ["이름 (내 업무 종류)", "색 (한글 색 이름)"], [
    ["(예) 미팅", "파랑"], ["", ""], ["", ""], ["", ""], ["", ""], ["", ""],
  ], half, { rowPad: 36, fill: "0D9488", greyRows: [0], colWidths: [2400, 2150] });
  ch.push(table([half, mid, half], [[
    cell([left], half, { borders: cellBorders("FFFFFF") }),
    cell([P([run("줄 ▶", { size: 16, bold: true, color: TEAL })], { align: AlignmentType.CENTER, before: 900, after: 0 })], mid, { borders: cellBorders("FFFFFF") }),
    cell([right], half, { borders: cellBorders("FFFFFF") }),
  ]]));
  ch.push(RL([{ t: "줄 1: ", b: true, c: TEAL, size: 16 }, { t: "일정.종류 → 종류.이름 — ", size: 16 }, { t: "목록에 없는 종류는 저장 거부", b: true, size: 16 }, { t: " (허용목록)", size: 16 }], { before: 60, after: 10 }));
  ch.push(RL([{ t: "왜 갈랐나: ", b: true, c: TEAL, size: 16 }, { t: "\"미팅=파랑\"을 일정마다 적으면 색을 바꿀 때 일정 수만큼 고쳐야 한다 → 종류는 종류 표에 한 번만, 일정은 이름으로 가리킨다.", size: 16 }], { before: 10, after: 40 }));
  ch.push(RL([{ t: "⑤ 문지기 표", b: true, size: 18 }], { before: 60, after: 20 }));
  ch.push(table([2100, 7992], [
    [cell("표", 2100, { fill: "E6F7F5", bold: true, color: TEAL, size: 17 }), cell("읽기 · 쓰기 · 고치기 · 지우기 — 누가?", 7992, { fill: "E6F7F5", bold: true, color: TEAL, size: 17 })],
    [cell("일정 표 · 종류 표", 2100), cell([P([run("오늘은 주머니(브라우저 저장)라 문지기 없음", { size: 17, bold: true, color: "0F4A44" }), run(" — 내 브라우저에만 남고, 남의 폰에서 열면 비어 있다. 창고(DB)는 다음 강의.", { size: 16 })], { before: 20, after: 20, line: 260 })], 7992, { fill: "F0FDFA" })],
  ]));
  ch.push(RL([{ t: "비밀 열쇠: ", b: true, c: TEAL, size: 16 }, { t: "없음 (외부 AI·결제 안 씀 · 서버 없음)　　", size: 16 }, { t: "★ 흐르는 것 1개: ", b: true, size: 16 }, { t: "\"저장됨\" 1초 띠 — 창고에 안 남긴다 (그래서 상태 규칙은 CLAUDE.md 「규칙」에 쓴다)", size: 16 }], { before: 60, after: 40 }));
  ch.push(P([run("✅ 합격 기준과 대조: 표 2개 + 열 3개 이상? ✓ (일정 6열 · 종류 2열) / 줄 1개 + 왜 갈랐나? ✓ / 문지기? 오늘은 \"없음\"이 답 ✓", { size: 16, color: "0F4A44" })], { shade: "F0FDFA", before: 40, after: 40 }));
  ch.push(RL([{ t: "→ CLAUDE.md `## 데이터 (데이터도)` 절 ", b: true, c: "0F4A44", size: 18 }, { t: "— 표 2 · 줄 1 · 허용목록이 그 네 줄. 종류 표를 [종류 목록] 칸에 \"미팅=파랑 · 마감=빨강 …\" 꼴로 옮겨 적으세요.", size: 16, c: "0F4A44" }], { shade: "F0FDFA", before: 60, after: 40 }));
  ch.push(PIN("구조도 → `## 구조` · 화면도 → `## 화면` · 데이터도 → `## 데이터`. 설계도 세 장이 지침 한 장의 세 절로 접힙니다."));
  return ch;
}

// ───────────────────────── 08 세팅 가이드 (A4 2쪽) ─────────────────────────
function makeSetup() {
  const ch = [];
  ch.push(new Paragraph({ children: [run("세팅 가이드 — 확인 3개, 막히면 묻는다", { size: 30, bold: true, color: INK })], spacing: { before: 0, after: 40 } }));
  ch.push(P([run("17차 「작업실을 연다」 · 수업 전 집에서 · A4 2쪽. ", { size: 17, color: MUTED }), run("수업에서는 Claude Code가 여러분 폴더를 GitHub에 올리고 주소(github.io)를 만듭니다. 그러려면 세 가지가 미리 OK여야 합니다. ", { size: 17 }), run("이 가이드는 \"정답 절차\"가 아닙니다 — 확인 명령 3개 + 막혔을 때 묻는 틀 + 사람이 직접 해야 하는 2가지. 막힘을 스스로 푸는 것이 앞으로 작업실을 운영하는 능력입니다.", { size: 17, bold: true, color: "0F4A44" })], { before: 0, after: 80 }));

  ch.push(H2("§1 확인 3개", "터미널(Windows: PowerShell / Mac: 터미널)에서 한 줄씩"));
  ch.push(T([600, 2300, 3700, 3492], ["#", "명령", "이렇게 나오면 OK", "Windows / Mac 비고"], [
    ["1", "claude", "Claude Code 프롬프트(입력창)가 뜬다 → /exit 또는 Ctrl+C 로 나오기", "둘 다 같음. 계정(API 또는 구독)은 전원 준비돼 있음 — 뜨지 않으면 설치·로그인 문제"],
    ["2", "gh auth status", "Logged in to github.com as 아이디  가 보인다", "둘 다 같음. 안 보이면 §2 (a)"],
    ["3", "git config user.name", "내 이름(값)이 한 줄 출력된다", "빈 줄이면 Claude Code에게 \"git 이름·이메일 설정해 줘\" — 한 단계만"],
  ].map((r) => r.map((x, i) => i === 1 ? cell([new Paragraph({ children: [new TextRun({ text: x, font: "Consolas", size: 18, bold: true, color: INK })], spacing: { before: 20, after: 20 } })], 2300) : x)), { rowHeight: 560 }));
  ch.push(PIN("✅ 셋 다 OK면 2쪽은 안 봐도 됩니다. 하나라도 안 되면 → 2쪽 §3(막힘 해결 3단계)로."));

  ch.push(H2("§2 사람이 직접 해야 하는 2가지", "LLM이 대신 못 하는 것 — 미리 알아 두기"));
  ch.push(T([2000, 3600, 4492], ["", "어디서", "두 줄"], [
    ["(a) GitHub 로그인", "터미널 gh auth login → GitHub.com → HTTPS → \"Login with a web browser\"", "브라우저가 열리면 GitHub에 로그인하고, 터미널에 뜬 코드를 입력. 끝나면 터미널로 돌아와 §1-2 다시 확인"],
    ["(b) Pages 켜기", "GitHub 저장소 페이지 → Settings → Pages", "Branch를 main / (root) 로 고르고 Save. 수업 중 Claude Code가 못 켜면 이 두 번 클릭 — 1~3분 뒤 주소가 열림"],
  ], { rowHeight: 700 }));
  ch.push(NOTE("(a)는 수업 전에 해 두세요. (b)는 수업 중 저장소가 생긴 뒤에 — 지금은 \"그런 게 있다\"만."));

  // ── 2쪽
  ch.push(PB());
  ch.push(H2("§3 막힘 해결 3단계", "안 될 때 하는 순서 — 2쪽"));
  ch.push(T([1700, 4700, 3692], ["단계", "하는 것", "하지 않는 것"], [
    ["① 복사", "터미널의 빨간 줄(에러)을 그대로 복사 — 줄이면 안 됨", "\"안 돼요\"라고만 쓰기 · 에러를 요약하기"],
    ["② 세 줄로 묻기", "아래 틀대로 OS · 하려던 것 · 에러 세 줄 + 마지막 한 줄", "처음부터 다 설명하기 · 여러 질문 한 번에"],
    ["③ 한 단계만", "시키는 첫 단계만 하고 → §1 확인 명령 다시 → 안 되면 ①로", "시키는 걸 다 한 번에 하기 · 안 됐는데 다음 단계"],
  ]));
  ch.push(P([run("묻는 문장 틀 — 복사해서 빈칸만 채우기", { size: 18, bold: true, color: TEAL })], { before: 120, after: 30 }));
  ch.push(CODE(["내 OS: ___", "하려던 것: ___", "에러: ___", "내가 직접 해야 하는 게 있으면 그것부터, 한 번에 한 단계만."], { font: FONT, size: 19, line: 300, bold: true }));
  ch.push(RL([{ t: "어디에 묻나: ", b: true, size: 17 }, { t: "Claude Code 프롬프트 안에서 바로(가장 좋음). Claude Code가 안 뜨면 claude.ai 새 대화에.", size: 17 }], { before: 80, after: 40 }));

  ch.push(H2("§4 자주 막히는 곳 3", "답이 아니라 \"뭘 물어야 하나\""));
  ch.push(T([5200, 4892], ["증상", "묻는 키워드 (하려던 것 칸에)"], [
    ["claude 를 쳤는데 \"명령을 찾을 수 없음\"", "\"Claude Code 설치\" (내 OS)"],
    ["gh 를 쳤는데 \"명령을 찾을 수 없음\"", "\"GitHub CLI 설치 (내 OS)\""],
    ["push가 거절됨 (permission / 403)", "\"gh 권한(scope)에 repo가 있나\""],
  ].map((r) => [r[0], cell([P([run(r[1], { size: 18, bold: true })], { before: 20, after: 20 })], 4892)])));
  ch.push(NOTE("해법은 일부러 적지 않았습니다 — OS·버전마다 다르고, 적어 두면 틀립니다. 키워드와 에러를 들고 3단계로."));

  ch.push(H2("§5 리허설", "권장 — 그게 수업 전 예습"));
  ch.push(RL(["1.  빈 폴더 ", { t: "test/", b: true }, " 를 만들고 그 안에 ", { t: "index.html", b: true }, " 한 줄(아무 글자나) 저장"], { before: 20, after: 20, size: 17 }));
  ch.push(RL(["2.  그 폴더에서 ", { t: "claude", b: true }, " → 과업 2 문장 붙여넣기: ", { t: "\"이 폴더를 GitHub 공개 저장소 test로 올리고, Pages를 켜서 주소를 알려줘. 내가 직접 해야 하는 게 있으면 그것부터 한 단계씩 알려줘. 끝나면 저장소 이름과 주소만 출력해.\"", i: true, c: "0F4A44" }], { before: 20, after: 20, size: 17 }));
  ch.push(RL(["3.  1~3분 뒤 주소가 브라우저에서 열리면 ", { t: "준비 완료", b: true }, ". 막히면 §3으로 풀어 보기. test 저장소는 지워도 됩니다."], { before: 20, after: 20, size: 17 }));

  ch.push(H2("§6 수업 당일 체크 3"));
  ch.push(CHK("§1 확인 3개가 OK (claude 뜸 · gh auth status OK · git config user.name 값)"));
  ch.push(CHK("폰에서 github.io 주소(리허설 주소 또는 아무 github.io)가 열린다 (와이파이)"));
  ch.push(CHK("안 된 것이 있으면 시작 전 10분 세팅 창구 — 단, 창구에서도 3단계 먼저, 에러는 복사해 오기"));
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
  await build(makeChecklist(), path.join(OUT, "02_UX점검표.docx"));
  await build(makeBlueprints(), path.join(OUT, "03_캘린더_설계도3장.docx"));
  await build(makeSetup(), path.join(OUT, "08_세팅가이드.docx"));
})();
