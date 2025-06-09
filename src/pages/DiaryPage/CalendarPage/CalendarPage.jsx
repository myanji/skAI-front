// src/pages/Diary/CalendarPage/CalendarPage.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./calendar-page.module.scss";
import next from "./next.png";
import prev from "./prev.png";
import api from "../../../shared/lib/api";

const CalendarPage = () => {
  const navigate = useNavigate();

  // 오늘 정보
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth();
  const todayDate = String(today.getDate()).padStart(2, "0");
  const todayFullDate = `${todayYear}-${String(todayMonth + 1).padStart(
    2,
    "0"
  )}-${todayDate}`;

  // 캘린더 상태
  const [currentYear, setCurrentYear] = useState(todayYear);
  const [currentMonth, setCurrentMonth] = useState(todayMonth);
  const [dateColorMap, setDateColorMap] = useState({});

  const colorMap = {
    화남: "#FF8484",
    놀라움: "#FFB770",
    기쁨: "#FFF383",
    활기찬: "#B6F359",
    슬픔: "#94EAFF",
    신비로움: "#DCB3FF",
    보통: "#F5E7CB",
  };

  useEffect(() => {
    api
      .get("/api/diary/calendar")
      .then((res) => {
        const map = {};
        res.data.forEach((item) => {
          map[item.date] = item.color;
        });
        setDateColorMap(map);
      })
      .catch((err) => console.error("날짜 정보 불러오기 실패", err));
  }, []);

  // 이전/다음 달
  const goToPrevMonth = () =>
    currentMonth === 0
      ? (setCurrentYear((y) => y - 1), setCurrentMonth(11))
      : setCurrentMonth((m) => m - 1);

  const goToNextMonth = () =>
    currentMonth === 11
      ? (setCurrentYear((y) => y + 1), setCurrentMonth(0))
      : setCurrentMonth((m) => m + 1);

  // 화면에 표시할 날짜 배열 생성
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const startWeekday = firstDay.getDay();
    const lastDateThis = new Date(currentYear, currentMonth + 1, 0).getDate();
    const lastDatePrev = new Date(currentYear, currentMonth, 0).getDate();

    const days = [];
    // 이전 달
    for (let i = startWeekday - 1; i >= 0; i--) {
      days.push({ date: lastDatePrev - i, current: false });
    }
    // 이번 달
    for (let d = 1; d <= lastDateThis; d++) {
      days.push({ date: d, current: true });
    }
    // 다음 달
    while (days.length % 7 !== 0) {
      days.push({
        date: days.length - (startWeekday + lastDateThis) + 1,
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

  // 날짜 클릭 핸들러
  const handleDateClick = async (dayObj) => {
    if (!dayObj.current) return;
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(dayObj.date).padStart(2, "0");
    const fullDate = `${currentYear}-${mm}-${dd}`;

    if (dateColorMap[fullDate]) {
      // 이미 작성된 일기
      navigate(`/Diary/${fullDate}`, { state: { date: fullDate } });
    } else {
      // 빈 날짜 -> 작성 모드로 이동
      navigate("/Diary/create", { state: { date: fullDate } });
    }
  };

  // 기본 캘린더 모드
  return (
    <section className={style.layout}>
      <div className={style["calendar-section"]}>
        {/* 이번 달이면 highlightMonth */}
        <h2
          className={`${style["month-title"]} ${
            currentYear === todayYear && currentMonth === todayMonth
              ? style.highlightMonth
              : ""
          }`}
        >
          {currentYear}년 {monthNames[currentMonth]}
        </h2>
        <p>날짜를 선택하여 일기를 작성해보세요!</p>
        <p>일기를 작성했다면 작성한 날짜에 표시됩니다.</p>
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
              {daysArray.map((dayObj, idx) => {
                const mm = String(currentMonth + 1).padStart(2, "0");
                const dd = String(dayObj.date).padStart(2, "0");
                const fullDateStr = dayObj.current
                  ? `${currentYear}-${mm}-${dd}`
                  : "";
                const isSelected = dayObj.current && dateColorMap[fullDateStr];
                const bgColor = isSelected
                  ? colorMap[dateColorMap[fullDateStr]]
                  : "transparent";
                const isToday = fullDateStr === todayFullDate;

                return (
                  <div
                    key={idx}
                    className={`
                      ${style["date-cell"]}
                      ${
                        dayObj.current
                          ? style["current-day"]
                          : style["other-month-day"]
                      }
                      ${isSelected ? style.select : ""}
                      ${isToday ? style.today : ""}
                    `}
                    style={{ "--select-color": bgColor }}
                    onClick={() => handleDateClick(dayObj)}
                  >
                    {dayObj.date}
                  </div>
                );
              })}
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
