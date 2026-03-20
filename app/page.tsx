import Link from "next/link";
import { weeks } from "@/data/weeks";

export default function Home() {
  return (
    <main className="home-page min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="overflow-hidden rounded-[2rem] border border-[rgba(53,166,174,0.28)] bg-[radial-gradient(circle_at_top_left,rgba(53,166,174,0.22),transparent_34%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-8 shadow-[0_28px_120px_rgba(0,0,0,0.45)] md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[rgb(53,166,174)]">
            2026 Keeper Mentoring
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
            주차별 보안 멘토링 슬라이드를 모아두는 정적 웹페이지
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 md:text-xl">
            홈은 전체 목차 역할을 하고, 각 주차는 Reveal.js 기반 슬라이드
            페이지로 분리합니다. 현재는 1주차 예시만 먼저 구성한 상태입니다.
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(53,166,174)]">
                Weeks
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
                멘토링 목차
              </h2>
            </div>
            <p className="text-sm text-white/52">
              주차를 추가할 때는 데이터와 슬라이드 파일만 확장하면 됩니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {weeks.map((week) => (
              <Link
                key={week.slug}
                href={`/${week.slug}`}
                className="group rounded-[1.5rem] border border-white/12 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-[rgb(53,166,174)] hover:bg-[rgba(53,166,174,0.08)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.28)]"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[rgb(53,166,174)]">
                  Week {week.weekNumber}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {week.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-white/70">
                  {week.description}
                </p>
                <p className="mt-6 text-sm font-medium text-white group-hover:text-[rgb(53,166,174)]">
                  슬라이드 보기
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
