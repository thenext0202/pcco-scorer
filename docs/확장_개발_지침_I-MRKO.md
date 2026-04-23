# pcco-scorer 확장 개발 지침 · I-MRKO 지침 채점 모드 추가

> 이 문서는 Claude Code가 pcco-scorer 레포에 I-MRKO 지침 채점 기능을 추가할 때 따라야 할 구체적 작업 명세입니다.
> 루브릭 상세는 `docs/I-MRKO_채점_루브릭.md` 참조.
> 최종 수정: 2026-04-23

---

## 0. 프로젝트 컨텍스트

이 레포는 정금구 강사의 AI 강의 시리즈 부속 앱입니다:
- **1차 강의**: "AI의 프롬프트란?" → R-PCCO 프롬프트 채점 (✅ 이미 구현됨)
- **2차 강의**: "AI의 지침이란?" → **I-MRKO 지침 채점 (← 이번에 추가)**

**핵심 원칙:** 기존 R-PCCO 기능은 **그대로 유지**하면서 I-MRKO 모드를 **병렬로 추가**합니다. 기존 URL·세션·리더보드 모두 호환성을 깨지 않아야 합니다.

---

## 1. 최종 사용자 경험 (UX 목표)

### 1.1 홈 페이지 (`/`)
- 상단에 **탭 토글** 추가: `[ 프롬프트 채점 | 지침 채점 ]`
- 탭 선택에 따라 하단 "단독 채점" 영역이 전환됨
- 기존 "세션 만들기 / 세션 참가" 버튼은 그대로 유지

### 1.2 강사 세션 생성 (`/host`)
- 기존 UI에 **모드 선택 라디오 버튼** 추가:
  - ○ 프롬프트 채점 (R-PCCO) — 1차 강의용
  - ○ 지침 채점 (I-MRKO) — 2차 강의용
- 선택한 모드가 세션에 저장되어 수강생 참가 시 자동 분기

### 1.3 참가자 페이지 (`/play/[code]`)
- 세션의 모드에 따라 자동으로 적절한 채점 UI 표시
- UI는 거의 동일하나 모드 표시(제목, 채점기 타입)가 다름

### 1.4 리더보드 (`/play/[code]/board`)
- 세션의 모드에 따라 5요소 미니바 라벨이 달라짐
- R-PCCO 세션: `🎭 R / 🎯 P / 🌍 C / ⛓️ C / 📋 O`
- I-MRKO 세션: `🎭 I / 🎯 M / 📏 R / 📚 K / 📋 O`

---

## 2. 작업 Phase 개요

| Phase | 작업 | 예상 난이도 |
|---|---|---|
| 1 | DB 스키마 확장 (mode 컬럼) | 쉬움 |
| 2 | 타입 & Zod 스키마 추가 | 쉬움 |
| 3 | I-MRKO 채점 프롬프트 & API 라우트 | 중간 |
| 4 | 공통 컴포넌트 분기 | 중간 |
| 5 | 홈 페이지 탭 토글 | 중간 |
| 6 | Host / Play / Board 페이지 모드 분기 | 중간 |
| 7 | 메타데이터 & PWA 업데이트 | 쉬움 |
| 8 | 검증 & 문서 업데이트 | 쉬움 |

---

## 3. Phase 1 · DB 스키마 확장

### 3.1 목표
기존 `sessions` 테이블에 `mode` 컬럼 추가. 기존 세션은 자동으로 `'prompt'`로 취급.

### 3.2 작업
`docs/supabase_schema.sql`에 아래 ALTER 문을 **별도 섹션으로 추가** (기존 CREATE TABLE은 건드리지 말 것):

