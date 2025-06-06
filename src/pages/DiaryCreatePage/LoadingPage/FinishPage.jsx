// src/pages/FinishPage/FinishPage.jsx
import { useState } from "react";
import Header from "../../../widgets/Header/Header";
import DiaryCreatePage from "../DiaryCreatePage/DiaryCreatePage"; // DiaryCreatePage import
import Finish from "../assets/Finish.png";
import style from "./finish-page.module.scss";

const FinishPage = ({ resultData }) => {
  const [showResult, setShowResult] = useState(false);

  const handleViewResult = () => {
    setShowResult(true);
  };

  if (showResult) {
    return (
      <DiaryCreatePage
        date={resultData.date}
        beforediary={resultData.capturedImageUrl}
        generatedImage={resultData.imageUrl}
        generatedText={resultData.correctedText}
        color={resultData.color}
      />
    );
  }

  return (
    <div className={style.layout}>
      <Header />
      <div className={style["finish-container"]}>
        <h3>일기가 완성되었어요!</h3>
        <img src={Finish} alt="완료 아이콘" />
        <button className={style.viewBtn} onClick={handleViewResult}>
          결과 보기
        </button>
      </div>
    </div>
  );
};

export default FinishPage;
