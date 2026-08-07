// db.js — 창고(Supabase) 연결 엔진  ⚠️ 이 파일은 수정하지 않습니다
//
// 제공 함수 (앞단과의 계약):
//   DB.isConnected()      → 창고 연결 여부 (true/false)
//   DB.saveResult(data)   → 저장하고 공유용 id를 돌려줌 (data.result 필수)
//   DB.loadResult(id)     → 저장했던 data를 그대로 돌려줌 (없으면 null)
//   DB.getStats()         → { total, counts } — 전체 응답 수 + result별 개수

const DB = (() => {
  let _client = null;

  function isConnected() {
    return Boolean(
      typeof CONFIG !== "undefined" &&
        CONFIG.SUPABASE_URL &&
        CONFIG.SUPABASE_ANON_KEY
    );
  }

  function client() {
    if (!isConnected()) {
      throw new Error(
        "창고(Supabase)가 아직 연결되지 않았습니다. config.js에 URL과 anon key를 넣어주세요."
      );
    }
    if (!_client) {
      _client = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_ANON_KEY);
    }
    return _client;
  }

  // 결과 저장: data는 자유 JSON (단, result 키(문자열) 필수) → 공유용 id 반환
  async function saveResult(data) {
    if (!data || typeof data.result !== "string" || !data.result.trim()) {
      throw new Error(
        "saveResult(data): data에 result 키(결과 유형/등급 이름, 문자열)가 필요합니다."
      );
    }
    const { data: row, error } = await client()
      .from("results")
      .insert({ result: data.result, payload: data })
      .select("id")
      .single();
    if (error) throw error;
    return row.id;
  }

  // 공유 링크로 열람: id → 저장했던 data 그대로 반환 (없으면 null)
  async function loadResult(id) {
    const { data: row, error } = await client()
      .from("results")
      .select("payload")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    return row ? row.payload : null;
  }

  // 통계: 전체 응답 수 + result별 개수 (예: { total: 12, counts: { "강아지": 5, ... } })
  async function getStats() {
    const { data: rows, error } = await client().from("results").select("result");
    if (error) throw error;
    const counts = {};
    for (const r of rows) counts[r.result] = (counts[r.result] || 0) + 1;
    return { total: rows.length, counts };
  }

  return { isConnected, saveResult, loadResult, getStats };
})();
