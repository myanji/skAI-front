import style from "./diary-mode-select.module.scss";
import Write from "../assets/write.png";
import Typing from "../assets/typing.png";
import CreateCard from "../../../features/diary/CreateCard/CreateCard";
import Header from "../../../widgets/Header/Header";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import useSelectIndex from "../../../shared/hooks/useSelectIndex";
import TypingPage from "../TypingPage/TypingPage";
import CanvasPage from "../CanvasPage/CanvasPage";
import { useState } from "react";

const DiaryModeSelect = () => {
  const { selectIndex, onClickBtn } = useSelectIndex();
  const [modeConfirmed, setModeConfirmed] = useState(false);

  const handleCheck = () => {
    setModeConfirmed(true);
  };

  if (modeConfirmed) {
    return selectIndex === 0 ? <CanvasPage /> : <TypingPage />;
  }

  return (
    <div>
      <Header />
      <div className={style["container"]}>
        <h3 className={style.title}>어떤 방식으로 작성할지 선택해주세요!</h3>
        <div className={style["card-container"]}>
          {[
            { img: Write, text: "직접 쓰기" },
            { img: Typing, text: "타자로 작성하기" },
          ].map((card, index) => (
            <CreateCard
              key={index}
              img={card.img}
              text={card.text}
              isSelected={selectIndex === index}
              isDimmed={selectIndex !== null && selectIndex !== index}
              onClick={() => onClickBtn(index)}
            />
          ))}
        </div>
        <CheckBtn active={selectIndex !== null} onClick={handleCheck} />
      </div>
    </div>
  );
};

export default DiaryModeSelect;
