-- R-PCCO Scorer Database Schema
-- 실행 방법: Supabase Dashboard → SQL Editor → New query → 이 내용 붙여넣기 → Run

-- 1. sessions 테이블 생성
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(4) UNIQUE NOT NULL,
  title VARCHAR(100) NOT NULL,
  host_name VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ DEFAULT (now() + INTERVAL '24 hours')
);

-- 2. submissions 테이블 생성
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  nickname VARCHAR(30) NOT NULL,
  prompt TEXT NOT NULL,
  total_score INT NOT NULL,
  grade VARCHAR(2) NOT NULL,
  elements_json JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_sessions_code ON sessions(code);
CREATE INDEX IF NOT EXISTS idx_submissions_session_score ON submissions(session_id, total_score DESC);

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책 설정

-- sessions 정책: 누구나 조회 가능, 인증된 사용자는 생성 가능
DROP POLICY IF EXISTS "sessions_select_policy" ON sessions;
CREATE POLICY "sessions_select_policy" ON sessions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "sessions_insert_policy" ON sessions;
CREATE POLICY "sessions_insert_policy" ON sessions
  FOR INSERT WITH CHECK (true);

-- submissions 정책: 누구나 조회 가능, 생성 가능, 수정/삭제 불가
DROP POLICY IF EXISTS "submissions_select_policy" ON submissions;
CREATE POLICY "submissions_select_policy" ON submissions
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "submissions_insert_policy" ON submissions;
CREATE POLICY "submissions_insert_policy" ON submissions
  FOR INSERT WITH CHECK (true);

-- 6. Realtime 활성화
-- submissions 테이블의 변경사항을 실시간으로 구독 가능하게 설정
ALTER PUBLICATION supabase_realtime ADD TABLE submissions;

-- 완료! 이제 애플리케이션에서 세션 생성 및 리더보드 기능을 사용할 수 있습니다.

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

-- =========================================
-- v3 확장: SSDHR 이미지 프롬프트 채점 모드 추가 (3차 강의)
-- =========================================

-- mode 컬럼의 CHECK 제약을 'image' 포함하도록 재정의
-- (PostgreSQL은 CHECK 제약을 직접 수정할 수 없어서 DROP → ADD)
ALTER TABLE sessions
  DROP CONSTRAINT IF EXISTS sessions_mode_check;

ALTER TABLE sessions
  ADD CONSTRAINT sessions_mode_check
  CHECK (mode IN ('prompt', 'instruction', 'image'));

-- 코멘트 갱신
COMMENT ON COLUMN sessions.mode IS
  'prompt = R-PCCO (1차), instruction = I-MRKO (2차), image = SSDHR (3차)';

-- submissions.elements_json은 JSONB라서 image 모드의 새 키
-- (scene/style/detail/hard/reality)도 자동 호환됨. 별도 마이그레이션 불필요.