```sql
-- =========================================
-- v2 확장: I-MRKO 지침 채점 모드 추가
-- =========================================

-- sessions 테이블에 mode 컬럼 추가
ALTER TABLE sessions
  ADD COLUMN IF NOT EXISTS mode VARCHAR(20) NOT NULL DEFAULT 'prompt'
  CHECK (mode IN ('prompt', 'instruction'));

-- 기존 세션은 기본값 'prompt'로 자동 설정됨
-- 새 세션은 강사가 선택한 모드로 저장됨

-- 인덱스 추가 (모드별 필터링 성능)
CREATE INDEX IF NOT EXISTS idx_sessions_mode ON sessions(mode);

-- 코멘트
COMMENT ON COLUMN sessions.mode IS
  'prompt = R-PCCO 프롬프트 채점 (1차 강의), instruction = I-MRKO 지침 채점 (2차 강의)';
```

### 3.3 배포 순서
1. Supabase Dashboard → SQL Editor에서 위 ALTER 문 실행
2. 기존 세션이 자동으로 `mode='prompt'`가 되는지 확인
3. 그 다음에 코드 배포 (역순으로 하면 신규 세션 생성 시 오류)

### 3.4 submissions 테이블은 건드리지 않음
- `elements_json`이 JSONB라 스키마 변경 없이 I-MRKO 5요소를 저장 가능
- 단, 리더보드 조회 시 `session.mode`를 참조해 적절히 파싱

---

## 4. Phase 2 · 타입 & Zod 스키마 추가

### 4.1 `src/types/score.ts` 확장
**기존 `ScoreResult`는 건드리지 말 것**. I-MRKO용 타입을 아래에 **추가**합니다:

```typescript
// 기존 타입 (R-PCCO) - 이름 변경하여 명확히
export interface PromptScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    role: ScoreElement;
    purpose: ScoreElement;
    context: ScoreElement;
    constraints: ScoreElement;
    output: ScoreElement;
  };
  bonuses: Array<{ type: string; points: number; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}

// 하위 호환: 기존 코드가 ScoreResult를 쓰고 있으면 PromptScoreResult의 alias로
export type ScoreResult = PromptScoreResult;

// 신규: I-MRKO 지침 채점 결과
export interface InstructionScoreResult {
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  elements: {
    identity: ScoreElement;
    mission: ScoreElement;
    rules: ScoreElement;
    knowledge: ScoreElement;
    output: ScoreElement;
  };
  bonuses: Array<{ type: string; points: number; reason: string }>;
  penalties: Array<{ type: string; points: number; reason: string }>;
  strengths: string[];
  improvements: string[];
  improved_example: string;
}

// 통합 타입 (API 분기용)
export type AnyScoreResult = PromptScoreResult | InstructionScoreResult;

// 모드 구분 유틸리티
export function isInstructionScore(r: AnyScoreResult): r is InstructionScoreResult {
  return "identity" in r.elements;
}
```

### 4.2 `src/lib/scoreSchema.ts` 확장
기존 스키마 아래에 I-MRKO용 Zod 스키마를 **추가**:

```typescript
// 기존 ScoreResultSchema는 유지 (이름을 명확하게 하려면 rename 가능하지만 import 영향 많으므로 유지)

// 신규: I-MRKO 스키마
export const InstructionScoreResultSchema = z.object({
  total_score: z.number().int().min(0).max(100),
  grade: z.enum(["S", "A", "B", "C", "D", "F"]),
  elements: z.object({
    identity: ScoreElementSchema,
    mission: ScoreElementSchema,
    rules: ScoreElementSchema,
    knowledge: ScoreElementSchema,
    output: ScoreElementSchema,
  }),
  bonuses: z.array(BonusPenaltySchema),
  penalties: z.array(BonusPenaltySchema),
  strengths: z.array(z.string()),
  improvements: z.array(z.string()),
  improved_example: z.string(),
});

export type InstructionScoreResultValidated = z.infer<typeof InstructionScoreResultSchema>;
```

### 4.3 `src/types/session.ts` 확장

