import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 3주차. Python 환경설정과 해킹 워게임
  <br>

  지난 주차 과제를 리뷰하고, Python 실습 환경을 완성한 뒤 드림핵을 통해 본격적인 워게임을 시작합니다.
  <br>
  <br>

  ## 목표
  <br>

  - 과제 피드백을 통해 포인터 개념 복습
  - Python venv + pwntools 환경 세팅 완료
  - Dreamhack 플랫폼 익히기
  - netcat / ssh 사용법 익히기`,

  `# 오늘 멘토링 내용
  <br>

  ## 과제 리뷰
  <br>

  ## Python 환경설정
  <br>

  ## Dreamhack 소개
  <br>

  ## welcome 문제 실습
  <br>

  ## 셸코드 이론 (셸코드 / 레지스터 / 어셈블리)`,

  `# 과제 리뷰
  <br>

  ## 과제 1 — 메모리 들여다보기
  <br>

  ## 과제 2 — 함수 포인터 배열`,

  `# Python 환경설정
  <br>

  ## 왜 venv인가?
  <br>

  - 시스템 Python을 건드리지 않고 프로젝트별로 독립된 패키지 환경 유지
  - 해킹 도구들은 버전 충돌이 잦음 → 격리가 필수

  \`\`\`bash
  # venv 생성
  python3 -m venv venv

  # 활성화 (Mac/Linux)
  source venv/bin/activate

  # 활성화 확인
  which python   # → .../venv/bin/python 이 나오면 OK
  \`\`\``,

  `# Python 환경설정
  <br>

  ## pwntools 설치
  <br>

  \`\`\`bash
  # venv 활성화 상태에서
  pip install pwntools
  \`\`\`

  - 설치 확인

  \`\`\`bash
  python -c "from pwn import *; print('pwntools OK')"
  \`\`\`

  - 비활성화할 때

  \`\`\`bash
  deactivate
  \`\`\``,

  `# pwntools 예제
  <br>

  ## 기본 기능 맛보기
  <br>

  \`\`\`python
  from pwn import *

  # 패킹 / 언패킹
  print(p32(0x41424344))   # b'DCBA'  (리틀 엔디안)
  print(p64(0xdeadbeef))
  print(u32(b'ABCD'))      # 0x44434241

  # 편리한 변환
  print(hex(u32(b'ABCD')))
  \`\`\`

  - \`p32\` / \`p64\` : 정수 → bytes (리틀 엔디안 패킹)
  - \`u32\` / \`u64\` : bytes → 정수 (언패킹)
  - BOF 익스플로잇을 작성할 때 매우 자주 씀`,

  `# 워게임 사이트 소개
  <br>

  ## 워게임이란?
  <br>

  - 해킹 실력을 키우기 위해 **취약한 서버나 문제를 직접 공격해서 flag를 획득**하는 온라인 연습 환경

  <br>

  ## 멘토링에서 사용할 사이트
  <br>

  - **[Dreamhack](https://dreamhack.io)** — 국내 최대 해킹 학습 플랫폼
    - 워게임 + 분야별 무료 강의 (시스템, 웹, 리버싱 등)
    - 강의 → 워게임 순서로 공부하는 게 가장 효율적

  - **[Root Me](https://www.root-me.org/?page=news&lang=en)** — 다양한 분야의 해킹 챌린지 플랫폼
    - 웹, 네트워크, 포렌식, 암호학 등 400개 이상의 문제

  <br>

  ## 과제에 사용할 사이트
  <br>

  - **[OverTheWire](https://overthewire.org/wargames/)** — SSH 기반 리눅스 워게임 (Bandit 추천)
  - **[pwnable.kr](https://pwnable.kr)** — 시스템 해킹 특화 워게임`,

  `# netcat (nc)
  <br>

  ## 네트워크의 cat
  <br>

  - TCP 소켓 연결을 터미널에서 직접 열어주는 도구
  - 내 키보드 입력 → 서버 전송 / 서버 응답 → 내 화면 출력
  - 워게임에서 **문제 서버에 연결**할 때 거의 항상 씀

  \`\`\`bash
  nc <host> <port>

  # 예시
  nc host1.dreamhack.games 12345
  \`\`\`

  <br>

  ## 동작 흐름
  <br>

  \`\`\`
  나 (터미널)          서버
      │   ──── 입력 ────▶  │  서버가 입력을 읽고 처리
      │   ◀─── 출력 ────   │  처리 결과를 내 화면에 출력
  \`\`\`

  - 서버가 연결을 끊으면 자동 종료 / 수동 종료: \`Ctrl + C\`
  - 연결 전 서버가 어떤 프로그램을 실행 중인지 모름 → 출력을 잘 읽어야 함`,

  `# SSH
  <br>

  ## Secure Shell
  <br>

  - 원격 서버에 **암호화된 터미널 세션**을 여는 프로토콜
  - nc와 달리 **로그인 인증** 후 실제 쉘(\`bash\` 등)을 사용할 수 있음
  - 서버 파일 시스템을 직접 탐색하고 프로그램을 실행할 수 있음

  \`\`\`bash
  ssh <user>@<host> -p <port>

  # 예시
  ssh guest@host1.dreamhack.games -p 22222
  \`\`\`

  <br>

  ## nc vs SSH 비교
  <br>

  | | nc | SSH |
  |---|---|---|
  | 인증 | 없음 | 아이디/비밀번호 or 키 |
  | 접속 후 | 프로그램 I/O만 연결 | 쉘 전체 사용 가능 |
  | 주 용도 | 바이너리 익스플로잇 | 서버 직접 탐색 |

  - 종료: \`exit\` 또는 \`Ctrl + D\``,

  `# pwntools로 원격 접속하기
  <br>

  ## remote() — nc 대신 pwntools로 연결
  <br>

  \`\`\`python
  from pwn import *

  # 서버에 TCP 연결 (nc host port 와 동일)
  r = remote("host1.dreamhack.games", 12345)

  r.recvline()          # 서버에서 한 줄 수신
  r.recvuntil(b": ")    # ": " 가 올 때까지 수신
  r.sendline(b"hello")  # 한 줄 전송 (\\n 자동 추가)
  r.send(b"hello")      # 그대로 전송 (\\n 없음)

  print(r.recv())       # 남은 데이터 수신
  r.interactive()       # 직접 키보드로 조작
  r.close()
  \`\`\`
  
  - \`interactive()\` : 자동화 대신 직접 입력이 필요할 때`,

  `# pwntools로 원격 접속하기
  <br>

  ## ssh() — SSH 접속 후 명령 실행
  <br>

  \`\`\`python
  from pwn import *

  # SSH 접속
  s = ssh(host="host1.dreamhack.games",
          port=22222,
          user="guest",
          password="guest")

  # 명령 실행 후 결과 받기
  r = s.run("cat /flag")
  print(r.recvall())

  # 특정 바이너리 실행하고 상호작용
  r = s.run("/challenge/binary")
  r.recvuntil(b": ")
  r.sendline(b"input")
  print(r.recvline())

  s.close()
  \`\`\`

  - \`recvall()\` : 연결이 끊길 때까지 모든 데이터 수신`,

  `# welcome 문제 실습
  <br>

  ## 드림핵 welcome 문제
  <br>

  1. https://dreamhack.io 회원가입 후 워게임 → \`welcome\` 입장
  2. 문제 설명에서 host / port 확인
  3. **pwntools로 접속해서 flag 출력**

  \`\`\`python
  from pwn import *

  r = remote("<host>", <port>)

  data = r.recvall()
  print(data.decode())

  r.close()
  \`\`\`

  4. 코드 실행 후 출력에서 flag 확인
  5. flag 형식 \`DH{...}\` 를 워게임 사이트에 제출

  <br>

  > **Tip** : 제출 후 nc로도 직접 접속해서 결과가 동일한지 비교해보기`,

  `# shell_basic 문제
  <br>

  ## 문제 소개
  <br>

  - **[shell_basic](https://dreamhack.io/wargame/challenges/410)** — 드림핵 셸코드 입문 문제
  - 서버에 셸코드를 전송하면 그대로 실행해 줌
  - 목표: 서버의 \`/home/shell_basic/flag_name_is_loooooong\` 파일을 읽어 flag 획득

  <br>

  ## 필요한 개념
  <br>

  - 셸코드(Shellcode)란 무엇인가
  - x86_64 레지스터 구조
  - 어셈블리 언어 기초
  - ORW(Open-Read-Write) 셸코드`,

  `# 셸코드란?
  <br>

  ## Shellcode
  <br>

  - CPU가 직접 실행할 수 있는 **기계어(바이트) 코드**
  - 보통 취약점을 통해 메모리에 주입한 뒤 실행시킴
  - 이름의 유래: 초기에는 주로 \`/bin/sh\` 셸을 띄우는 용도였기 때문

  \`\`\`python
  # week3_2.py 에서 셸코드를 bytes로 직접 조립
  shellcode = b""
  shellcode += b"\\x48\\xb8" + p64(val)   # mov rax, <값>
  shellcode += b"\\x50"                   # push rax
  # ...
  \`\`\``,

  `# 셸코드란?
  <br>

  ## 어셈블리 → 바이트 변환
  <br>

  - CPU는 어셈블리 문자열을 모름 → 실제로는 **1바이트씩 된 숫자(opcode)**를 실행
  - 어셈블러(assembler)가 어셈블리 명령어를 바이트로 변환해 줌

  | 어셈블리 | 바이트 | 설명 |
  |----------|--------|------|
  | \`mov rax, <값>\` | \`\\x48 \\xb8\` + 8바이트 | \`\\x48\` = REX.W (64비트 모드), \`\\xb8\` = MOV RAX opcode |
  | \`push rax\` | \`\\x50\` | PUSH RAX opcode |
  | \`xor rsi, rsi\` | \`\\x48 \\x31 \\xf6\` | REX.W + XOR opcode + rsi/rsi 피연산자 |
  | \`syscall\` | \`\\x0f \\x05\` | 커널 진입 opcode (항상 2바이트 고정) |

  <br>

  > \`\\x48\` (REX.W prefix) : x86_64에서 레지스터를 64비트로 쓰겠다는 신호
  > 이 prefix가 없으면 32비트 레지스터(\`eax\`, \`esi\` 등)로 동작`,

  `# 셸코드란?
  <br>

  ## 문제 해결 흐름
  <br>

  \`\`\`
  Python으로 shellcode 조립
        ↓
  pwntools remote()로 서버 전송
        ↓
  서버가 shellcode를 메모리에 올리고 실행
        ↓
  flag 파일을 읽어서 출력
  \`\`\``,

  `# x86_64 레지스터
  <br>

  ## 범용 레지스터 (64비트)
  <br>

  | 레지스터 | 주요 용도 |
  |----------|-----------|
  | \`rax\` | 함수 반환값, syscall 번호 |
  | \`rdi\` | 데이터를 옮길 때 목적지 |
  | \`rsi\` | 데이터 옮길 때 원본 |
  | \`rdx\` | 주된 용도 없음 |
  | \`rsp\` | 스택 포인터 (현재 스택 최상단 주소) |
  | \`rbp\` | 베이스 포인터 (스택 프레임 기준점) |
  | \`rip\` | 다음에 실행할 명령어 주소 |`,

  `# x86_64 레지스터
  <br>

  ## 커널(Kernel)이란?
  <br>

  - OS의 핵심으로, 하드웨어(CPU, 메모리, 디스크 등)를 직접 제어하는 소프트웨어
  - 일반 프로그램은 하드웨어에 **직접 접근할 수 없음** → 커널에 요청해야 함

  <br>

  ## syscall이란?
  <br>

  - 일반 프로그램이 커널에 서비스를 요청하는 **유일한 공식 창구**
  - 파일 읽기/쓰기, 프로세스 생성, 네트워크 연결 등 모두 syscall을 통해 처리

  \`\`\`
  [일반 프로그램]  →  syscall  →  [커널]  →  하드웨어
  \`\`\`

  <br>

  ## 호출 규약 (x86_64)
  <br>

  \`\`\`
  rax = syscall 번호   (어떤 기능을 요청할지)
  rdi = 1번째 인자
  rsi = 2번째 인자
  rdx = 3번째 인자
  → syscall 명령어 실행
  \`\`\``,

  `# 어셈블리 언어 기초
  <br>

  ## 주요 명령어
  <br>

  | 명령어 | 설명 | 예시 |
  |--------|------|------|
  | \`mov dst, src\` | src 값을 dst에 저장 | \`mov rax, 2\` |
  | \`push src\` | rsp를 8 감소시키고 src를 스택에 저장 | \`push rax\` |
  | \`pop dst\` | 스택에서 값을 꺼내 dst에 저장 | \`pop rdi\` |
  | \`xor dst, src\` | dst = dst XOR src (0으로 초기화할 때 자주 씀) | \`xor rsi, rsi\` |
  | \`syscall\` | 커널에 시스템 콜 요청 | \`syscall\` |

  <br>

  ## 예시 — rax를 0으로 초기화
  <br>

  \`\`\`asm
  xor rax, rax   ; rax = rax XOR rax = 0
                 ; mov rax, 0 보다 바이트 수가 적음 → 셸코드에서 선호
  \`\`\``,

  `# 어셈블리 언어 기초
  <br>

  ## push / pop 와 스택
  <br>

  \`\`\`
  [ push rax ]   rax = 0x4141  →  rsp가 8 감소하고 값을 스택에 저장

  실행 전                         실행 후
        0x7fec [ ???????? ]             0x7fec [ ???????? ] 
        0x7ff4 [ ???????? ]      rsp →  0x7ff4 [ 0x4141   ]  ← push된 값
  rsp → 0x7ffc [ ???????? ]             0x7ffc [ ???????? ]
  \`\`\`

  <br>

  \`\`\`
  [ pop rdi ]   스택 최상단 값을 rdi에 저장하고 rsp가 8 증가

  실행 전                         실행 후
        0x7fec [ ???????? ]            0x7fec [ ???????? ]  
  rsp → 0x7ff4 [ 0x4141   ]            0x7ff4 [ ???????? ]
        0x7ffc [ ???????? ]      rsp → 0x7ffc [ ???????? ]
                                 rdi = 0x4141
  \`\`\`

  - 스택은 **높은 주소 → 낮은 주소** 방향으로 자람
  - \`push\` 할수록 rsp는 감소, \`pop\` 할수록 rsp는 증가`,

  `# 과제 1 — OverTheWire Bandit (필수)
  <br>

  - **[OverTheWire Bandit (링크)](https://overthewire.org/wargames/bandit/)**
  - SSH로 접속해서 리눅스 명령어를 익히는 워게임
  - **Level 0 → Level 5** 까지 풀기

  \`\`\`bash
  # Level 0 접속 예시
  ssh bandit0@bandit.labs.overthewire.org -p 2220
  # 비밀번호: bandit0
  \`\`\`

  - 각 레벨에서 다음 레벨 비밀번호를 찾으면 클리어
  - 모르는 명령어는 \`man <명령어>\` 로 확인`,

  `# 과제 2 — pwnable.kr fd (선택)
  <br>

  - **[pwnable.kr fd (링크)](https://pwnable.kr/play.php)**
  - 파일 디스크립터(fd) 개념을 이용한 입문 문제
  - SSH로 접속해서 \`fd.c\` 파일 분석 혹은 바이너리 분석 후 flag 획득`,
];

export function Week3PythonPwnDeck() {
  return <MarkdownSlides slides={slides} />;
}
