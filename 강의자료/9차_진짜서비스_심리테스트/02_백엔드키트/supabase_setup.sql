-- ================================================================
-- 9차 실습: 창고 개설 SQL
-- 사용법: Supabase 대시보드 → SQL Editor → 전체 붙여넣기 → Run
-- 하는 일: results 테이블 생성 + 출입 규칙(RLS) 설정
-- 규칙: 누구나 넣기(insert)·읽기(select) 가능 / 고치기·지우기는 불가
-- ================================================================

-- 1) 테이블: 결과 1건 = 1행
create table if not exists public.results (
  id         uuid primary key default gen_random_uuid(), -- 자동 발급 → 공유 링크의 ?id=
  result     text not null,                              -- 결과 유형/등급 이름 (통계용)
  payload    jsonb not null,                             -- 결과 전체 (자유 구조)
  created_at timestamptz not null default now()          -- 저장 시각 (자동)
);

-- 2) 출입 규칙(RLS) 켜기
alter table public.results enable row level security;

-- 3) 규칙: 누구나(anon) 넣을 수 있다
drop policy if exists "anyone_can_insert" on public.results;
create policy "anyone_can_insert" on public.results
  for insert to anon with check (true);

-- 4) 규칙: 누구나(anon) 읽을 수 있다
drop policy if exists "anyone_can_select" on public.results;
create policy "anyone_can_select" on public.results
  for select to anon using (true);

-- (update·delete 규칙은 만들지 않음 = 아무도 못 고치고 못 지움)

-- ✅ 완료 확인: 좌측 Table Editor에서 results 테이블이 보이면 성공!
