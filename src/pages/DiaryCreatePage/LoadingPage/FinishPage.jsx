// src/pages/FinishPage/FinishPage.jsx
import { useState } from "react";
import Header from "../../../widgets/Header/Header";
import SelectImg from "../SelectImg/SelectImg";
import Finish from "../assets/Finish.png";
import style from "./finish-page.module.scss";

const FinishPage = ({ resultData }) => {
  const [showSelect, setShowSelect] = useState(false);

  const handleViewResult = () => {
    setShowSelect(true);
  };

  if (showSelect) {
    return <SelectImg resultData={resultData} />;
  }

  return (
    <div className={style.layout}>
      <div className={style["finish-container"]}>
        <h3>그림이 완성되었어요!</h3>
        <img src={Finish} alt="완료 아이콘" />
        <button className={style.viewBtn} onClick={handleViewResult}>
          결과 보기
        </button>
      </div>
    </div>
  );
};

export default FinishPage;
