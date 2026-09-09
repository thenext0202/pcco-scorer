const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType,
  AlignmentType, BorderStyle, ShadingType, PageBreak, HeadingLevel, VerticalAlign,
} = require("docx");

const FONT = "Malgun Gothic";
const TEAL = "0D9488"; const INK = "1A2430"; const MUTED = "6B7280"; const RED = "DC2626"; const AMBER = "B45309";
const PAGE_W = 11906, MARGIN = 1000, CONTENT_W = PAGE_W - MARGIN * 2; // 9906

const run = (t, o = {}) => new TextRun({ text: t, font: FONT, size: o.size || 20, bold: o.bold, color: o.color, italics: o.italics });
const P = (children, o = {}) => new Paragraph({
  children: Array.isArray(children) ? children : [run(children, o)],
  spacing: { before: o.before ?? 60, after: o.after ?? 60, line: o.line ?? 300 },
  alignment: o.align, border: o.border, shading: o.shading,
});
const H = (t, o = {}) => P([run(t, { size: o.size || 26, bold: true, color: o.color || TEAL })], { before: o.before ?? 220, after: o.after ?? 80 });
const Note = (t) => P([run(t, { size: 17, color: MUTED, italics: true })], { before: 20, after: 40 });
const Empty = () => P([run("")], { before: 0, after: 0, line: 200 });

// 기입줄: 밑줄 문단 (연속 동일 테두리 문단은 Word가 합치므로 사이에 빈 문단)
const Line = (o = {}) => P([run(o.label || "", { size: 18, color: MUTED })], {
  before: o.before ?? 120, after: 0, line: 240,
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: "9CA3AF", space: 1 } },
});
const Lines = (n, o = {}) => { const a = []; for (let i = 0; i < n; i++) { a.push(Line(o)); a.push(Empty()); } return a; };

const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "D1D5DB" };
const borders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
const Cell = (content, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA }, borders,
  shading: o.shade ? { type: ShadingType.CLEAR, fill: o.shade, color: "auto" } : undefined,
  verticalAlign: o.valign || VerticalAlign.CENTER,
  margins: { top: 70, bottom: 70, left: 100, right: 100 },
  children: (Array.isArray(content) ? content : [content]).map(c =>
    typeof c === "string" ? P([run(c, { size: o.size || 18, bold: o.bold, color: o.color })], { before: 20, after: 20, line: 260 }) : c),
});
const TableX = (widths, rows, o = {}) => new Table({
  width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
  columnWidths: widths,
  rows: rows.map((r, ri) => new TableRow({
    tableHeader: ri === 0 && o.header !== false,
    children: r.map((c, ci) => Cell(c, widths[ci], ri === 0 && o.header !== false
      ? { shade: "E6F7F5", bold: true, color: TEAL, size: 17 }
      : { size: o.size || 18, bold: o.boldFirst && ci === 0 })),
  })),
});
const Box = (lines, fill = "F0FDFA") => new Table({
  width: { size: CONTENT_W, type: WidthType.DXA }, columnWidths: [CONTENT_W],
  rows: [new TableRow({ children: [new TableCell({
    width: { size: CONTENT_W, type: WidthType.DXA },
    borders: { top: { style: BorderStyle.SINGLE, size: 4, color: "B9E8E2" }, bottom: { style: BorderStyle.SINGLE, size: 4, color: "B9E8E2" }, left: { style: BorderStyle.SINGLE, size: 24, color: TEAL }, right: { style: BorderStyle.SINGLE, size: 4, color: "B9E8E2" } },
    shading: { type: ShadingType.CLEAR, fill, color: "auto" },
    margins: { top: 100, bottom: 100, left: 160, right: 160 },
    children: lines.map(l => typeof l === "string" ? P([run(l, { size: 18 })], { before: 30, after: 30, line: 280 }) : l),
  })] })],
});
const Break = () => new Paragraph({ children: [new PageBreak()] });
const CB = "☐ ";

