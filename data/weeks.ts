import type { ComponentType } from "react";
import { Week1IntroToSecurityDeck } from "@/content/weeks/week-1-intro-to-security";

export type Week = {
  weekNumber: number;
  slug: string;
  title: string;
  description: string;
  deck: ComponentType;
};

export const weeks: Week[] = [
  {
    weekNumber: 1,
    slug: "week-1-intro-to-security",
    title: "시스템 해킹의 기초",
    description: "오리엔테이션 주차입니다",
    deck: Week1IntroToSecurityDeck,
  },
];

export function getWeekBySlug(slug: string) {
  return weeks.find((week) => week.slug === slug);
}
