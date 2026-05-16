import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 6주차. BOF 보호 기법
  <br>

  지난 주차까지는 Buffer Overflow가 어떻게 발생하고 exploit으로 이어지는지 봤습니다.
  이번 주차에서는 현대 시스템이 BOF를 어떻게 막거나 어렵게 만드는지 정리합니다.
  <br>
  <br>

  ## 목표
  <br>

  - BOF 보호 기법이 막으려는 공격 지점 이해하기
  - Canary, NX, ASLR, PIE, RELRO의 역할 구분하기
  - FORTIFY_SOURCE, CFI, Shadow Stack 같은 현대 방어 기법 감 잡기
  - checksec 결과를 보고 바이너리의 보호 상태 해석하기`,

  `# 오늘 멘토링 내용
  <br>

  ## BOF 공격 흐름 복습
  <br>

  ## 취약한 코드를 작성하지 않는 방법
  <br>

  ## Stack Canary
  <br>

  ## NX / DEP
  <br>

  ## ASLR / PIE
  <br>

  ## 추가로 알아둘 보호 기법
  <br>

  ## checksec로 보호 기법 확인하기`,

  `# BOF 공격 흐름 복습
  <br>

  ## 공격자가 원하는 것
  <br>

  - 버퍼보다 긴 입력을 넣는다
  - 스택의 다른 값을 덮는다
  - 프로그램 흐름을 원하는 위치로 바꾼다
  - 최종적으로 쉘 실행, flag 읽기, 함수 호출 등을 노린다

  <br>

  ## 대표적으로 덮는 값
  <br>

  - 인접한 지역변수
  - saved EBP / saved RBP
  - return address
  - 함수 포인터
  - GOT entry`,

  `# BOF 보호 기법의 관점
  <br>

  ## 보호 기법은 취약점을 없애는 것이 아니다
  <br>

  - 취약한 코드가 있으면 BOF 자체는 여전히 발생할 수 있음
  - 대신 exploit으로 이어지는 과정을 끊거나 어렵게 만듦

  <br>

  ## 방어 지점
  <br>

  | 공격 단계 | 보호 기법 |
  |----------|-----------|
  | return address 덮기 | Stack Canary, Shadow Stack |
  | 스택에 넣은 코드 실행 | NX / DEP |
  | libc, stack 주소 예측 | ASLR / PIE |
  | GOT overwrite | RELRO |
  | 위험한 함수 사용 | FORTIFY_SOURCE |
  | 비정상적인 간접 분기 | CFI / CFG / PAC |`,

  `# 취약한 코드를 작성하지 않는 방법
  <br>

  ## 가장 먼저 할 방어
  <br>

  - 보호 기법은 exploit을 어렵게 만드는 장치
  - 하지만 가장 좋은 방어는 **애초에 버퍼를 넘겨 쓰지 않는 코드**를 작성하는 것
  - 입력/복사/출력 함수에는 항상 "버퍼 크기"가 같이 따라다녀야 함

  <br>

  ## 기본 원칙
  <br>

  - 버퍼 크기를 하드코딩하지 말고 \`sizeof(buf)\` 사용
  - 문자열은 마지막 \`\\0\` 공간을 남겨야 함
  - 함수 반환값을 확인해서 잘렸는지, 실패했는지 검사
  - 외부 입력은 길이와 형식을 모두 검증`,

  `# 입력 함수 안전하게 쓰기
  <br>

  ## 위험한 패턴
  <br>

  \`\`\`c
  char name[16];

  scanf("%s", name);     // 길이 제한 없음
  gets(name);            // 사용하면 안 됨
  \`\`\`

  - \`%s\` 는 공백 전까지 계속 읽음
  - 버퍼보다 긴 입력이 들어오면 BOF가 발생할 수 있음

  <br>

  ## 더 나은 패턴
  <br>

  \`\`\`c
  char name[16];

  scanf("%15s", name);             // 최대 15글자 + NULL
  fgets(name, sizeof(name), stdin); // 버퍼 크기 전달
  \`\`\`

  - \`char name[16]\` 이면 문자열 데이터는 최대 15바이트까지만 받기
  - \`fgets\` 는 개행이 남을 수 있으므로 필요하면 제거`,

  `# scanf_s 같은 secure 함수
  <br>

  ## scanf_s
  <br>

  \`\`\`c
  char name[16];

  scanf_s("%15s", name, (unsigned)sizeof(name));
  \`\`\`

  - \`scanf_s\` 는 \`%s\`, \`%c\`, \`%[\` 같은 입력에서 버퍼 크기를 추가 인자로 요구
  - MSVC 환경에서 자주 볼 수 있는 secure CRT 함수
  - 폭 지정자(\`%15s\`)와 버퍼 크기 인자를 같이 쓰는 습관이 좋음

  <br>

  ## 주의할 점
  <br>

  - \`scanf_s\` 계열은 모든 C 환경에서 똑같이 지원되는 것은 아님
  - Linux/glibc 기준으로는 \`fgets\`, 폭 지정 \`scanf\`, \`snprintf\` 같은 이식성 좋은 패턴을 더 자주 사용
  - 함수 이름에 \`_s\` 가 붙었다고 자동으로 안전해지는 것이 아니라, 크기 인자를 정확히 줘야 함`,

  `# 복사와 출력도 길이를 제한하기
  <br>

  ## 위험한 패턴
  <br>

  \`\`\`c
  char dst[32];

  strcpy(dst, src);
  sprintf(dst, "user=%s", name);
  \`\`\`

  - \`src\`, \`name\` 이 길면 \`dst\` 를 넘어서 쓸 수 있음

  <br>

  ## 더 나은 패턴
  <br>

  \`\`\`c
  char dst[32];

  strncpy(dst, src, sizeof(dst) - 1);
  dst[sizeof(dst) - 1] = '\\0';

  snprintf(dst, sizeof(dst), "user=%s", name);
  \`\`\`

  - 출력 가능한 최대 크기를 명시
  - \`strncpy\` 를 쓸 때는 마지막 NULL 종료를 직접 보장
  - 반환값으로 잘림 여부를 확인할 수 있음
  - \`read\`, \`recv\`, \`memcpy\` 도 목적지 버퍼 크기를 기준으로 길이를 제한해야 함`,

  `# Stack Canary
  <br>

  ## 핵심 아이디어
  <br>

  - return address 앞에 임의의 값인 **canary**를 둔다
  - 함수가 끝나기 전에 canary가 바뀌었는지 확인한다
  - 값이 바뀌었으면 stack smashing으로 보고 프로그램을 종료한다

  <br>

  ## 왜 이름이 Canary인가?
  <br>

  - 예전 광부들이 탄광의 유독가스를 빨리 감지하기 위해 카나리아를 데려간 것에서 온 비유
  - 카나리아가 먼저 이상 신호를 보이면 광부들이 위험을 알 수 있었음
  - Stack Canary도 return address가 실제로 사용되기 전에 먼저 손상되어 overflow를 알려주는 경고값

  <br>

  \`\`\`
  높은 주소
  [RET]
  [saved RBP]
  [canary]
  [buffer]
  낮은 주소
  \`\`\`

  - BOF로 RET까지 덮으려면 보통 canary도 같이 지나가야 함
  - canary 값을 모르면 정상적으로 RET overwrite를 하기 어려움`,

  `# Stack Canary
  <br>

  ## 컴파일러 옵션
  <br>

  \`\`\`bash
  gcc -fstack-protector-strong vuln.c -o vuln
  \`\`\`

  - GCC/Clang: \`-fstack-protector\`, \`-fstack-protector-strong\`, \`-fstack-protector-all\`
  - MSVC: \`/GS\`
  - 리눅스 배포판에서는 기본 빌드 옵션으로 들어가는 경우가 많음

  <br>

  ## 한계
  <br>

  - canary leak이 있으면 우회 가능
  - return address를 건드리지 않는 변수 overwrite는 막지 못할 수 있음
  - 모든 함수가 항상 보호되는 것은 아니며 컴파일 옵션에 따라 달라짐`,

  `# NX / DEP
  <br>

  ## 핵심 아이디어
  <br>

  - 스택이나 힙 같은 데이터 영역을 **실행 불가**로 표시한다
  - 공격자가 shellcode를 입력으로 넣어도 그 메모리를 실행할 수 없게 만든다

  <br>

  \`\`\`
  입력으로 shellcode 주입
        ↓
  return address를 shellcode 주소로 변경
        ↓
  NX enabled: 스택 실행 시도에서 crash
  \`\`\`

  - Linux에서는 NX bit
  - Windows에서는 DEP(Data Execution Prevention)라는 이름으로 자주 설명됨`,

  `# NX / DEP
  <br>

  ## 공격 방식의 변화
  <br>

  - 예전 방식: 스택에 shellcode를 넣고 그 주소로 점프
  - NX 이후: 이미 실행 가능한 코드 조각을 재사용

  <br>

  ## 대표적인 우회 방향
  <br>

  - ret2win: 바이너리 안의 win 함수로 이동
  - ret2libc: libc의 \`system("/bin/sh")\` 호출
  - ROP: 짧은 gadget을 이어 붙여 원하는 동작 만들기

  <br>

  → NX는 shellcode 실행을 막지만, code reuse 공격까지 완전히 막지는 못함`,

  `# ASLR
  <br>

  ## Address Space Layout Randomization
  <br>

  - 프로그램이 실행될 때마다 메모리 배치를 랜덤화한다
  - 스택, 힙, 공유 라이브러리, mmap 영역 등의 주소가 매번 달라질 수 있음

  <br>

  \`\`\`
  실행 1: libc base = 0x7ffff7c00000
  실행 2: libc base = 0x7ffff7800000
  실행 3: libc base = 0x7ffff7a00000
  \`\`\`

  - 공격자는 정확한 주소를 알아야 exploit을 안정적으로 만들 수 있음
  - ASLR은 그 주소 예측을 어렵게 만든다`,

  `# ASLR
  <br>

  ## Linux에서 확인
  <br>

  \`\`\`bash
  cat /proc/sys/kernel/randomize_va_space
  \`\`\`

  | 값 | 의미 |
  |----|------|
  | \`0\` | ASLR 비활성화 |
  | \`1\` | 일부 영역 랜덤화 |
  | \`2\` | 전체 랜덤화 |

  <br>

  ## 한계
  <br>

  - 주소 leak이 있으면 base address를 계산할 수 있음
  - 32-bit 환경은 랜덤화 공간이 좁아서 brute force 가능성이 커짐
  - 실행 파일 자체가 PIE가 아니면 main binary 주소는 고정일 수 있음`,

  `# PIE
  <br>

  ## Position Independent Executable
  <br>

  - 실행 파일 자체를 위치 독립적으로 만든다
  - ASLR이 main binary의 코드 영역까지 랜덤화할 수 있게 해 준다

  <br>

  \`\`\`bash
  gcc -fPIE -pie vuln.c -o vuln
  \`\`\`

  <br>

  ## PIE가 없으면?
  <br>

  - libc, stack은 랜덤화되어도 바이너리의 함수 주소는 고정될 수 있음
  - \`win()\`, \`main()\`, PLT 주소를 그대로 쓰는 exploit이 쉬워짐

  <br>

  → ASLR과 PIE는 같이 봐야 한다`,

  `# 추가로 알아둘 보호 기법
  <br>

  ## 이름과 역할만 먼저 익히기
  <br>

  | 기법 | 간단한 역할 |
  |------|-------------|
  | RELRO | GOT 같은 동적 링킹 관련 영역을 보호 |
  | FORTIFY_SOURCE | 일부 위험한 libc 함수 호출에 크기 검사 추가 |
  | CFI / CFG | 비정상적인 간접 함수 호출을 제한 |
  | Shadow Stack / CET | return address를 별도 stack과 비교해 변조 탐지 |
  | PAC | ARM 계열에서 포인터에 인증값을 붙여 변조 탐지 |
  | Sanitizer / Fuzzing | 개발 단계에서 메모리 버그와 crash를 찾는 도구 |

  <br>

  ## GOT만 짧게 이해하기
  <br>

  - GOT(Global Offset Table)는 외부 함수의 실제 주소를 저장하는 테이블
  - RELRO는 이 영역을 보호해 GOT overwrite를 어렵게 만드는 기법`,

  `# checksec로 확인하기
  <br>

  ## 바이너리 보호 상태 보기
  <br>

  \`\`\`bash
  checksec --file=./vuln
  \`\`\`

  <br>

  ## 자주 보는 항목
  <br>

  | 항목 | 의미 |
  |------|------|
  | Canary | Stack Canary 적용 여부 |
  | NX | 데이터 영역 실행 차단 여부 |
  | PIE | 실행 파일 주소 랜덤화 가능 여부 |
  | RELRO | GOT 보호 수준 |

  <br>

  - exploit을 시작하기 전에 먼저 확인하는 습관을 들이면 좋음
  - 보호 기법에 따라 풀이 방향이 크게 달라짐`,

  `# 정리
  <br>

  ## 오늘 기억할 것
  <br>

  - BOF 보호 기법은 exploit 과정을 단계별로 끊는다
  - Canary는 return address overwrite를 탐지한다
  - NX는 데이터 영역의 코드 실행을 막는다
  - ASLR과 PIE는 주소 예측을 어렵게 만든다
  - RELRO, FORTIFY_SOURCE, CFI, Shadow Stack, PAC 같은 추가 기법도 존재한다
  - 실습에서는 항상 checksec 결과부터 보고 전략을 세운다`,

  `# 참고 자료
  <br>

  ## 더 읽어볼 문서
  <br>

  - GCC Instrumentation Options: \`-fstack-protector-strong\`
  - GCC Link Options: \`-fPIE\`, \`-pie\`
  - Linux kernel: \`randomize_va_space\`
  - GNU ld Options: \`-z relro\`, \`-z now\`
  - glibc manual: \`_FORTIFY_SOURCE\`
  - Clang Control Flow Integrity
  - Microsoft Control Flow Guard
  - Linux x86 CET Shadow Stack
  - ARM Pointer Authentication`,
];

export function Week6BofMitigationDeck() {
  return <MarkdownSlides slides={slides} />;
}
