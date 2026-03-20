import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-32 bg-gradient-to-br from-blue-900 to-indigo-800 text-white">
        <h1 className="text-5xl font-bold leading-tight tracking-tight max-w-2xl mb-6">
          강의 없이, 챌린지로 배운다
        </h1>
        <p className="text-xl text-blue-200 max-w-xl mb-10">
          Claude Code와 함께하는 새로운 학습 경험
        </p>
        <Link
          href="/signup"
          className="inline-block bg-white text-blue-900 font-semibold text-lg px-8 py-4 rounded-full hover:bg-blue-50 transition-colors"
        >
          지금 시작하기
        </Link>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            CDL이 특별한 이유
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-5xl mb-5">🎯</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. 결과물을 정의하라
              </h3>
              <p className="text-gray-600 leading-relaxed">
                무엇을 만들지 먼저 정의합니다. 목표가 명확할수록 학습이 빠릅니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-5xl mb-5">🤖</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Claude Code가 가이드한다
              </h3>
              <p className="text-gray-600 leading-relaxed">
                AI가 당신의 페어 프로그래머가 되어 막히는 순간마다 함께합니다.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <span className="text-5xl mb-5">✅</span>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. 자동으로 평가받는다
              </h3>
              <p className="text-gray-600 leading-relaxed">
                완성된 결과물은 자동으로 검증됩니다. 즉각적인 피드백으로 성장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            챌린지 방식
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { step: '01', label: '결과물 정의', desc: '만들고 싶은 것을 구체적으로 정합니다', color: 'bg-blue-600' },
              { step: '02', label: '문서화', desc: '요구사항과 설계를 명확히 기록합니다', color: 'bg-indigo-600' },
              { step: '03', label: '테스트', desc: '자동화된 테스트로 품질을 검증합니다', color: 'bg-violet-600' },
              { step: '04', label: '훅', desc: 'Git 훅으로 코드 일관성을 유지합니다', color: 'bg-purple-600' },
              { step: '05', label: '스킬', desc: '완성된 챌린지가 새로운 스킬로 쌓입니다', color: 'bg-fuchsia-600' },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center gap-6 bg-white rounded-xl p-6 shadow-sm">
                <div className={`flex-shrink-0 w-12 h-12 rounded-full ${item.color} text-white flex items-center justify-center font-bold text-sm`}>
                  {item.step}
                </div>
                {index < 4 && (
                  <div className="absolute left-[2.875rem] mt-16 w-0.5 h-4 bg-gray-200 hidden" />
                )}
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{item.label}</h3>
                  <p className="text-gray-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-blue-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">지금 바로 시작해보세요</h2>
        <p className="text-blue-200 mb-10 text-lg">챌린지 하나가 당신의 실력을 바꿉니다</p>
        <Link
          href="/signup"
          className="inline-block bg-white text-blue-900 font-semibold text-lg px-8 py-4 rounded-full hover:bg-blue-50 transition-colors"
        >
          지금 시작하기
        </Link>
      </section>
    </div>
  )
}
