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
    <main className="week-page min-h-screen bg-slide-surface text-foreground">
      <header className="week-page-header flex items-start justify-between gap-4 p-4 md:p-6">
        <div className="week-banner max-w-xl rounded-2xl border border-accent-frame bg-canvas-elevated px-4 py-3 backdrop-blur-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
            Keeper Mentoring
          </p>
          <h1 className="mt-2 text-lg font-semibold tracking-tight text-inverse md:text-2xl">
            Week {week.weekNumber}. {week.title}
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
        <DeckContent />
      </RevealDeck>
    </main>
  );
}
