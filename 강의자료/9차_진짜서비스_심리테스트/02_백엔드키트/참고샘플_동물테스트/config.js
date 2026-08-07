// config.js — 창고 열쇠 (수업 Part 10 'Supabase 연결'에서 채웁니다)
// Supabase 대시보드 → Settings → API 에서 두 값을 복사해 넣으세요.
//
// ⚠️ 여기 들어가는 anon key는 '손님용 방문증'이라 공개돼도 됩니다.
//    (무엇을 할 수 있는지는 창고의 출입 규칙 RLS가 지킵니다)
//    절대 넣으면 안 되는 것: service_role 키 (마스터키)

const CONFIG = {
  SUPABASE_URL: "",      // 예: https://xxxx.supabase.co
  SUPABASE_ANON_KEY: "", // anon public 키
};
