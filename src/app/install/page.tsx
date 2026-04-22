import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900">
            📱 앱 설치 가이드
          </h1>
          <p className="text-slate-600">
            R-PCCO Scorer를 홈 화면에 추가하고 편하게 사용하세요
          </p>
        </div>

        {/* iOS Safari */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🍎</span>
              iOS (iPhone/iPad) - Safari
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3 list-decimal list-inside text-slate-700">
              <li>
                Safari에서 R-PCCO Scorer 웹사이트를 엽니다
              </li>
              <li>
                화면 하단의 <strong>공유 버튼</strong> (
                <span className="inline-block px-2 py-1 bg-slate-200 rounded text-sm">
                  ↗️
                </span>
                )을 탭합니다
              </li>
              <li>
                아래로 스크롤하여{" "}
                <strong>"홈 화면에 추가"</strong>를 찾아 탭합니다
              </li>
              <li>
                앱 이름을 확인하고 <strong>"추가"</strong> 버튼을 탭합니다
              </li>
              <li>홈 화면에서 R-PCCO 아이콘을 찾아 실행하세요!</li>
            </ol>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                💡 <strong>팁:</strong> 공유 버튼이 보이지 않나요? Safari
                브라우저에서만 설치가 가능합니다. Chrome이나 다른 브라우저를
                사용 중이라면 Safari로 다시 접속해주세요.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Android Chrome */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              Android - Chrome
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3 list-decimal list-inside text-slate-700">
              <li>Chrome 브라우저에서 R-PCCO Scorer를 엽니다</li>
              <li>
                화면 상단 주소창 옆의 <strong>메뉴 버튼</strong> (⋮)을
                탭합니다
              </li>
              <li>
                <strong>"앱 설치"</strong> 또는{" "}
                <strong>"홈 화면에 추가"</strong>를 선택합니다
              </li>
              <li>설치 확인 대화상자에서 "설치"를 탭합니다</li>
              <li>앱 서랍이나 홈 화면에서 R-PCCO를 실행하세요!</li>
            </ol>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                💡 <strong>팁:</strong> 일부 기기에서는 하단에 "앱 설치"
                배너가 자동으로 표시될 수 있습니다. 배너의 "설치" 버튼을
                탭하면 더 빠르게 설치할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Desktop Chrome/Edge */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              데스크톱 - Chrome / Edge
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ol className="space-y-3 list-decimal list-inside text-slate-700">
              <li>Chrome 또는 Edge 브라우저에서 R-PCCO Scorer를 엽니다</li>
              <li>
                주소창 오른쪽의 <strong>설치 아이콘</strong> (
                <span className="inline-block px-2 py-1 bg-slate-200 rounded text-sm">
                  ⊕
                </span>
                )을 클릭합니다
              </li>
              <li>
                또는 주소창 오른쪽 메뉴(⋮) → "R-PCCO Scorer 설치..."를
                선택합니다
              </li>
              <li>설치 확인 대화상자에서 "설치"를 클릭합니다</li>
              <li>
                설치된 앱이 자동으로 열리고, 앱 서랍이나 시작 메뉴에서도
                실행할 수 있습니다
              </li>
            </ol>

            <div className="bg-slate-100 p-4 rounded-lg">
              <p className="text-sm text-slate-600">
                💡 <strong>팁:</strong> 설치 후 앱처럼 독립적인 창에서
                실행되며, 작업 표시줄이나 Dock에 고정할 수 있습니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 설치 후 혜택 */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle>✨ 앱 설치 시 혜택</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-slate-700">
              <li className="flex items-start gap-2">
                <span>⚡</span>
                <span>빠른 실행: 홈 화면에서 바로 앱을 열 수 있습니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span>📱</span>
                <span>
                  전체 화면: 브라우저 UI 없이 앱처럼 깔끔하게 사용합니다
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span>🔔</span>
                <span>독립 실행: 브라우저와 별도로 독립적으로 동작합니다</span>
              </li>
              <li className="flex items-start gap-2">
                <span>💾</span>
                <span>
                  오프라인 대비: 일부 기능은 인터넷 없이도 사용 가능합니다
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* 돌아가기 */}
        <div className="text-center pt-4">
          <Link href="/">
            <Button variant="outline" size="lg">
              ← 홈으로 돌아가기
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
