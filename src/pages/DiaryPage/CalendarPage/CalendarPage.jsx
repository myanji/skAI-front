// src/pages/Diary/CalendarPage/CalendarPage.jsx
import { useEffect, useState } from "react";
import style from "./calendar-page.module.scss";
import Header from "../../../widgets/Header/Header";
import DiaryBtn from "../../../shared/ui/Button/DiaryBtn/DiaryBtn";
import next from "./next.png";
import prev from "./prev.png";
import api from "../../../shared/lib/api";
import DiaryPage from "../DiaryPage/DiaryPage";

const CalendarPage = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [dateColorMap, setDateColorMap] = useState({});

  // click 한 날짜의 상세 데이터를 여기에 저장
  const [detailData, setDetailData] = useState(null);

  const colorMap = {
    빨간색: "#FF8484",
    주황색: "#FFB770",
    노랑색: "#FFF383",
    연두색: "#B6F359",
    하늘색: "#94EAFF",
    보라색: "#DCB3FF",
    베이지색: "#F5E7CB",
  };

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        const res = await api.get("/api/diary/calendar");
        const map = {};
        res.data.forEach((item) => {
          map[item.date] = item.color;
        });
        setDateColorMap(map);
      } catch (err) {
        console.error("날짜 정보 불러오기 실패", err);
      }
    };
    fetchCalendar();
  }, []);

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

  // 달력에 보일 날짜 배열 생성
  const generateCalendarDays = () => {
    const year = currentYear;
    const month = currentMonth;

    const firstDayOfMonth = new Date(year, month, 1);
    const weekdayOfFirst = firstDayOfMonth.getDay();

    const lastDateOfMonth = new Date(year, month + 1, 0).getDate();
    const lastDateOfPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // 이전 달 날짜
    for (let i = weekdayOfFirst - 1; i >= 0; i--) {
      days.push({ date: lastDateOfPrevMonth - i, current: false, day: null });
    }

    // 이번 달 날짜
    for (let d = 1; d <= lastDateOfMonth; d++) {
      days.push({ date: d, current: true });
    }

    // 다음 달 날짜
    while (days.length % 7 !== 0) {
      const nextDay = days.length - (weekdayOfFirst + lastDateOfMonth) + 1;
      days.push({ date: nextDay, current: false });
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

  // 날짜 셀 클릭 시 호출
  const handleDateClick = async (dayObj) => {
    if (!dayObj.current) return; // 이번 달이 아니면 무시

    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(dayObj.date).padStart(2, "0");
    const fullDate = `${currentYear}-${mm}-${dd}`; // "YYYY-MM-DD"

    try {
      const res = await api.get("/api/diary/detail", {
        params: { date: fullDate },
      });
      // 응답 예시: { date, fixedContent, imageUrl, capturedImageUrl, color }
      setDetailData(res.data);
    } catch (err) {
      console.error("일기 상세 불러오기 실패:", err);
    }
  };

  // 뒤로 돌아가기: detailData를 null로 만들어 다시 달력 화면으로
  const handleBackToCalendar = () => {
    setDetailData(null);
  };

  // detailData가 있으면 달력 대신 DiaryPage 렌더
  if (detailData) {
    return (
      <DiaryPage
        date={detailData.date} // "YYYY-MM-DD"
        generatedText={detailData.fixedContent} // 고정된(보정된) 텍스트
        generatedImage={detailData.imageUrl} // 생성된 일기 이미지
        beforediary={detailData.capturedImageUrl} // 업로드 전 원본 이미지
        color={detailData.color} // "주황색" 등
        onBack={handleBackToCalendar} // 뒤로 돌아가는 함수
      />
    );
  }

  // 기본: 달력 화면
  return (
    <section className={style.layout}>
      <Header />
      <DiaryBtn />

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
              {daysArray.map((dayObj, idx) => {
                let fullDateStr = "";
                if (dayObj.current) {
                  const mm = String(currentMonth + 1).padStart(2, "0");
                  const dd = String(dayObj.date).padStart(2, "0");
                  fullDateStr = `${currentYear}-${mm}-${dd}`;
                }

                const isSelected =
                  dayObj.current && dateColorMap[fullDateStr] !== undefined;

                const bgColor = isSelected
                  ? colorMap[dateColorMap[fullDateStr]]
                  : "transparent";

                return (
                  <div
                    key={idx}
                    onClick={() => handleDateClick(dayObj)}
                    className={`
                      ${style["date-cell"]} 
                      ${
                        dayObj.current
                          ? style["current-day"]
                          : style["other-month-day"]
                      } 
                      ${isSelected && dayObj.current ? style["select"] : ""}
                    `}
                    style={{
                      "--select-color": bgColor,
                    }}
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