```typescript
export interface Session {
  id: string;
  code: string;
  title: string;
  host_name: string | null;
  mode: "prompt" | "instruction";  // ← 추가
  created_at: string;
  expires_at: string;
}

// LeaderboardEntry는 모드에 따라 elements 키가 달라지므로 제네릭/분기로:
export interface PromptLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "prompt";
  elements: {
    role: number;
    purpose: number;
    context: number;
    constraints: number;
    output: number;
  };
  created_at: string;
}

export interface InstructionLeaderboardEntry {
  rank: number;
  id: string;
  nickname: string;
  total_score: number;
  grade: "S" | "A" | "B" | "C" | "D" | "F";
  mode: "instruction";
  elements: {
    identity: number;
    mission: number;
    rules: number;
    knowledge: number;
    output: number;
  };
  created_at: string;
}

export type LeaderboardEntry = PromptLeaderboardEntry | InstructionLeaderboardEntry;
```

---

## 5. Phase 3 · I-MRKO 채점 프롬프트 & API 라우트

### 5.1 신규 파일 · `src/lib/instructionScoringPrompt.ts`

`docs/I-MRKO_채점_루브릭.md`의 §11 "LLM 시스템 프롬프트" 전체를 그대로 옮겨 담으세요. 구조는 `scoringPrompt.ts`와 동일하게:

```typescript
/**
 * Claude Sonnet 4.6 I-MRKO 지침 채점용 시스템 프롬프트
 * docs/I-MRKO_채점_루브릭.md 기반
 */
export const INSTRUCTION_SCORING_SYSTEM_PROMPT = `당신은 I-MRKO 지침 채점 전문가입니다. ...
(루브릭 §11 내용 전체)
`;
```

⚠️ 중요: **루브릭 문서(§11)의 시스템 프롬프트를 그대로 복사**. 임의로 요약하거나 수정하지 말 것. Few-shot 예시(§12)도 최소 1개는 프롬프트 말미에 포함.

### 5.2 신규 API 라우트 · `src/app/api/score/instruction/route.ts`

기존 `src/app/api/score/route.ts`를 **복사해서 만들고** 아래 차이점만 반영:

```typescript
import { InstructionScoreResultSchema } from "@/lib/scoreSchema";
import { INSTRUCTION_SCORING_SYSTEM_PROMPT } from "@/lib/instructionScoringPrompt";
import type { InstructionScoreResult } from "@/types/score";

// ...

const MIN_PROMPT_LENGTH = 100;   // 지침은 더 길어야 함 (기존 30)
const MAX_PROMPT_LENGTH = 5000;  // 지침은 30~100줄 (기존 1000)

// callClaudeAPI 함수에서:
// - system: INSTRUCTION_SCORING_SYSTEM_PROMPT 사용
// - InstructionScoreResultSchema로 검증
// - 반환 타입 InstructionScoreResult
```

에러 메시지도 "지침" 용어로 변경:
- "프롬프트가 너무 짧습니다" → "지침이 너무 짧습니다. 최소 100자 이상 입력해주세요."
- "채점 결과 파싱에 실패했습니다" → 동일 유지

### 5.3 기존 API는 건드리지 말 것
`src/app/api/score/route.ts`는 R-PCCO 전용으로 그대로 유지. 경로 분리만 하면 깔끔히 공존.

---

## 6. Phase 4 · 공통 컴포넌트 분기

### 6.1 신규 · `src/components/InstructionScorer.tsx`

`PromptScorer.tsx`를 복사해 만들되 아래만 변경:

```typescript
const STORAGE_KEY = "i-mrko-instruction-draft";  // R-PCCO와 별도 저장
const MAX_LENGTH = 5000;
const MIN_LENGTH = 100;

// fetch URL:
const response = await fetch("/api/score/instruction", { ... });

// placeholder:
placeholder="여기에 AI 지침을 입력하세요. 예: 너는 '정비서'라는 10년차 임원 비서다. 성격은 간결·선제안·숫자 우선..."

// 하단 라벨:
"매 요청 전 프롬프트가 아니라, 한 번 세팅하고 오래 쓸 '지침'을 입력하세요."
```

결과 표시는 신규 컴포넌트 `InstructionScoreResult` 사용.

### 6.2 신규 · `src/components/InstructionScoreResult.tsx`

`ScoreResult.tsx`를 복사해 만들되 `ELEMENT_INFO`만 교체:

