export function Week1IntroToSecurityDeck() {
  return (
    <>
      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Week 1
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
            Intro to Security
          </h1>
          <p className="text-2xl leading-relaxed text-slate-600">
            멘토링의 출발점으로, 보안을 왜 배워야 하는지와 앞으로 어떤 관점으로
            학습할지 정리합니다.
          </p>
          <div className="slide-panel">
            <p className="text-base uppercase tracking-[0.2em] text-amber-600">
              Orientation
            </p>
            <p className="mt-3 text-xl leading-8 text-slate-700">
              이번 시간은 &quot;보안이란 무엇인가&quot;를 정의하고, 앞으로의 학습
              기준선을 맞추는 시간입니다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            이번 주 목표
          </h2>
          <ul className="slide-list text-2xl text-slate-700">
            <li className="fragment">보안을 기능이 아니라 사고방식으로 이해하기</li>
            <li className="fragment">공격자 관점과 방어자 관점의 차이 파악하기</li>
            <li className="fragment">웹 서비스에서 신뢰 경계가 어디인지 감 잡기</li>
            <li className="fragment">이번 학기 멘토링의 학습 흐름 미리 보기</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            왜 보안이 중요한가
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="slide-panel">
              <h3 className="text-xl font-semibold text-slate-900">신뢰</h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                사용자는 서비스가 안전하다고 믿을 때만 데이터를 맡깁니다.
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-xl font-semibold text-slate-900">영향</h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                작은 취약점도 개인정보, 서비스 운영, 평판에 큰 영향을 줍니다.
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-xl font-semibold text-slate-900">습관</h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                보안은 마지막 점검이 아니라 설계와 구현 전반의 습관입니다.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            보안을 볼 때 가장 먼저 잡을 3가지
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            <article className="slide-panel">
              <h3 className="text-2xl font-semibold text-slate-900">
                Confidentiality
              </h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                허용되지 않은 사람이 정보를 보지 못하게 하는 것
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-2xl font-semibold text-slate-900">
                Integrity
              </h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                데이터와 동작이 의도하지 않게 변조되지 않게 하는 것
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-2xl font-semibold text-slate-900">
                Availability
              </h3>
              <p className="mt-3 text-lg leading-8 text-slate-600">
                필요한 순간에 정상적으로 사용할 수 있게 유지하는 것
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            공격자는 어디를 볼까
          </h2>
          <ul className="slide-list text-2xl text-slate-700">
            <li className="fragment">입력값을 어디까지 믿고 있는가</li>
            <li className="fragment">사용자 신원을 어떻게 확인하는가</li>
            <li className="fragment">로그인 이후 어떤 권한 검사가 빠져 있는가</li>
            <li className="fragment">개발 편의를 위해 남겨둔 우회 경로가 있는가</li>
          </ul>
          <div className="slide-panel">
            <p className="text-xl leading-8 text-slate-700">
              보안 학습의 핵심은 취약점 이름을 외우는 것보다
              &quot;이 시스템은 무엇을 신뢰하고 있는가?&quot;를 계속 묻는
              습관입니다.
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            웹 보안은 결국 흐름을 이해하는 것
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            <article className="slide-panel">
              <h3 className="text-lg font-semibold text-slate-900">1. 요청</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                브라우저가 서버에 데이터를 보냅니다.
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-lg font-semibold text-slate-900">2. 처리</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                서버가 입력을 해석하고 비즈니스 로직을 실행합니다.
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-lg font-semibold text-slate-900">3. 저장</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                DB, 세션, 로그 등 다양한 저장소와 연결됩니다.
              </p>
            </article>
            <article className="slide-panel">
              <h3 className="text-lg font-semibold text-slate-900">4. 응답</h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                결과가 다시 사용자에게 노출됩니다.
              </p>
            </article>
          </div>
          <p className="text-xl leading-8 text-slate-600">
            취약점은 이 흐름 어디에서든 생길 수 있고, 멘토링은 이 지점을
            하나씩 분해해서 보는 방식으로 진행합니다.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            이번 학기 큰 흐름
          </h2>
          <ul className="slide-list text-2xl text-slate-700">
            <li className="fragment">웹의 동작 원리와 신뢰 경계</li>
            <li className="fragment">입력 검증, 인증, 세션, 권한 관리</li>
            <li className="fragment">대표적인 웹 취약점과 방어 전략</li>
            <li className="fragment">실습 중심으로 사고 과정 익히기</li>
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            가벼운 과제
          </h2>
          <div className="slide-panel">
            <p className="text-2xl font-semibold text-slate-900">
              자주 사용하는 웹 서비스 하나를 고르고 생각해보기
            </p>
            <ul className="mt-6 slide-list text-xl text-slate-700">
              <li>이 서비스는 어떤 정보를 보호해야 하는가?</li>
              <li>어떤 사용자가 어떤 권한을 가져야 하는가?</li>
              <li>입력값을 잘못 처리하면 어디가 가장 먼저 위험해질까?</li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            다음 단계
          </h2>
          <p className="text-2xl leading-relaxed text-slate-600">
            다음 주차부터는 웹 보안의 기본 구조를 바탕으로, 실제로 어디에서
            취약점이 생기는지 더 구체적으로 들어갑니다.
          </p>
          <div className="slide-panel">
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
              Preview
            </p>
            <p className="mt-3 text-2xl text-slate-900">
              Week 2: Web Security Fundamentals
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
