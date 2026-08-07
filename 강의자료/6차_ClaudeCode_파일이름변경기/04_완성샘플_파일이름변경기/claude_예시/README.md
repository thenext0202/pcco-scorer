# `.claude/` 폴더 예시

> ⚠️ 실제 프로젝트에서는 이 안의 파일들을 **`.claude/` 폴더 아래**에 두세요.
> (이 샘플에서는 `.claude/`가 보호 경로라 `claude_예시/`로 대신 담았습니다.)

## 들어있는 것
- `settings.json` → 실제 위치: `.claude/settings.json` (권한 allow/deny)
- `skills/커밋정리/SKILL.md` → 실제 위치: `.claude/skills/커밋정리/SKILL.md` (반복 작업 스킬)

## 옮기는 법
```bash
mkdir -p .claude/skills/커밋정리
cp claude_예시/settings.json .claude/settings.json
cp claude_예시/skills/커밋정리/SKILL.md .claude/skills/커밋정리/SKILL.md
```
또는 Claude Code에게 "claude_예시 폴더 내용을 .claude로 옮겨줘"라고 부탁하세요.
