import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import Header from "../../../widgets/Header/Header";
import style from "./diary-create-page.module.scss";

const colorMap = {
  화남: "#FCC8C8",
  놀라움: "#FFD5AB",
  기쁨: "#FCF5AF",
  활기찬: "#E7F8C7",
  슬픔: "#CDEFEF",
  신비로움: "#E8CCEC",
  보통: "#F5E7CB",
};

const DiaryCreatePage = ({
  date,
  beforediary,
  image,
  generatedText,
  color,
}) => {
  const bgColor = colorMap[color] || "#F5E7CB";
  const displayDate = date.replace(/-/g, ".");

  return (
    <section className={style["diary-page"]}>
      <div className={style["diary-container"]}>
        <DiaryCard
          date={displayDate}
          beforediary={beforediary}
          image={image}
          color={color}
          style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
        />

        <DiaryCard
          date={displayDate}
          text={generatedText}
          image={image}
          color={color}
          style={{ backgroundColor: bgColor }}
        />
      </div>
    </section>
  );
};

export default DiaryCreatePage;