const doc = new Document({
  styles: { default: { document: { run: { font: FONT, size: 20, color: INK } } } },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: MARGIN, bottom: MARGIN, left: MARGIN, right: MARGIN } } },
    children: [
      // ───────── 1쪽
      P([run("초급반 3강 · 15차 · 지침 워크시트", { size: 16, color: TEAL, bold: true })], { before: 0, after: 0 }),
      P([run("굳힌다 — 반복을 지침으로", { size: 40, bold: true, color: INK })], { before: 60, after: 40 }),
      P([run("이름: ____________________　　날짜: ____________________", { size: 19, color: MUTED })], { before: 40, after: 120 }),
      Box([
        P([run("재료만 바뀌는 일은 지침이 된다.", { size: 30, bold: true, color: INK })], { before: 40, after: 20 }),
        P([run("지침은 세 번째 재료에서 증명된다.", { size: 22, bold: true, color: TEAL })], { before: 0, after: 40 }),
      ]),
      H("지침이 되는 일 — 판별 3조건", { before: 200 }),
      Note("셋 다 ☑이면 지침 · 하나라도 ☐면 프롬프트로 충분"),
      TableX([1400, 2900, 2900, 2706], [
        ["조건", "질문", "통과 예", "탈락 예"],
        ["주기", "주 1회 이상 다시 하나?", "주간 보고, 매주 강의 기획", "앱 만들기 (한 번)"],
        ["형식", "결과물의 틀이 매번 같은가?", "보고서 4섹션, 기획안 표 3개", "매번 다른 형식의 부탁"],
        ["재료", "바뀌는 건 재료뿐인가?", "이번 주 숫자, 이번 주 주제", "목적 자체가 매번 바뀜"],
      ], { boldFirst: true }),
      H("변환표 — 프롬프트 5요소가 지침 5칸이 됩니다"),
      TableX([2300, 2300, 5306], [
        ["프롬프트에서 (지난 시간)", "지침에서 (오늘)", "무엇이 달라지나"],
        ["역할", "I 정체성", "+ 이름 + 성격 2~3개 — 대화가 길어져도 안 흔들리게"],
        ["목적", "M 임무", "이번 한 번 → 주로 하는 일 2~3개 + 범위 밖 처리"],
        ["제약", "R 규칙 ★", "이번 조건 → 항상 지키는 방식 — 숫자 · 금지어 · 고정 포맷으로"],
        ["맥락", "K 지식", "매번 설명 → 한 번 올려두는 자료"],
        ["출력", "O 출력", "이번 형식 → 매번 나오는 기본 포맷"],
      ], { boldFirst: true }),
      H("오늘의 순서"),
      TableX([1500, 8406], [
        ["시간", "내용"],
        ["앞 77분", "데모 → 판별 3조건 → 내 반복 업무 찾기(2쪽, 5분) → I·M·R·K·O 하나씩 → 예시의 함정"],
        ["8분", "다같이 지침 쓰기 — 주간 보고 작업실 (문답식)"],
        ["12분", "초벌 지침 — 이 종이 3~4쪽에 손으로"],
        ["8분", "등록 + 첫 시험 (v1) — claude.ai에 지침 등록, 재료 3개를 하나씩"],
        ["6분", "한 번 고치기 — 세 산출물을 지침과 비교 → 한 줄 고쳐 다시 (v2)"],
        ["6분", "쇼케이스 · 엔딩"],
      ], { boldFirst: true }),
      Note("가져올 것이 없습니다 — 소재는 2쪽에서 고르고, 재료 3개는 머릿속에서 꺼냅니다. 초벌은 손으로, 타이핑은 등록할 때만."),
      Break(),

      // ───────── 2쪽
      P([run("2쪽 · 5분", { size: 16, color: TEAL, bold: true })], { before: 0, after: 0 }),
      P([run("내 반복 업무 찾기", { size: 32, bold: true })], { before: 40, after: 60 }),
      H("① 매주 다시 만드는 것 하나", { size: 23 }),
      Line({ label: "내가 매주 다시 만드는 것:" }), Empty(),
      P([run(CB + "주 1회 이상 다시 한다　　" + CB + "결과물의 틀이 매번 같다　　" + CB + "바뀌는 건 재료뿐이다", { size: 19 })], { before: 80, after: 20 }),
      Note("셋 다 체크되면 오늘 소재입니다. 안 떠오르면 손을 드세요 — 소재 리스트를 드립니다."),
      H("② 매번 다시 말하던 것 — 체크만 하세요", { size: 23 }),
      Note("견본은 강사의 「강의 기획안」. 베끼는 게 아니라 형식을 빌리는 것 — 내 것 칸에 한 단어씩만."),
      TableX([500, 1900, 3600, 3906], [
        ["", "매번 다시 말하던 것", "견본 (강의 기획안)", "내 것"],
        [CB, "말투", "존댓말 · 표로 말한다", ""],
        [CB, "길이", "120분 기준 · 표 3개", ""],
        [CB, "형식", "개요표 → 타임라인 → 리스크표 순서", ""],
        [CB, "금지", "\"~할 수 있다\" 같은 추상 표현 금지", ""],
        [CB, "받는 사람", "비개발자 수강생", ""],
        [CB, "매번 설명하던 배경", "초급반 = 격주 120분, claude.ai 무료", ""],
        [CB, "", "", ""],
        [CB, "", "", ""],
      ]),
      Note("체크된 줄이 그대로 R 규칙과 K 지식의 초벌입니다. 새로 지어낼 필요가 없습니다."),
      H("③ 재료 3개 — 한 줄씩 (이따 시험에 넣을 것)", { size: 23 }),
      TableX([1300, 5600, 3006], [
        ["", "재료 (한 줄)", "예 (강의 기획)"],
        ["재료 1", "", "\"다음 주 초급반: 지침\""],
        ["재료 2", "", "\"중급반: 데이터 구조\""],
        ["재료 3", "", "\"특강: AI로 영상 만들기\""],
      ], { boldFirst: true }),
      Note("재료는 정말 한 줄이면 됩니다 — 나머지를 지침이 대신 말해주는지가 오늘의 시험입니다."),
      Break(),

      // ───────── 3쪽
      P([run("3쪽 · 12분 · 손으로", { size: 16, color: TEAL, bold: true })], { before: 0, after: 0 }),
      P([run("5칸 초벌", { size: 32, bold: true })], { before: 40, after: 20 }),
      Note("칸당 1~3줄이면 충분합니다. 다듬지 말고 적으세요 — 다듬는 건 시험을 본 다음입니다."),
      H("I 정체성", { size: 22 }), Note("이름 + 역할(경력) + 성격 2~3개.  \"세계 최고 · 천재\"는 오히려 톤을 흔듭니다"),
      ...Lines(2),
      H("M 임무", { size: 22 }), Note("주로 하는 일 2~3개 + 그 외 요청은 어떻게 (\"한 줄로 답하고 본업으로\")"),
      ...Lines(2),
      H("R 규칙 ★", { size: 22, color: RED }), Note("2쪽 ② 체크리스트를 옮겨 적기. 형용사 대신 숫자 · 금지어 · 고정 포맷.  \"~이므로\" 이유가 붙으면 더 좋음"),
      ...Lines(3),
      H("K 지식", { size: 22 }), Note("매번 설명하던 배경 — 받는 사람 · 팀 · 형식.  ★ 비밀번호 · 개인정보 · 회사 기밀은 넣지 않기"),
      ...Lines(2),
      H("O 출력", { size: 22 }), Note("매번 나올 기본 포맷 — 순서 · 섹션 · 길이"),
      ...Lines(2),
      Break(),

      // ───────── 4쪽
      P([run("4쪽 · 조립 · 300~700자", { size: 16, color: TEAL, bold: true })], { before: 0, after: 0 },),
      P([run("「", { size: 32, bold: true }), run("______________", { size: 32, bold: true, color: TEAL }), run(" 작업실」 지침", { size: 32, bold: true })], { before: 40, after: 20 }),
      Note("헤더 5개는 이 모양 그대로 타이핑합니다 — 샵 두 개, 한 칸 띄우고 이름. AI가 칸을 구분해서 읽습니다."),
      H("## 정체성", { size: 22, color: INK }), ...Lines(2, { before: 100 }),
      H("## 임무", { size: 22, color: INK }), ...Lines(2, { before: 100 }),
      H("## 규칙", { size: 22, color: INK }), ...Lines(4, { before: 100 }),
      H("## 지식", { size: 22, color: INK }), ...Lines(3, { before: 100 }),
      H("## 출력", { size: 22, color: INK }), ...Lines(2, { before: 100 }),
      Break(),

      // ───────── 5쪽
      P([run("5쪽 · 시험", { size: 16, color: TEAL, bold: true })], { before: 0, after: 0 }),
      P([run("시험 기록 · 비교 3질문", { size: 32, bold: true })], { before: 40, after: 60 }),
      H("등록 위치 — 되는 것부터", { size: 22 }),
      P([run(CB + "① claude.ai 프로젝트 → 지침에 붙여넣기 (새 대화마다 자동으로 붙는다)", { size: 19 })], { before: 40, after: 20 }),
      P([run(CB + "② 안 되면 — 대화 맨 앞에 지침을 붙이고, 한 줄 띄우고, 재료를 쓴다 (세 대화 모두 같은 지침을 앞에)", { size: 19 })], { before: 20, after: 20 }),
      P([run(CB + "③ 그래도 안 되면 — 짝 계정에서 ①", { size: 19 })], { before: 20, after: 60 }),
      H("시험 기록 — 박고, 재료 셋 넣고, 고친다", { size: 22 }),
      TableX([800, 3106, 2000, 2000, 2000], [
        ["버전", "이번에 고친 줄 (한 줄)", "재료 1 결과", "재료 2 결과", "재료 3 결과"],
        ["v1", "(첫 등록 — 완성도 상관없이)", "", "", ""],
        ["v2", "", "", "", ""],
        ["v3", "", "", "", ""],
      ], { boldFirst: true }),
      Box([
        "고치기 규칙 ① 대화로 고치지 말고, 지침을 고쳐 새 대화에서 다시 — 대화로 고치면 다음 주에 또 말해야 합니다.",
        "고치기 규칙 ② 한 번에 한 줄만 — 뭐가 세 산출물을 바꿨는지 알 수 있게.",
      ]),
      H("비교 3질문 — 세 산출물을 지침 옆에 놓고", { size: 22 }),
      TableX([500, 4400, 5006], [
        ["", "보이는 것", "고칠 곳"],
        [CB, "재료 한 줄만 넣었는데 되묻거나 엉뚱한 걸 만든다", "지식(K)이 비었거나 임무(M)가 없다 — 매번 설명하던 것을 지식에, \"이 일만\"을 임무에"],
        [CB, "지침에 썼는데 셋이 제각각이다 (길이 · 순서 · 말투)", "규칙이 형용사다 — 숫자 · 금지어 · 고정 포맷으로"],
        [CB, "시키지 않은 걸 매번 한다 (사족 · 이모지 · 지난 것 베끼기)", "금지 규칙 한 줄, 또는 지침에 붙인 예시를 뺀다"],
      ]),
      H("숙제 (선택)", { size: 22 }),
      P([run("이 지침으로 다음 주 실제 업무를 한 번 하고, 흔들린 줄 하나를 고쳐보기.", { size: 19 })], { before: 40, after: 20 }),
      Line({ label: "무엇을 고쳤는지 한 줄:" }), Empty(),
      Note("그리고(11차) → 썼고(13차) → 굳혔습니다(15차). 앱은 프롬프트로, 매주 하는 일은 지침으로."),
    ],
  }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(process.argv[2], buf); console.log("ok", buf.length); });
