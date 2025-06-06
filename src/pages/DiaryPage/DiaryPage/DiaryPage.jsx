// src/pages/Diary/DiaryPage/DiaryPage.jsx
import { useState } from "react";
import Header from "../../../widgets/Header/Header";
import DiaryBtn from "../../../shared/ui/Button/DiaryBtn/DiaryBtn";
import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import style from "./diary-page.module.scss";

const colorMap = {
  빨간색: "#FCC8C8",
  주황색: "#FFD5AB",
  노랑색: "#FCF5AF",
  연두색: "#E7F8C7",
  하늘색: "#CDEFEF",
  보라색: "#E8CCEC",
  베이지색: "#F5E7CB",
};

const DiaryPage = ({
  date, // "2025-06-06"
  generatedText, // fixedContent
  generatedImage, // imageUrl
  beforediary, // capturedImageUrl
  color, // "주황색" 등
  onBack, // 뒤로 가기 함수
}) => {
  const [flipped, setFlipped] = useState(false);

  // "YYYY-MM-DD" → "YYYY.MM.DD"
  const displayDate = date.replace(/-/g, ".");

  // color → hex 배경색
  const bgColor = colorMap[color] || "#F5E7CB";

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <section className={style["page-container"]}>
      <Header />
      <DiaryBtn onClick={onBack} />
      <p className={style["message"]}>일기를 클릭해보세요!</p>

      {/* 플립 카드 */}
      <div
        className={style["flip-card"]}
        onClick={handleCardClick}
        style={{ cursor: "pointer" }}
      >
        <div
          className={`${style["flip-card-inner"]} ${
            flipped ? style["flipped"] : ""
          }`}
        >
          {/* 앞면: 보정 텍스트 + 생성된 이미지 */}
          <div className={style["flip-card-front"]}>
            <DiaryCard
              date={displayDate}
              text={generatedText}
              image={generatedImage}
              style={{ backgroundColor: bgColor }}
            />
          </div>

          {/* 뒷면: 원본 업로드 이미지 */}
          <div className={style["flip-card-back"]}>
            <DiaryCard
              date={displayDate}
              beforediary={beforediary}
              image={generatedImage}
              style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryPage;
