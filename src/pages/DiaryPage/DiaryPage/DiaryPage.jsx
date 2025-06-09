// src/pages/Diary/DiaryPage/DiaryPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import style from "./diary-page.module.scss";
import api from "../../../shared/lib/api";

const colorMap = {
  화남: "#FCC8C8",
  놀라움: "#FFD5AB",
  기쁨: "#FCF5AF",
  활기찬: "#E7F8C7",
  슬픔: "#CDEFEF",
  신비로움: "#E8CCEC",
  보통: "#F5E7CB",
};

const DiaryPage = () => {
  const { date } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    api
      .get("/api/diary/detail", { params: { date } })
      .then((res) => setData(res.data))
      .catch((err) => console.error("일기 상세 불러오기 실패:", err));
  }, [date]);

  if (!data) {
    return <p className={style["loading"]}>일기를 불러오는 중입니다…</p>;
  }

  const {
    fixedContent: generatedText,
    imageUrl: generatedImage,
    capturedImageUrl: beforediary,
    color,
  } = data;

  const displayDate = date.replace(/-/g, ".");
  const bgColor = colorMap[color] || "#F5E7CB";

  return (
    <section className={style["page-container"]}>
      <button className={style["back-button"]} onClick={() => navigate(-1)}>
        ← 뒤로가기
      </button>

      <div className={style["flip-card"]} onClick={() => setFlipped((f) => !f)}>
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
              style={{
                border: "1px solid #ddd",
                backgroundColor: "#FFFFFF",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiaryPage;
