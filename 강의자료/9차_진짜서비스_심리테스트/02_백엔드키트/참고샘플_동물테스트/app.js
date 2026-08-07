// ============================================================
// 참고샘플 — 백엔드 키트 계약(db.js)을 지킨 완성 예시
// 구조: TEST(콘텐츠) → 진행 로직 → 결과/공유/통계
// ============================================================

// ---------- 콘텐츠 (기획안에 해당하는 부분) ----------
const TEST = {
  title: "나는 무슨 동물일까?",
  types: {
    dog: {
      name: "충직한 강아지",
      emoji: "🐶",
      desc: "사람들과 함께일 때 에너지가 차오르는 당신. 관계에 진심이고, 곁에 있는 사람을 끝까지 챙기는 의리파예요.",
      match: "cat",
    },
    cat: {
      name: "도도한 고양이",
      emoji: "🐱",
      desc: "혼자만의 시간이 꼭 필요한 당신. 무심해 보여도 마음을 연 상대에겐 누구보다 다정한 반전 매력의 소유자예요.",
      match: "dog",
    },
    owl: {
      name: "지혜로운 올빼미",
      emoji: "🦉",
      desc: "결정 전에 충분히 관찰하고 생각하는 당신. 밤이 깊을수록 집중력이 살아나는 전략가 타입이에요.",
      match: "dolphin",
    },
    dolphin: {
      name: "자유로운 돌고래",
      emoji: "🐬",
      desc: "호기심과 즉흥이 삶의 원동력인 당신. 새로운 것 앞에서 눈이 반짝이고, 주변까지 신나게 만드는 분위기 메이커예요.",
      match: "owl",
    },
  },
  questions: [
    {
      q: "처음 가본 모임, 나는?",
      choices: [
        { text: "먼저 말 걸며 금방 친해진다", type: "dog" },
        { text: "구석에서 분위기를 관찰한다", type: "owl" },
        { text: "재밌어 보이는 곳으로 직진!", type: "dolphin" },
        { text: "친해질 사람만 조용히 고른다", type: "cat" },
      ],
    },
    {
      q: "완전히 자유로운 주말 하루가 생겼다!",
      choices: [
        { text: "친구들 불러서 다 같이 논다", type: "dog" },
        { text: "집에서 나만의 시간을 만끽", type: "cat" },
        { text: "즉흥 당일치기 여행 출발", type: "dolphin" },
        { text: "미뤄둔 책·다큐를 정주행", type: "owl" },
      ],
    },
    {
      q: "방에 들어갔더니 탁자 위에 물건이 네 개. 하나만 고른다면?",
      choices: [
        { text: "다 같이 찍은 폴라로이드 사진", type: "dog" },
        { text: "푹신한 담요와 쿠션", type: "cat" },
        { text: "행선지 없는 비행기 티켓", type: "dolphin" },
        { text: "잠금장치 달린 낡은 일기장", type: "owl" },
      ],
    },
    {
      q: "고민이 생겼을 때 나는?",
      choices: [
        { text: "일단 가까운 사람에게 털어놓는다", type: "dog" },
        { text: "혼자 정리될 때까지 삭힌다", type: "cat" },
        { text: "몸을 움직이며 잊어버린다", type: "dolphin" },
        { text: "원인을 끝까지 분석한다", type: "owl" },
      ],
    },
    {
      q: "단톡방에서 나의 포지션은?",
      choices: [
        { text: "답장 제일 빠른 리액션 부자", type: "dog" },
        { text: "눈팅하다 필요할 때만 등판", type: "cat" },
        { text: "갑자기 약속을 만드는 주동자", type: "dolphin" },
        { text: "정보·링크를 물어오는 정리요정", type: "owl" },
      ],
    },
  ],
};

// ---------- 화면 요소 ----------
const $ = (sel) => document.querySelector(sel);
const screens = {
  start: $("#screen-start"),
  quiz: $("#screen-quiz"),
  result: $("#screen-result"),
};

function show(name) {
  Object.values(screens).forEach((s) => s.classList.add("hidden"));
  screens[name].classList.remove("hidden");
}

// ---------- 진행 상태 ----------
let current = 0;
const picks = [];

function startQuiz() {
  current = 0;
  picks.length = 0;
  renderQuestion();
  show("quiz");
}

function renderQuestion() {
  const total = TEST.questions.length;
  const item = TEST.questions[current];
  $("#progress-bar").style.width = `${(current / total) * 100}%`;
  $("#q-count").textContent = `Q${current + 1} / ${total}`;
  $("#q-text").textContent = item.q;
  const box = $("#choices");
  box.innerHTML = "";
  item.choices.forEach((c) => {
    const btn = document.createElement("button");
    btn.textContent = c.text;
    btn.addEventListener("click", () => pick(c.type));
    box.appendChild(btn);
  });
}

