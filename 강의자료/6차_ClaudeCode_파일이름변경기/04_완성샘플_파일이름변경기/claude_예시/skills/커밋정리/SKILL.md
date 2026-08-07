---
name: 커밋정리
description: 변경사항을 conventional commits 규칙으로 정리해 커밋한다
---

# 커밋 정리 절차
1. `git status`로 변경 확인
2. 관련된 변경끼리 묶기 (한 커밋 = 한 주제)
3. 형식: `feat:` / `fix:` / `docs:` / `refactor:` / `chore:`
4. 메시지는 한국어 한 줄 요약 + 필요하면 본문에 이유
5. 커밋 전 `.env`·비밀파일이 섞이지 않았는지 확인

## 예시
- `feat: 되돌리기(undo) 기능 추가`
- `fix: 한글 빈 이름 검증 누락 수정`
- `docs: README에 실행 방법 보강`
