import Link from "next/link";
import { weeks } from "@/data/weeks";

export default function Home() {
  return (
    <main className="home-page min-h-screen bg-canvas px-6 py-10 text-inverse md:px-10 md:py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="home-hero overflow-hidden rounded-[2rem] border border-accent-line p-8 md:p-12">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            2026 Keeper Mentoring
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight text-inverse md:text-6xl">
            시스템 해킹(Pwnable) 기초 멘토링
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-inverse-muted md:text-xl">
            이번 학기 동안 시스템 해킹을 위해 필요한 기본 지식과 해킹 기법 등을 학습할 예정입니다. 
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-inverse-muted md:text-xl">
            멘토 : 박재선
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-inverse-muted md:text-xl">
            멘티 : 김현주, 박주영, 박지윤, 방성태, 임수희
          </p>
        </section>

        <section className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                Weeks
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-inverse">
                멘토링 목차
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {weeks.map((week) => (
              <Link
                key={week.slug}
                href={`/${week.slug}`}
                className="home-week-card group rounded-[1.5rem] border border-inverse-border bg-inverse-surface p-6 transition hover:-translate-y-1 hover:border-accent hover:bg-accent-soft"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                  Week {week.weekNumber}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-inverse">
                  {week.title}
                </h3>
                <p className="mt-3 text-base leading-7 text-inverse-subtle">
                  {week.description}
                </p>
                <p className="mt-6 text-sm font-medium text-inverse group-hover:text-accent">
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