```typescript
const ELEMENT_INFO = {
  identity:  { icon: "🎭", name: "정체성 (Identity)" },
  mission:   { icon: "🎯", name: "임무 (Mission)" },
  rules:     { icon: "📏", name: "규칙 (Rules)" },
  knowledge: { icon: "📚", name: "지식 (Knowledge)" },
  output:    { icon: "📋", name: "출력 (Output)" },
} as const;
```

나머지(등급 색상, 프로그레스 바, 감점/보너스/강점/개선점/개선예시 섹션)는 **완전히 동일하게** 유지. `result.elements`의 키만 달라지므로 `Object.keys(ELEMENT_INFO)` 루프가 자동으로 분기됨.

### 6.3 기존 컴포넌트는 건드리지 말 것
`PromptScorer.tsx`, `ScoreResult.tsx`는 R-PCCO 전용으로 그대로. 나중에 공통 로직이 많아지면 리팩토링 가능하지만 지금은 **복제해서 분리**하는 게 위험 최소.

---

## 7. Phase 5 · 홈 페이지 탭 토글 (`src/app/page.tsx`)

### 7.1 구조 변경

```tsx
"use client";
import { useState } from "react";
import PromptScorer from "@/components/PromptScorer";
import InstructionScorer from "@/components/InstructionScorer";

type Mode = "prompt" | "instruction";

export default function Home() {
  const [mode, setMode] = useState<Mode>("prompt");
  // ... 기존 sessionCode, showJoinModal 등 유지

  return (
    <main>
      {/* 헤더 */}
      <h1>AI 채점기</h1>
      <p>프롬프트와 지침을 AI로 채점받기</p>

      {/* 세션 CTA 영역 — 기존 그대로 */}

      {/* 단독 채점 모드 - 탭 추가 */}
      <div className="border-t pt-8">
        <h2>단독 채점 모드</h2>

        {/* 탭 토글 */}
        <div className="flex gap-2 mb-6 p-1 bg-slate-100 rounded-lg w-fit mx-auto">
          <button
            onClick={() => setMode("prompt")}
            className={`px-6 py-2 rounded-md transition-all ${
              mode === "prompt" ? "bg-white shadow text-blue-600 font-semibold" : "text-slate-600"
            }`}
          >
            🎯 프롬프트 채점 (R-PCCO)
          </button>
          <button
            onClick={() => setMode("instruction")}
            className={`px-6 py-2 rounded-md transition-all ${
              mode === "instruction" ? "bg-white shadow text-blue-600 font-semibold" : "text-slate-600"
            }`}
          >
            📘 지침 채점 (I-MRKO)
          </button>
        </div>

        {/* 모드별 채점기 */}
        {mode === "prompt" ? (
          <PromptScorer enableAutoSave={false} />
        ) : (
          <InstructionScorer enableAutoSave={false} />
        )}
      </div>

      {/* 푸터 - 모드별 설명 */}
      <footer>
        {mode === "prompt"
          ? "R-PCCO: Role · Purpose · Context · Constraints · Output"
          : "I-MRKO: Identity · Mission · Rules · Knowledge · Output"}
      </footer>
    </main>
  );
}
```

### 7.2 세션 참가 모달은 그대로
`/play/[code]` 페이지가 세션의 mode에 따라 자동 분기하므로, 참가 모달은 모드 선택이 필요 없습니다.

---

## 8. Phase 6 · Host / Play / Board 페이지 모드 분기

### 8.1 `src/app/host/page.tsx` — 모드 라디오 버튼 추가

기존 입력 폼에 아래 추가:

