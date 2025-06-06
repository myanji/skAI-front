// src/pages/Diary/DiaryCreatePage/DiaryCreatePage.jsx
import DiaryBtn from "../../../shared/ui/Button/DiaryBtn/DiaryBtn";
import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import Header from "../../../widgets/Header/Header";
import style from "./diary-create-page.module.scss";

const colorMap = {
  빨간색: "#FCC8C8",
  주황색: "#FFD5AB",
  노랑색: "#FCF5AF",
  연두색: "#E7F8C7",
  하늘색: "#CDEFEF",
  보라색: "#E8CCEC",
  베이지색: "#F5E7CB",
};

const DiaryCreatePage = ({
  date,
  beforediary,
  generatedImage,
  generatedText,
  color,
}) => {
  const bgColor = colorMap[color] || "#F5E7CB";
  const displayDate = date.replace(/-/g, ".");

  return (
    <section className={style["diary-page"]}>
      <Header />
      <div className={style["diary-container"]}>
        <DiaryCard
          date={displayDate}
          beforediary={beforediary}
          image={generatedImage}
          style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
        />

        <DiaryCard
          date={displayDate}
          text={generatedText}
          image={generatedImage}
          style={{ backgroundColor: bgColor }}
        />
      </div>
    </section>
  );
};

export default DiaryCreatePage;
