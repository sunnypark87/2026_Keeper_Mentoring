const mentoringSchedule = [
  {
    month: "3월",
    calendar: [
      [1, 2, 3, 4, 5, 6, 7],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31, null, null, null, null],
    ],
    entries: {
      23: "1주차",
      30: "2주차",
    },
  },
  {
    month: "4월",
    calendar: [
      [null, null, null, 1, 2, 3, 4],
      [5, 6, 7, 8, 9, 10, 11],
      [12, 13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24, 25],
      [26, 27, 28, 29, 30, null, null],
    ],
    entries: {
      27: "3주차",
    },
  },
  {
    month: "5월",
    calendar: [
      [null, null, null, null, null, 1, 2],
      [3, 4, 5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14, 15, 16],
      [17, 18, 19, 20, 21, 22, 23],
      [24, 25, 26, 27, 28, 29, 30],
      [31, null, null, null, null, null, null],
    ],
    entries: {
      4: "4주차",
      11: "5주차",
      18: "6주차",
      25: "7주차",
    },
  },
];

const curriculum = [
  {
    week: "1주차",
    title: "학습 환경 설정 & 리눅스 기초",
    points: [
      "인사 및 앞으로의 멘토링 방향 논의",
      "리눅스 환경 설정",
    ],
  },
  {
    week: "2~3주차",
    title: "C 언어와 메모리 구조",
    points: [
      "포인터와 주소 개념 이해",
      "메모리 영역 이해",
    ],
  },
  {
    week: "4주차",
    title: "CPU와 어셈블리 기초",
    points: [
      "CPU 레지스터의 역할과 동작 이해",
      "함수 호출 구조 분석",
      "어셈블리 기본 명령어 학습",
    ],
  },
  {
    week: "5~6주차",
    title: "버퍼 오버플로우 (BOF)",
    points: [
      "버퍼 오버플로우 개념 이해",
      "스택 메모리 덮어쓰는 방법 학습",
      "버퍼 오버플로우 실습",
    ],
  },
  {
    week: "7주차",
    title: "보호 기법",
    points: [
      "Stack Canary, NX, ASLR 개념과 원리 이해",
      "워게임 문제 풀이",
    ],
  },
];

const curriculumColumns = [curriculum.slice(0, 3), curriculum.slice(3)];

