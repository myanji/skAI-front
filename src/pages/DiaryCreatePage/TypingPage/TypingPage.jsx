import { useState } from "react";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import Header from "../../../widgets/Header/Header";
import style from "./typing-page.module.scss";
import DrawingOption from "../DrawingOption/DrawingOption";

const TypingPage = () => {
  const [diaryText, setDiaryText] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const handleChange = (e) => {
    setDiaryText(e.target.value);
  };

  const handleCheck = () => {
    setConfirmed(true);
  };

  if (confirmed) {
    return <DrawingOption />;
  }

  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["typing-container"]}>
        <h3>일기를 작성해주세요!</h3>
        <p>
          타자로 적고싶은 일기를 작성한 후, 다 적었다면 확인 버튼을 눌러주세요!
        </p>
        <textarea value={diaryText} onChange={handleChange} />
        <CheckBtn
          active={diaryText.trim().length >= 10}
          onClick={handleCheck}
        />
      </div>
    </div>
  );
};

export default TypingPage;
