import { useState } from "react";
import Header from "../../../widgets/Header/Header";
import DiaryBtn from "../../../shared/ui/Button/DiaryBtn/DiaryBtn";
import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import style from "./diary-page.module.scss";

const colorMap = {
  화남: "#FCC8C8",
  놀라움: "#FFD5AB",
  기쁨: "#FCF5AF",
  활기찬: "#E7F8C7",
  슬픔: "#CDEFEF",
  신비로움: "#E8CCEC",
  보통: "#F5E7CB",
};

const DiaryPage = ({
  date,
  generatedText,
  generatedImage,
  beforediary,
  color,
  onBack,
}) => {
  const [flipped, setFlipped] = useState(false);
  const displayDate = date.replace(/-/g, ".");
  const bgColor = colorMap[color] || "#F5E7CB";

  const handleCardClick = () => {
    setFlipped((prev) => !prev);
  };

  return (
    <section className={style["page-container"]}>
      <Header />
      <DiaryBtn onClick={onBack} />
      {/* <p className={style["message"]}>일기를 클릭해보세요!</p> */}

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
          <div className={style["flip-card-front"]}>
            <DiaryCard
              date={displayDate}
              text={generatedText}
              image={generatedImage}
              color={color}
              style={{ backgroundColor: bgColor }}
            />
          </div>

          <div className={style["flip-card-back"]}>
            <DiaryCard
              date={displayDate}
              beforediary={beforediary}
              image={generatedImage}
              color={color}
              style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryPage;
