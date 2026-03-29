import type { ComponentType } from "react";
import { Week1IntroToSecurityDeck } from "@/content/weeks/week-1-intro-to-security";
import { Week2CPointerDeck } from "@/content/weeks/week-2-c-and-pointer";

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
  {
    weekNumber: 2,
    slug: "week-2-C-and-pointer",
    title: "C언어와 포인터",
    description: "2주차입니다",
    deck: Week2CPointerDeck,
  },
];

export function getWeekBySlug(slug: string) {
  return weeks.find((week) => week.slug === slug);
}
