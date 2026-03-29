import { MarkdownSlides } from "@/components/markdown-slides";

const slides = [
  `# 2주차. C 언어와 포인터
  <br>
  
  첫 주차는 멘토링 운영 방식을 맞추고, 전체 커리큘럼을 함께 점검한 뒤 각자 실습 환경을 준비하는 시간입니다.
  <br>
  <br>

  ## 목표
  <br>

  - 메모리 구조 이해하기 
  - C 언어 익숙해지기
  - 포인터 활용하는 방법 익히기`,

  `# 오늘 멘토링 내용
  <br>

  ## 변수와 메모리 개념
  <br>

  ## C 핵심 개념 
  <br>

  ## C의 포인터
  <br>

  ## 실습`,

  `# 왜 C언어인가?
  <br>

  ## C는
  - 가장 기본적인 프로그래밍 언어
  - 메모리를 직접 다룰 수 있는 언어 
  
     ➡︎ 취약점이 발생하는 이유

  <br> 
  <br>

  ## 시스템 해킹은 
  - 메모리를 직접 건드리는 것

  `,

  `# 메모리 구조
  <br>

  ## 프로그램이 실행된 후 메모리 구조
  <br> 

  \`\`\`
  높은 주소 ↑
  ┌─────────────┐
  │    Stack    │  ← 지역변수, 함수 호출 정보  (BOF가 여기서 일어남!)
  ├─────────────┤
  │    Heap     │  ← 동적 할당 (malloc)
  ├─────────────┤
  │    BSS      │  ← 초기화 안 된 전역변수
  ├─────────────┤
  │    Data     │  ← 초기화된 전역변수
  ├─────────────┤
  │    Text     │  ← 실행 코드 (읽기 전용)
  낮은 주소 ↓
  \`\`\`
  `,

  `# C 핵심 개념 1
  <br>

  ## 변수와 메모리
  <br> 

  - 변수 : 변수 이름 + 값 + 주소

  \`\`\`c
  #include <stdio.h>

  int main() {
    int a = 10;                  // 메모리 어딘가에 4바이트 공간을 잡고 10을 저장
    char b = 'A';                // 1바이트
    char str[8] = "hello";       // 8바이트짜리 배열

    printf("a의 값: %d\\n", a);
    printf("a의 주소: %p\\n", &a); // & = 주소를 가져오는 연산자
    return 0;
  }
  \`\`\`

  `,

  `# C 핵심 개념 2
  <br> 

  ## 배열과 메모리 배치
  <br> 

  - C 코드 
  \`\`\`c
  char buf[8] = "AAAA";
  \`\`\`

  - 메모리 내부
  \`\`\`
  주소:     0x100  0x101  0x102  0x103  0x104  0x105  0x106  0x107
  값:        'A'    'A'    'A'    'A'    '\\0'    ?      ?      ?
  \`\`\`
  `,

  `# C 핵심 개념 3
  <br>
  
  ## 함수와 스택 프레임
  <br> 

  \`\`\`c
  void greet(char *name) {
    char buf[16];
    // 이 함수가 실행되는 동안 스택에 buf가 올라옴
    printf("Hello, %s\\n", name);
  } // 함수가 끝나면 스택에서 사라짐

  int main() {
    greet("Alice");
    return 0;
  }
  \`\`\`

  - 메모리 내부
  \`\`\`
  greet() 호출 전        greet() 실행 중
  ┌───────────┐         ┌───────────┐
  │  main()   │         │  buf[16]  │  ← greet의 지역변수
  │  지역변수   │         │  SFP      │  ← 이전 스택 포인터
  └───────────┘         │  RET addr │  ← 돌아갈 주소 (★BOF 핵심)
                        ├───────────┤
                        │  main()   │
                        └───────────┘
  \`\`\`
  
  `,

  `# 포인터 1
  <br>
  
  ## 포인터란?
  <br>

  \`\`\`
  변수 a:  [값: 10]  → 주소: 0x1000

  포인터 p: [값: 0x1000]  → 주소: 0x2000
            ↑ 다른 변수의 주소를 값으로 가짐
  \`\`\`
  
  - C 코드
  \`\`\`
  int a = 10;
  int *p;      // int형 포인터 선언 (주소를 저장하는 변수)

  p = &a;      // p에 a의 주소를 저장

  printf("%d\\n", a);    
  printf("%p\\n", &a);   
  printf("%p\\n", p);    
  printf("%d\\n", *p);  
  printf("%p\\n, &p); 
  \`\`\`
 
  `,

  `# 포인터 2
  <br>
  
  ## 포인터로 값 바꾸기
  <br>

  - C 코드
  \`\`\`
  int a = 10;
  int *p = &a;

  *p = 99;   // p가 가리키는 곳(= a)의 값을 99로 변경

  printf("%d\\n", a);   
  \`\`\`
  `,

  `# 포인터 3
  <br>
  
  ## 배열과 포인터
  <br>

  \`\`\`
  char buf[8] = "Hello";

  // 아래 두 줄은 같음
  char *p = buf;       // buf = 배열의 시작 주소
  char *p = &buf[0];   // 첫 번째 원소의 주소

  // 포인터 계산
  printf("%c\\n", *p);       
  printf("%c\\n", *(p+1));   
  printf("%c\\n", *(p+2));   
  \`\`\`

  - 메모리 내부 
  \`\`\`
  p → [H][e][l][l][o][\\0][ ][ ]
      +0  +1  +2  +3  +4  +5

  \`\`\`
  `,

  `# 실습 1
  <br>
  
  ## 포인터 기본
  <br>

  \`\`\`
  #include <stdio.h>

  int main() {
    int x = 100;
    int *ptr = &x;

    printf("x의 값: %d\\n", x);
    printf("x의 주소: %p\\n", &x);
    printf("ptr의 값(=x의 주소): %p\\n", ptr);
    printf("ptr이 가리키는 값: %d\\n", *ptr);

    *ptr = 777;   // 포인터로 x 값 변경
    printf("변경 후 x: %d\\n", x);

    return 0;
  }
  \`\`\`

  `,

  `# 실습 2
  <br>
  
  ## 배열과 포인터
  <br>

  \`\`\`
  #include <stdio.h>

  int main() {
    char buf[8] = "Hello";
    char *p = buf;

    printf("=== 배열로 접근 ===\\n");
    for (int i = 0; i < 5; i++) {
        printf("buf[%d] = %c (주소: %p)\\n", i, buf[i], &buf[i]);
    }

    printf("\\n=== 포인터로 접근 ===\\n");
    for (int i = 0; i < 5; i++) {
        printf("*(p+%d) = %c (주소: %p)\\n", i, *(p+i), p+i);
    }

    return 0;
  }
  \`\`\`

  `,

  `# 실습 3
  <br>
  
  ## 메모리 주소 관찰
  <br>

  \`\`\`
  #include <stdio.h>

  void vulnerable() {
    char buf[8];
    int secret = 0;

    printf("함수 내부 변수 주소 확인:\\n");
    printf("buf 주소:    %p\\n", buf);
    printf("secret 주소: %p\\n", &secret);
    printf("주소 차이:   %ld 바이트\\n", (long)&secret - (long)buf);
  }

  int main() {
    vulnerable();
    return 0;
  }
  \`\`\`

  `,

  `# 과제 1
  <br>

  ## 메모리 들여다보기
  <br> 
  
  - 아래 코드를 보고 출력 결과를 예측한 뒤 실제로 실행 후 비교해보기
  \`\`\`
  #include <stdio.h>

  int main() {
    int arr[4] = {0x41, 0x42, 0x43, 0x44};
    char *p = (char *)arr;

    for (int i = 0; i < 16; i++) {
      printf("p+%2d | 주소: %p | 값(hex): %02x | 값(char): %c\\n",
        i, p+i, (unsigned char)*(p+i), *(p+i));
    }
    return 0;
  }
  \`\`\`

  - Q1. \`int arr[4]\`는 총 몇 바이트를 차지하는가?
  - Q2. \`char *p = (char *)arr\` 문장의 의미는 무엇인가?
  - Q3. 0x41, 0x42, 0x43, 0x44가 메모리에 저장될 때 순서가 어떻게 되는가?
  
  `,

  `# 과제 1
  <br>

  ## 메모리 들여다보기
  <br> 
  
  - Q4. \`int *\`로 선언한 포인터와 \`char *\`로 선언한 포인터에서 \`p+1\` 의미가 어떻게 다른가? <br>
       아래 코드 출력 결과를 비교하면서 설명하기
  \`\`\`
  // 케이스 A
  int arr[4] = {1, 2, 3, 4};
  int *p = arr;
  printf("%p\\n", p);
  printf("%p\\n", p+1);   // 얼마나 증가?

  // 케이스 B
  int arr[4] = {1, 2, 3, 4};
  char *p = (char *)arr;
  printf("%p\\n", p);
  printf("%p\\n", p+1);   // 얼마나 증가?
  \`\`\`
  `,

  `
  # 과제 2 
  <br>

  ## 포인터로 함수 바꿔치기 하기
  <br> 

  ### 배경 설명
  C에서는 함수도 메모리 어딘가에 저장된다. <br>
  함수의 시작 주소가 존재하고 그 주소를 포인터에 저장할 수 있다. <br>
  이것을 함수 포인터라고 한다.
  
  ### 문제 
  - 다음 장의 코드에서 \`main\`을 절대 수정하지 말고 \`???\` 부분만 완성하여 출력이 목표 결과와 같아지게 만들기
  - 코드를 완성하고 아래 질문에 답하기
  - Q1. \`void (*func_table[2])()\`의 선언을 한 단계씩 분해해서 설명해라.
  - Q2. \`void (**fp)()\`에서 \`**\`가 두 개인 이유는 무엇인가?
  - Q3. \`fp++\`가 실행됐을 때 주소가 몇 바이트 이동하는가? 그리고 그 이유는 무엇인가?

  
  ### 목표 출력
  \`\`\`
  Hello, World!
  Hacked!
  \`\`\`
  `,

  `
  # 과제 2 
  <br>

  \`\`\`c
  #include <stdio.h>

  void say_hello() {
    printf("Hello, World!\\n");
  }
  void say_hacked() {
    printf("Hacked!\\n");
  }

  int main() {
    // 함수 포인터 배열 선언
    void (*func_table[2])() = {say_hello, say_hacked};

    // 수정 불가 구간 시작
    int key = 0;
    void (**fp)() = ???;

    (*fp)();
    fp++;
    (*fp)();
    // 수정 불가 구간 끝

    return 0;
  }
  \`\`\`
  `,
];

export function Week2CPointerDeck() {
  return <MarkdownSlides slides={slides} />;
}
