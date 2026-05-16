import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 마무리
  <br>

  이번 학기 시스템 해킹 기초 멘토링에 참여해 주셔서 감사합니다!!!
  <br>
  <br>

  ## 그동안 했던 것들
  <br>

  - C언어와 포인터
  - 리눅스와 바이너리 분석 기초
  - pwntools와 셸코드
  - BOF 실습과 보호 기법

  <br>
  <br>

  어려운 내용이었지만 보안에 대해서 관심을 가질 수 있는 기회가 되었기를 바랍니다. 
  <br> 
  보안을 진로로 가져가지 않더라도 조금이라도 보안에 대해서 공부를 해보는 건 좋은 경험이 될 거라고 생각합니다.
  <br>
  앞으로도 막히는 부분이나 어떻게 해야할지 모르는 부분이 있다면 편하게 연락주세요 :)`,
  
  `
  ## 시스템 해킹
  <br> 

  ### 워게임 사이트의 문제 풀면서 공부하기
  - 드림핵
  - pwnable.kr
  - root-me 
  - 이외에도 다양한 사이트가 있으니 검색해보기 
  
  ### 다양한 취약점
  - 포맷 스트링 버그 (Format String Bug)
  - Use-After-Free (UAF)
  - Double Free


  <br>
  <br>

  ## 시스템 해킹 이외의 분야
  <br>

  - 리버싱 : 프로그램을 거꾸로 분석해 동작 원리와 숨겨진 로직을 파악하는 분야
  - 웹 해킹 : 웹 서비스의 인증, 권한, 입력 처리 문제를 찾아 공격과 방어를 공부하는 분야
  - 암호학 : 암호 알고리즘과 프로토콜이 안전하게 설계되고 사용되는지 분석하는 분야
  - 포렌식 : 디지털 기기와 파일에 남은 흔적을 분석해 사건의 원인을 추적하는 분야
  `
];

export function ClosingSlideDeck() {
  return <MarkdownSlides slides={slides} />;
}
