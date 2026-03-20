import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { RevealDeck } from "@/components/reveal-deck";
import { getWeekBySlug, weeks } from "@/data/weeks";

type WeekPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return weeks.map((week) => ({
    slug: week.slug,
  }));
}

export async function generateMetadata({
  params,
}: WeekPageProps): Promise<Metadata> {
  const { slug } = await params;
  const week = getWeekBySlug(slug);

  if (!week) {
    return {};
  }

  return {
    title: `Week ${week.weekNumber}: ${week.title}`,
    description: week.description,
  };
}

export default async function WeekPage({ params }: WeekPageProps) {
  const { slug } = await params;
  const week = getWeekBySlug(slug);

  if (!week) {
    notFound();
  }

  const DeckContent = week.deck;

  return (
    <main className="week-page relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-4 p-4 md:p-6">
        <div className="max-w-xl rounded-2xl border border-[rgba(53,166,174,0.22)] bg-[#050505]/92 px-4 py-3 shadow-[0_12px_32px_rgba(15,23,42,0.12)] backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[rgb(53,166,174)]">
            Keeper Mentoring
          </p>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-white md:text-2xl">
            Week {week.weekNumber}. {week.title}
          </h1>
        </div>

        <Link
          href="/"
          className="pointer-events-auto rounded-full border border-[rgba(53,166,174,0.22)] bg-[#050505]/92 px-4 py-2 text-sm font-medium text-white transition hover:bg-[rgb(53,166,174)] hover:text-black"
        >
          홈으로
        </Link>
      </div>

      <RevealDeck>
        <DeckContent />
      </RevealDeck>
    </main>
  );
}