export function Week1IntroToSecurityDeck() {
  return (
    <>
      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-600">
            Week 1
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-slate-900">
            학습 환경 설정 & 리눅스 기초
          </h1>
          <p className="max-w-4xl text-2xl leading-relaxed text-slate-600">
            첫 주차는 멘토링 운영 방식을 맞추고, 전체 커리큘럼을 함께 점검한
            뒤 각자 실습 환경을 준비하는 시간입니다.
          </p>

          <div className="grid grid-cols-3 gap-4">
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                Goal 1
              </p>
              <p className="mt-3 text-xl leading-8 text-slate-700">
                멘토링 일정과 진행 방식을 확정한다
              </p>
            </article>
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                Goal 2
              </p>
              <p className="mt-3 text-xl leading-8 text-slate-700">
                커리큘럼을 확인한다
              </p>
            </article>
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                Goal 3
              </p>
              <p className="mt-3 text-xl leading-8 text-slate-700">
                각자 운영체제에 맞는 실습 환경 구성을 정한다
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            오늘 할 것들 요약
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <article className="slide-panel fragment">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                01
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                인사 및 멘토 / 멘티 소개
              </p>
            </article>
            <article className="slide-panel fragment">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                02
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                멘토링 일정 확정
              </p>
            </article>
            <article className="slide-panel fragment">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                03
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                커리큘럼 점검
              </p>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                멘티들 수준 점검, 의견 종합
              </p>
            </article>
            <article className="slide-panel fragment">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                04
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                환경설정
              </p>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-8 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            멘토링 일정
          </h2>

          <div className="schedule-calendar-grid">
            {mentoringSchedule.map((month) => (
              <article key={month.month} className="slide-panel calendar-panel">
                <div className="calendar-month-title">{month.month} 2026</div>

                <div className="calendar-table">
                  <div className="calendar-weekdays">
                    {["일", "월", "화", "수", "목", "금", "토"].map(
                      (day) => (
                        <span key={day}>{day}</span>
                      ),
                    )}
                  </div>

                  <div className="calendar-grid">
                    {month.calendar.flat().map((day, index) => {
                      const weekLabel = day
                        ? month.entries[day as keyof typeof month.entries]
                        : undefined;

                      return (
                        <div
                          key={`${month.month}-${day ? `day-${day}` : `empty-${index}`}`}
                          className={`calendar-day ${day ? "" : "is-empty"} ${
                            weekLabel ? "is-session" : ""
                          }`}
                        >
                          {day ? (
                            <>
                              <span className="calendar-date">{day}</span>
                              {weekLabel ? (
                                <span className="calendar-badge">
                                  {weekLabel}
                                </span>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="curriculum-section">
        <div className="curriculum-slide mx-auto flex max-w-6xl flex-col gap-4 text-left">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
            멘토링 커리큘럼
          </h2>

          <div className="curriculum-split">
            {curriculumColumns.map((column, columnIndex) => (
              <section key={`column-${columnIndex}`} className="curriculum-column-panel">
                <p className="curriculum-column-title">
                  {columnIndex === 0 ? "1~4주차" : "5~7주차"}
                </p>
                <div className="curriculum-column">
                {column.map((item) => (
                  <article key={item.week} className="curriculum-card">
                    <div className="curriculum-card-head">
                      <div className="curriculum-week">{item.week}</div>
                      <h3 className="text-xl font-semibold text-slate-900">
                        {item.title}
                      </h3>
                    </div>
                    <ul className="curriculum-points mt-2 slide-list text-base text-slate-700">
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            시스템 해킹이란?
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                Overview
              </p>
              <p className="mt-4 text-2xl leading-relaxed text-slate-700">
                시스템 해킹은 프로그램이 메모리와 CPU를 어떻게 사용하는지
                이해하고, 그 과정에서 생길 수 있는 취약점을 분석해 원하는
                동작을 이끌어내는 분야입니다.
              </p>
              <p className="mt-4 text-lg leading-8 text-slate-600">
                단순히 문제를 푸는 것보다, 입력이 어떻게 처리되고 함수 호출과
                메모리 배치가 어떻게 이어지는지를 읽는 힘이 중요합니다.
              </p>
            </article>

            <div className="flex flex-col gap-4">
              <article className="slide-panel">
                <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Learn 1
                </p>
                <p className="mt-3 text-xl leading-8 text-slate-700">
                  리눅스 환경, C 언어, 메모리 구조를 바탕으로 프로그램이
                  어떻게 동작하는지 이해합니다.
                </p>
              </article>
              <article className="slide-panel">
                <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Learn 2
                </p>
                <p className="mt-3 text-xl leading-8 text-slate-700">
                  CPU 레지스터, 함수 호출, 어셈블리 명령어를 통해 실행 흐름을
                  추적하는 방법을 익힙니다.
                </p>
              </article>
              <article className="slide-panel">
                <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Learn 3
                </p>
                <p className="mt-3 text-xl leading-8 text-slate-700">
                  버퍼 오버플로우와 보호 기법을 배우면서 실제 취약점 분석의
                  기본 감각을 익힙니다.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            Ubuntu 설치
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                Windows
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                WSL2 + Ubuntu 권장
              </p>
              <ul className="mt-4 slide-list text-lg text-slate-700">
                <li>관리자 PowerShell 실행</li>
                <li>`wsl --install`로 WSL 기본 설치</li>
                <li>`wsl --install -d Ubuntu`로 Ubuntu 지정 설치 가능</li>
                <li>대안으로 Docker Desktop 사용 가능</li>
              </ul>
            </article>

            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                MacOS
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-900">
                Multipass 또는 Docker
              </p>
              <ul className="mt-4 slide-list text-lg text-slate-700">
                <li>Ubuntu 환경이 필요하면 Multipass 사용 권장</li>
                <li>`multipass launch --name keeper-ubuntu`</li>
                <li>`multipass shell keeper-ubuntu`</li>
                <li>간단한 쉘 실습만 하면 기본 터미널도 가능</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            zsh / oh-my-zsh 설치
          </h2>

          <div className="slide-panel">
            <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
              Ubuntu inside WSL / VM
            </p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <p className="text-lg font-semibold text-slate-900">
                  1. zsh, git, curl 설치
                </p>
                <pre className="setup-command">
sudo apt update
sudo apt install -y zsh git curl
chsh -s $(which zsh)
                </pre>
              </div>

              <div>
                <p className="text-lg font-semibold text-slate-900">
                  2. oh-my-zsh 설치
                </p>
                <pre className="setup-command">
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto flex max-w-6xl flex-col gap-6 text-left">
          <h2 className="text-4xl font-semibold tracking-tight text-slate-900">
            기본적인 Ubuntu 사용법
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                파일 / 디렉토리
              </p>
              <ul className="mt-4 slide-list text-lg text-slate-700">
                <li>`pwd`, `ls`, `ls -al` 현재 위치와 파일 보기</li>
                <li>`cd`, `cd ..`, `cd ~` 디렉토리 이동</li>
                <li>`mkdir`, `touch` 생성</li>
                <li>`cp`, `mv`, `rm`, `rm -r` 복사/이동/삭제</li>
                <li>`cat`, `less`, `head`, `tail` 파일 내용 보기</li>
              </ul>
            </article>

            <article className="slide-panel">
              <p className="text-base font-semibold uppercase tracking-[0.2em] text-amber-600">
                실습 때 자주 쓰는 것
              </p>
              <ul className="mt-4 slide-list text-lg text-slate-700">
                <li>`sudo apt update`, `sudo apt install` 패키지 설치</li>
                <li>`chmod +x` 실행 권한 주기</li>
                <li>`grep`, `find` 검색</li>
                <li>`file`, `strings` 바이너리 정보 확인</li>
                <li>`gcc`, `gdb` 컴파일과 디버깅</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