```tsx
const [mode, setMode] = useState<"prompt" | "instruction">("prompt");

// JSX에 추가:
<div className="space-y-2">
  <label className="text-sm font-medium text-slate-700">
    채점 모드 <span className="text-rose-500">*</span>
  </label>
  <div className="grid grid-cols-2 gap-2">
    <button
      type="button"
      onClick={() => setMode("prompt")}
      className={`p-4 border-2 rounded-lg text-left transition-all ${
        mode === "prompt" ? "border-blue-500 bg-blue-50" : "border-slate-200"
      }`}
    >
      <div className="font-semibold">🎯 프롬프트 채점</div>
      <div className="text-xs text-slate-500 mt-1">1차 강의 · R-PCCO 5요소</div>
    </button>
    <button
      type="button"
      onClick={() => setMode("instruction")}
      className={`p-4 border-2 rounded-lg text-left transition-all ${
        mode === "instruction" ? "border-blue-500 bg-blue-50" : "border-slate-200"
      }`}
    >
      <div className="font-semibold">📘 지침 채점</div>
      <div className="text-xs text-slate-500 mt-1">2차 강의 · I-MRKO 5요소</div>
    </button>
  </div>
</div>
```

### 8.2 `src/lib/sessionApi.ts` — createSession 확장

```typescript
export async function createSession(
  title: string,
  hostName?: string,
  mode: "prompt" | "instruction" = "prompt"  // ← 추가, 기본값 prompt (하위 호환)
): Promise<{ session: Session; code: string }> {
  // ...
  const { data, error } = await supabase
    .from("sessions")
    .insert({
      code,
      title,
      host_name: hostName || null,
      mode,  // ← 추가
    })
    .select()
    .single();
  // ...
}
```

`submitScore`도 mode 분기 추가:

```typescript
export async function submitScore(
  sessionId: string,
  nickname: string,
  promptOrInstruction: string,
  result: PromptScoreResult | InstructionScoreResult
): Promise<Submission> {
  const isInstruction = "identity" in result.elements;

  const elements_json = isInstruction
    ? {
        identity:  { score: result.elements.identity.score },
        mission:   { score: result.elements.mission.score },
        rules:     { score: result.elements.rules.score },
        knowledge: { score: result.elements.knowledge.score },
        output:    { score: result.elements.output.score },
      }
    : {
        role:        { score: result.elements.role.score },
        purpose:     { score: result.elements.purpose.score },
        context:     { score: result.elements.context.score },
        constraints: { score: result.elements.constraints.score },
        output:      { score: result.elements.output.score },
      };

  // 나머지 동일
}
```

`getLeaderboard`는 세션 mode를 함께 반환하도록:

```typescript
export async function getLeaderboard(
  sessionId: string,
  mode: "prompt" | "instruction",  // ← 추가
  limit: number = 10
): Promise<LeaderboardEntry[]> {
  const { data, error } = await supabase
    .from("submissions")
    .select("*")
    .eq("session_id", sessionId)
    .order("total_score", { ascending: false })
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error) throw new Error(`...`);

  return data.map((sub, index) => {
    if (mode === "instruction") {
      return {
        rank: index + 1,
        id: sub.id,
        nickname: sub.nickname,
        total_score: sub.total_score,
        grade: sub.grade,
        mode: "instruction" as const,
        elements: {
          identity:  sub.elements_json.identity?.score  ?? 0,
          mission:   sub.elements_json.mission?.score   ?? 0,
          rules:     sub.elements_json.rules?.score     ?? 0,
          knowledge: sub.elements_json.knowledge?.score ?? 0,
          output:    sub.elements_json.output?.score    ?? 0,
        },
        created_at: sub.created_at,
      };
    } else {
      return {
        rank: index + 1,
        // ... R-PCCO 매핑 (기존과 동일)
        mode: "prompt" as const,
      };
    }
  });
}
```

### 8.3 `src/app/play/[code]/page.tsx` — 자동 분기

```tsx
// session 객체에 mode가 포함되므로:
<main>
  {session.mode === "instruction" ? (
    <InstructionScorer
      onSubmit={handleScoreComplete}
      submitButtonText="채점하기"
      enableAutoSave={false}
    />
  ) : (
    <PromptScorer
      onSubmit={handleScoreComplete}
      submitButtonText="채점하기"
      enableAutoSave={false}
    />
  )}
  {/* 나머지 동일 */}
</main>
```

