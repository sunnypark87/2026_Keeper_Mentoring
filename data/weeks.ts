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
    title: "Intro to Security",
    description: "보안의 필요성과 이번 멘토링의 학습 흐름을 소개하는 오리엔테이션 주차입니다.",
    deck: Week1IntroToSecurityDeck,
  },
];

export function getWeekBySlug(slug: string) {
  return weeks.find((week) => week.slug === slug);
}