function pick(type) {
  picks.push(type);
  current += 1;
  if (current < TEST.questions.length) {
    renderQuestion();
  } else {
    finishQuiz();
  }
}

// 채점: 유형 투표 — 최다 득표 유형이 결과 (동률이면 먼저 나온 유형)
function topType() {
  const votes = {};
  picks.forEach((t) => (votes[t] = (votes[t] || 0) + 1));
  return Object.keys(votes).reduce((a, b) => (votes[b] > votes[a] ? b : a));
}

// ---------- 결과 ----------
let savedId = null; // 저장된 결과의 공유용 id

async function finishQuiz() {
  const typeKey = topType();
  renderResult(typeKey, { mine: true });

  // 창고가 연결돼 있으면: 자동 저장 → 공유 준비 + 통계
  if (DB.isConnected()) {
    try {
      savedId = await DB.saveResult({
        result: TEST.types[typeKey].name,
        typeKey,
        answers: picks,
        testTitle: TEST.title,
      });
      enableShare();
      showStats(TEST.types[typeKey].name);
    } catch (e) {
      console.error(e);
      $("#share-note").textContent = "⚠️ 저장 실패 — 콘솔 에러를 확인하세요";
      $("#share-note").classList.remove("hidden");
    }
  } else {
    // 창고 없음: 테스트는 정상 작동, 공유만 대기 (CLAUDE.md 규칙 6)
    $("#btn-share").disabled = true;
    $("#share-note").classList.remove("hidden");
  }
}

function renderResult(typeKey, { mine }) {
  const t = TEST.types[typeKey];
  const match = TEST.types[t.match];
  $("#r-label").textContent = mine ? "당신의 동물 유형은" : "친구의 동물 유형은";
  $("#r-emoji").textContent = t.emoji;
  $("#r-name").textContent = t.name;
  $("#r-desc").textContent = t.desc;
  $("#r-match").innerHTML = `환상의 짝꿍은 <b>${match.emoji} ${match.name}</b>`;
  show("result");
}

function enableShare() {
  const btn = $("#btn-share");
  btn.disabled = false;
  $("#share-note").classList.add("hidden");
  btn.addEventListener("click", async () => {
    const url = `${location.origin}${location.pathname}?id=${savedId}`;
    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "✅ 복사됨! 카톡에 붙여넣으세요";
    } catch {
      prompt("아래 링크를 복사하세요:", url); // 클립보드 미지원 브라우저 대비
    }
  });
}

async function showStats(resultName) {
  try {
    const { total, counts } = await DB.getStats();
    if (!total) return;
    const pct = Math.round(((counts[resultName] || 0) / total) * 100);
    $("#r-stats").textContent = `지금까지 ${total}명 참여 — 당신과 같은 유형은 ${pct}%`;
  } catch (e) {
    console.error(e);
  }
}

// ---------- 공유 모드: ?id= 로 열렸을 때 (CLAUDE.md 규칙 4) ----------
async function openSharedResult(id) {
  try {
    const data = DB.isConnected() ? await DB.loadResult(id) : null;
    if (data && data.typeKey && TEST.types[data.typeKey]) {
      renderResult(data.typeKey, { mine: false });
      showStats(data.result);
    } else {
      show("start"); // 못 찾으면 그냥 테스트 시작 화면
    }
  } catch (e) {
    console.error(e);
    show("start");
  }
  // 공유받은 사람도 직접 풀어볼 수 있게
  $("#btn-share").classList.add("hidden");
  $("#share-note").classList.add("hidden");
  const retry = $("#btn-retry");
  retry.textContent = "나도 해보기 🐾";
  retry.classList.remove("ghost");
  retry.classList.add("primary");
}

// ---------- 시작 ----------
$("#btn-start").addEventListener("click", startQuiz);
$("#btn-retry").addEventListener("click", () => {
  location.href = location.pathname; // ?id= 없는 기본 주소로
});

const sharedId = new URLSearchParams(location.search).get("id");
if (sharedId) {
  openSharedResult(sharedId);
} else {
  show("start");
  // 시작 화면에도 참여자 수 살짝 노출 (창고 연결 시)
  if (DB.isConnected()) {
    DB.getStats()
      .then(({ total }) => {
        if (total) $("#start-stats").textContent = `지금까지 ${total}명이 참여했어요`;
      })
      .catch(() => {});
  }
}
