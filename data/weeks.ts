import type { ComponentType } from "react";
import { Week1IntroToSecurityDeck } from "@/content/weeks/week-1-intro-to-security";
import { Week2CPointerDeck } from "@/content/weeks/week-2-c-and-pointer";
import { Week3PythonPwnDeck } from "@/content/weeks/week-3-pwntools-and-shellcode";
import { Week4OrwShellcodeDeck } from "@/content/weeks/week-4-orw-shellcode";
import { Week5BofPracticeDeck } from "@/content/weeks/week-5-bof-practice";
import { Week6BofMitigationDeck } from "@/content/weeks/week-6-bof-mitigation";

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
    description: "오리엔테이션 자료입니다",
    deck: Week1IntroToSecurityDeck,
  },
  {
    weekNumber: 2,
    slug: "week-2-C-and-pointer",
    title: "C언어와 포인터",
    description: "2주차 자료입니다",
    deck: Week2CPointerDeck,
  },
  {
    weekNumber: 3,
    slug: "week-3-pwntools-and-shellcode",
    title: "pwntools와 셸코드",
    description: "3주차 자료입니다",
    deck: Week3PythonPwnDeck,
  },
  {
    weekNumber: 4,
    slug: "week-4-orw-shellcode",
    title: "ORW 셸코드와 shell_basic 분석",
    description: "4주차 자료입니다",
    deck: Week4OrwShellcodeDeck,
  },
  {
    weekNumber: 5,
    slug: "week-5-bof-practice",
    title: "BOF 실습 - Root Me basic 1",
    description: "지난 과제 리뷰, BOF 개념 복습, Root Me 실습을 위한 5주차 자료입니다",
    deck: Week5BofPracticeDeck,
  },
  {
    weekNumber: 6,
    slug: "week-6-bof-mitigation",
    title: "BOF 보호 기법",
    description: "BOF exploit을 어렵게 만드는 Canary, NX, ASLR, PIE, RELRO 등 보호 기법을 정리하는 6주차 자료입니다",
    deck: Week6BofMitigationDeck,
  },
];

export function getWeekBySlug(slug: string) {
  return weeks.find((week) => week.slug === slug);
}