세션 헤더에 모드 표시도 추가:
```tsx
<div className="flex items-center justify-center gap-2">
  <Badge variant="outline">
    {session.mode === "instruction" ? "📘 지침 채점" : "🎯 프롬프트 채점"}
  </Badge>
  <span>코드: {code}</span>
</div>
```

### 8.4 `src/app/play/[code]/board/page.tsx` — 리더보드 분기

핵심은 5요소 미니바의 라벨·키 분기:

```tsx
const ELEMENT_LABELS_PROMPT = [
  { key: "role",        label: "R", icon: "🎭" },
  { key: "purpose",     label: "P", icon: "🎯" },
  { key: "context",     label: "C", icon: "🌍" },
  { key: "constraints", label: "C", icon: "⛓️" },
  { key: "output",      label: "O", icon: "📋" },
] as const;

const ELEMENT_LABELS_INSTRUCTION = [
  { key: "identity",  label: "I", icon: "🎭" },
  { key: "mission",   label: "M", icon: "🎯" },
  { key: "rules",     label: "R", icon: "📏" },
  { key: "knowledge", label: "K", icon: "📚" },
  { key: "output",    label: "O", icon: "📋" },
] as const;

const labels = session.mode === "instruction"
  ? ELEMENT_LABELS_INSTRUCTION
  : ELEMENT_LABELS_PROMPT;

// entry.elements[l.key]로 값 접근 (TypeScript 타입 가드 필요)
```

헤더에도 모드 뱃지 추가. 푸터 텍스트도 모드별로.

getLeaderboard 호출 시:
```tsx
const data = await getLeaderboard(session.id, session.mode, 10);
```

Realtime 구독은 그대로 (submissions 테이블은 구조 동일).

---

## 9. Phase 7 · 메타데이터 & PWA 업데이트

### 9.1 `src/app/layout.tsx`
```typescript
export const metadata: Metadata = {
  title: "AI 채점기 - R-PCCO & I-MRKO",
  description: "프롬프트(R-PCCO)와 지침(I-MRKO)을 AI로 채점받기. 정금구 강사의 AI 강의 부속 실습 앱.",
  // ...
};
```

### 9.2 `public/manifest.json`
```json
{
  "name": "AI 채점기 - R-PCCO & I-MRKO",
  "short_name": "AI 채점기",
  "description": "AI 프롬프트와 지침을 5요소로 채점받기",
  ...
}
```

### 9.3 `README.md` 업데이트
프로젝트 설명에 "1차 강의 + 2차 강의 실습 통합 앱" 명시. 사용 시나리오 섹션에 I-MRKO 모드 추가.

---

## 10. Phase 8 · 검증 체크리스트

### 10.1 하위 호환성 (가장 중요)
- [ ] 기존 R-PCCO 세션 코드로 `/play/[code]` 접속 시 정상 작동
- [ ] 기존 R-PCCO 리더보드 화면이 깨지지 않음
- [ ] 기존 API 엔드포인트 `/api/score`가 이전과 동일하게 작동
- [ ] 데이터베이스 기존 세션 row의 mode가 'prompt'로 채워짐

### 10.2 신규 I-MRKO 기능
- [ ] 홈에서 탭 전환 시 채점기가 올바르게 교체됨
- [ ] `/host`에서 지침 모드 선택하고 세션 생성 → 코드 발급
- [ ] 해당 코드로 참가하면 지침 채점 UI 표시됨
- [ ] 지침 100자 이하/5000자 초과 시 올바른 에러
- [ ] 슬라이드 8의 "친절한 비서야" 지침 → F등급 / 15점 근처
- [ ] 예시 3개 이상 포함 지침 → 패널티 `example_trap -5` 적용됨
- [ ] 리더보드에서 I-MRKO 5요소 미니바가 올바른 아이콘·라벨 표시
- [ ] Realtime 업데이트 작동 (새 지침 제출 시 리더보드 자동 갱신)

