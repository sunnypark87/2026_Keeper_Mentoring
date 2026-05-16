import Link from "next/link";
import type { Metadata } from "next";
import { RevealDeck } from "@/components/reveal-deck";
import { ClosingSlideDeck } from "@/content/closing-slide";

export const metadata: Metadata = {
  title: "마무리 인사",
  description: "시스템 해킹 기초 멘토링 마지막 슬라이드입니다",
};

export default function ClosingPage() {
  return (
    <main className="week-page h-dvh overflow-hidden bg-slide-surface text-foreground">
      <header className="week-page-header flex items-start justify-between gap-4 p-4 md:p-6">
        <div className="week-banner max-w-xl rounded-2xl border border-accent-frame bg-canvas-elevated px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Keeper Mentoring
          </p>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-inverse md:text-2xl">
            마무리 인사
          </h1>
        </div>

        <Link
          href="/"
          className="rounded-full border border-accent-frame bg-canvas-elevated px-4 py-2 text-sm font-medium text-inverse transition hover:bg-accent hover:text-inverse"
        >
          홈으로
        </Link>
      </header>

      <RevealDeck>
        <ClosingSlideDeck />
      </RevealDeck>
    </main>
  );
}
