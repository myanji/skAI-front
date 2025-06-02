import { useState } from "react";
import style from "./calendar-page.module.scss";
import Header from "../../../widgets/Header/Header";
import next from "./next.png";
import prev from "./prev.png";

const CalendarPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((y) => y - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((y) => y + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  // 현재 월에 해당하는 날짜 배열을 계산
  const generateCalendarDays = () => {
    const year = currentYear;
    const month = currentMonth;

    const firstDayOfMonth = new Date(year, month, 1);
    const weekdayOfFirst = firstDayOfMonth.getDay();

    // 이번 달, 지난 달의 마지막 날짜
    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // 이전 달 날짜 채우기
    for (let i = weekdayOfFirst - 1; i >= 0; i--) {
      days.push({
        date: lastDateOfPrevMonth - i,
        current: false,
      });
    }

    // 이번 달 날짜 채우기
    for (let d = 1; d <= lastDateOfMonth; d++) {
      days.push({
        date: d,
        current: true,
      });
    }

    // 다음 달 날짜 채우기
    while (days.length % 7 !== 0) {
      const nextDay = days.length - (weekdayOfFirst + lastDateOfMonth) + 1;
      days.push({
        date: nextDay,
        current: false,
      });
    }

    return days;
  };

  const daysArray = generateCalendarDays();

  const monthNames = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  return (
    <section className={style["layout"]}>
      <Header />
      <div className={style["calendar-section"]}>
        <h2 className={style["month-title"]}>
          {currentYear}년 {monthNames[currentMonth]}
        </h2>

        <main className={style["main-container"]}>
          <button className={style["nav-button"]} onClick={goToPrevMonth}>
            <img src={prev} alt="이전 달" />
          </button>
          <div className={style["calendar-container"]}>
            <div className={style["weekday-row"]}>
              {["일", "월", "화", "수", "목", "금", "토"].map((wd) => (
                <div key={wd} className={style["weekday-cell"]}>
                  {wd}
                </div>
              ))}
            </div>

            <div className={style["dates-grid"]}>
              {daysArray.map((dayObj, idx) => (
                <div
                  key={idx}
                  className={`${style["date-cell"]} ${
                    dayObj.current
                      ? style["current-day"]
                      : style["other-month-day"]
                  } ${style["select"]}`}
                >
                  {dayObj.date}
                </div>
              ))}
            </div>
          </div>

          <button className={style["nav-button"]} onClick={goToNextMonth}>
            <img src={next} alt="다음 달" />
          </button>
        </main>
      </div>
    </section>
  );
};

export default CalendarPage;