### 10.3 에지 케이스
- [ ] 한 세션에서 두 모드 섞이지 않음 (지침 세션에 R-PCCO 결과 제출 불가)
- [ ] PWA 홈 화면 아이콘 클릭 → 정상 진입
- [ ] 오프라인 → `offline.html` 표시
- [ ] 동일 IP에서 분당 10회 넘는 채점 요청 → 429 응답

### 10.4 비용 체크
- [ ] I-MRKO 모드는 프롬프트(입력 3000토큰 + 출력 1000토큰) 기준 요청당 약 $0.02
- [ ] 예상 최대 사용량(30명 × 5회) = ~$3
- [ ] Rate limit이 비용 폭주를 막는지 확인

---

## 11. 구현 시 반드시 지킬 것

### 11.1 건드리지 말 것 (Hands-off)
- `src/components/PromptScorer.tsx`
- `src/components/ScoreResult.tsx`
- `src/lib/scoringPrompt.ts`
- `src/app/api/score/route.ts` (파일 자체는 유지, 내용 변경 금지)
- 기존 `ScoreResult` 타입 (rename 대신 alias 유지)
- 기존 Zod `ScoreResultSchema`

**이유:** 기존 R-PCCO 기능이 1차 강의에 이미 사용 중이며, 변경 시 회귀 위험이 큼. 신규 파일 추가로 해결.

### 11.2 커밋 규칙
기존 Conventional Commits 유지. 권장 순서:
1. `feat: add mode column to sessions table`
2. `feat: add instruction score types and schema`
3. `feat: add I-MRKO scoring prompt`
4. `feat: add instruction score API route`
5. `feat: add InstructionScorer and InstructionScoreResult components`
6. `feat: add mode tab toggle to home page`
7. `feat: add mode selection to host page`
8. `feat: branch play and board pages by session mode`
9. `chore: update metadata and PWA manifest`
10. `docs: update README for dual-mode support`

각 커밋은 **독립적으로 작동**하도록 (중간에 멈춰도 앱이 깨지지 않게). 특히 1번 커밋(DB)은 배포 선행 필요.

### 11.3 코딩 규칙 (기존 CLAUDE.md 준수)
- TypeScript strict mode
- 함수형 컴포넌트, Server Component 우선
- 파일명: kebab-case (컴포넌트는 PascalCase)
- Import 순서: React → Next.js → 외부 → 내부 → 타입 → 스타일
- 한국어 주석 허용

### 11.4 환경변수
추가 환경변수 불필요. 기존 3개(`ANTHROPIC_API_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`)만 사용.

---

## 12. 참고 문서 위치

- 채점 루브릭 상세: `docs/I-MRKO_채점_루브릭.md`
- 기존 R-PCCO 루브릭: `docs/R-PCCO_채점_루브릭.md` (수정 금지)
- 기존 개발 히스토리: `docs/DEVELOPMENT.md`
- Railway 배포 가이드: `docs/DEPLOY.md` (변경 없음)
- 강의 운영 매뉴얼: `docs/OPERATIONS.md` (I-MRKO 세션 운영법 추가 권장)

---

## 13. 완료 기준 (Definition of Done)

1. ✅ 기존 R-PCCO 세션 코드로 접속 시 기존과 동일하게 작동
2. ✅ 홈 페이지 탭에서 프롬프트/지침 전환 가능
3. ✅ `/host`에서 두 모드 모두 세션 생성 가능
4. ✅ I-MRKO 세션에서 채점 요청 → 루브릭 기반 결과 반환
5. ✅ 리더보드가 세션 모드에 맞는 5요소로 표시
6. ✅ Realtime 작동
7. ✅ PWA 설치 시 이름·아이콘 반영
8. ✅ 모든 린트 통과 (`npm run lint`)
9. ✅ 빌드 성공 (`npm run build`)
10. ✅ Railway 배포 후 E2E 동작 확인 (두 모드 각각 1회 이상)

---

**작업 시작 전 필독:** 
이 문서는 `docs/I-MRKO_채점_루브릭.md`와 함께 읽어야 완성됩니다. 루브릭 문서의 §11(시스템 프롬프트)과 §12(Few-shot)를 그대로 활용하세요.
