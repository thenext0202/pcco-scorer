# 참고샘플 — 나는 무슨 동물일까? 🐾

백엔드 키트의 계약(db.js)을 지켜 만든 **완성 예시**입니다. 용도는 두 가지:

1. **참고서**: 내 앱을 만들 때 "계약을 어떻게 쓰는지" 보는 모범답안
   - 결과 저장: `DB.saveResult({ result, typeKey, answers, ... })` → 공유 id
   - 공유 모드: `?id=` 감지 → `DB.loadResult(id)` → 결과 표시 (app.js 맨 아래)
   - 통계: `DB.getStats()` → "당신과 같은 유형은 N%"
2. **안전망**: 내 앱 생성이 꼬였을 때 이 폴더로 갈아타서 뒷단 실습(GitHub·Vercel·Supabase)을 계속 진행

## 이 폴더만 단독으로 쓰려면
`config.js`·`db.js`가 이미 들어 있어 이 폴더 자체로 완결입니다.
이 폴더에서 `claude`를 실행하고, 키트와 동일하게 GitHub → Vercel → Supabase 순서로 진행하면 됩니다.
