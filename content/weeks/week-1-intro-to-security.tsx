import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 1주차. 학습 환경 설정 & 리눅스 기초 
  <br>
  
  첫 주차는 멘토링 운영 방식을 맞추고, 전체 커리큘럼을 함께 점검한 뒤 각자 실습 환경을 준비하는 시간입니다.
  <br>

  ## 목표
  <br>

  - 멘토링 일정과 진행 방식을 확정한다
  - 7주차까지의 커리큘럼을 확인한다
  - 각자 운영체제에 맞는 실습 환경을 정한다`,

  `# 오늘 멘토링 내용
  <br>

  ## 인사 및 멘토 / 멘티 소개
  <br>

  ## 멘토링 일정 확정
  <br>

  ## 커리큘럼 점검
  <br>

  ## 환경설정`,

  `# 멘토링 일정
  <br>

  ## 3월
  - 3/23 - 1주차
  - 3/30 - 2주차

  ## 4월
  - 4/27 - 3주차

  ## 5월
  - 5/4 - 4주차
  - 5/11 - 5주차
  - 5/18 - 6주차
  - 5/25 - 7주차`,

  `# 멘토링 커리큘럼
  <br>

  ## 1주차. 학습 환경 설정 & 리눅스 기초
  - 인사 및 앞으로의 멘토링 방향 논의
  - 리눅스 환경 설정

  ## 2~3주차. C 언어와 메모리 구조
  - 포인터와 주소 개념 이해
  - 메모리 영역 이해

  ## 4주차. CPU와 어셈블리 기초
  - CPU 레지스터의 역할과 동작 이해
  - 함수 호출 구조 분석
  - 어셈블리 기본 명령어 학습`,

  `# 멘토링 커리큘럼
  <br>

  ## 5~6주차. 버퍼 오버플로우 (BOF)
  - 버퍼 오버플로우 개념 이해
  - 스택 메모리 덮어쓰는 방법 학습
  - 버퍼 오버플로우 실습

  ## 7주차. 보호 기법
  - Stack Canary, NX, ASLR 개념과 원리 이해
  - 워게임 문제 풀이`,

  `# 시스템 해킹이란?
  시스템 해킹은 프로그램이 메모리와 CPU를 어떻게 사용하는지 이해하고, <br>그 과정에서 생길 수 있는 취약점을 분석해 원하는 동작을 이끌어내는 분야입니다.

  ## 앞으로 배우는 것
  - 리눅스 환경, C 언어, 메모리 구조
  - CPU 레지스터, 함수 호출, 어셈블리 흐름
  - 버퍼 오버플로우와 보호 기법`,

  `# Ubuntu 설치
  
  <br>
  
  ## Windows
  ### WSL2 + Ubuntu 
  <br>
 
  \`\`\`
  // 관리자 권한으로 Powershell 실행 후
  wsl --install

  // 설치 확인
  wsl.exe --list --verbose
  \`\`\` 
  
  ### Docker 사용 
  <br>
  
  ### Ubuntu 가상머신 (VMWare, VirtualBox 등)
  <br>
  
  `,

  `# Ubuntu 설치

  <br>
  
  ## MacOS
  ### 내장 Terminal 사용
  <br>

  특별한 설정 필요 x
  ### Docker 사용
  <br>

  ### Ubuntu 가상머신 (VMWare, VirtualBox 등)
  <br>
  
  `,

  [
    "# zsh / oh-my-zsh 설치",
    "",
    "## 1. zsh, git, curl 설치",
    "### Ubuntu",
    "```bash",
    "sudo apt update",
    "sudo apt install -y zsh git curl",
    "chsh -s $(which zsh)",
    "```",
    "### MacOS",
    "```",
    "// 1. brew가 다운받아져 있지 않은 경우",
    '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
    "// 2. git 설치",
    "brew install git",
    "// 3. curl 설치",
    "brew install curl",
    "// 4. zsh 설치",
    "brew install zsh",
    "// 5. zsh 적용",
    "chsh -s $(which zsh)",
    "```",
    "",
    "## 2. oh-my-zsh 설치",
    "```bash",
    'sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"',
    "```",
  ].join("\n"),

  `# 기본적인 Ubuntu 사용법

## 파일 / 디렉토리
- \`pwd\`, \`ls\`, \`ls -al\`
- \`cd\`, \`cd ..\`, \`cd ~\`
- \`mkdir\`, \`touch\`, \`cp\`, \`mv\`, \`rm\`
- \`cat\`, \`less\`, \`head\`, \`tail\`

## 자주 사용하는 명령어
- \`sudo apt update\`, \`sudo apt install\`
- \`chmod +x\`
- \`grep\`, \`find\`
- \`file\`, \`strings\`
- \`gcc\`, \`gdb\``,

  `
  # Ubuntu 간단 실습
  <br>


  ### 실습용 디렉토리 만들기
  \`\`\`
  // 디렉토리 생성
  mkdir ./keeper-mentoring
  // 생성한 디렉토리로 이동
  cd ./keeper-mentoring
  \`\`\`
  ### 파일 생성하고 내용 확인하기
  \`\`\`
  // 파일 생성하기
  touch intro.txt hello.sh
  // 파일에 작성하기
  echo 'echo Hello, Keeper' > hello.sh
  \`\`\`
  ### 실행 권한 주고 스크립트 실행하기
  \`\`\`
  // 파일 권한 설정하기
  chmod +x hello.sh
  // 파일 실행하기 
  ./hello.sh
  // 파일 확인하기
  ls -al
  \`\`\`
  `,
];

export function Week1IntroToSecurityDeck() {
  return <MarkdownSlides slides={slides} />;
}
