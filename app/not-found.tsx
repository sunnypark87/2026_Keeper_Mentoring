import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16">
      <div className="not-found-card max-w-xl rounded-[2rem] border border-slate-200 bg-slide-surface p-10 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
          404
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-600">
          요청한 주차 페이지가 아직 생성되지 않았거나 잘못된 경로입니다.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
