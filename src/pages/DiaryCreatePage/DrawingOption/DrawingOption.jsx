import { useState } from "react";
import ColorBtn from "../../../features/diary/DrowingOptionBtn/ColorBtn/ColorBtn";
import CustomHairBtn from "../../../features/diary/DrowingOptionBtn/CustomHair/CustomHairBtn";
import OptionBtn from "../../../features/diary/DrowingOptionBtn/OptionBtn/OptionBtn";
import Header from "../../../widgets/Header/Header";
import style from "./drawing-option.module.scss";
import shorthair from "../assets/shorthair.png";
import middlehair from "../assets/middlehair.png";
import longhair from "../assets/longhair.png";
import Glook1 from "../assets/Glook1.png";
import Glook2 from "../assets/Glook2.png";
import Glook3 from "../assets/Glook3.png";
import CustomClothesBtn from "../../../features/diary/DrowingOptionBtn/CustomClothes/CustomClothesBtn";
import useSelectIndex from "../../../shared/hooks/useSelectIndex";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import LoadingPage from "../LoadingPage/LodingPage";

const DrawingOption = () => {
  const drawing = useSelectIndex(); // 그림체
  const color = useSelectIndex(); // 색
  const character = useSelectIndex(); // 캐릭터 커스텀 여부
  const hair = useSelectIndex(); // 머리
  const clothes = useSelectIndex(); // 옷

  // 확인 버튼 누를 시 Loading 컴포넌트로 넘어가게
  const [confirmed, setConfirmed] = useState(false);
  const handleCheck = () => {
    setConfirmed(true);
  };
  if (confirmed) {
    return <LoadingPage />;
  }

  return (
    <div>
      <Header />
      <div className={style.container}>
        <div className={style["option-container"]}>
          <h3>원하는 그림체를 선택해보세요</h3>
          <p>선택한 그림체를 반영한 그림이 만들어져요!</p>
          <div className={style["drawing-container"]}>
            {["만화같이", "수채화", "유화", "몽환적인", "배경중심"].map(
              (item, index) => (
                <OptionBtn
                  key={index}
                  text={item}
                  isSelected={drawing.selectIndex === index}
                  onClick={() => drawing.onClickBtn(index)}
                />
              )
            )}
          </div>
          <h3>원하는 색상을 선택해보세요</h3>
          <p>선택한 색상 대로 그림이 만들어져요!</p>
          <div className={style["color-container"]}>
            {[
              { text: "빨간색", color: "#FF5D5D" },
              { text: "주황색", color: "#FFA24C" },
              { text: "노랑색", color: "#FFED4E" },
              { text: "연두색", color: "#B4FF53" },
              { text: "하늘색", color: "#5DDCFF" },
              { text: "보라색", color: "#A05DFF" },
              { text: "베이지색", color: "#F5E7CB" },
            ].map((item, index) => (
              <ColorBtn
                key={index}
                text={item.text}
                color={item.color}
                isSelected={color.selectIndex === index}
                onClick={() => color.onClickBtn(index)}
              />
            ))}
          </div>

          <h3>그림일기 주인공을 꾸며보세요</h3>
          <p>선택하지 않으면 지정된 캐릭터가 자동으로 그림일기에 등장합니다!</p>
          <div className={style["character-container"]}>
            {["꾸미지 않는다", "꾸민다"].map((item, index) => (
              <OptionBtn
                key={index}
                text={item}
                isSelected={character.selectIndex === index}
                onClick={() => character.onClickBtn(index)}
              />
            ))}
          </div>
          {character.selectIndex === 1 && (
            <CustomGirl
              hairIndex={hair.selectIndex}
              onClickHair={hair.onClickBtn}
              clothesIndex={clothes.selectIndex}
              onClickClothes={clothes.onClickBtn}
            />
          )}

          {/* <CustomBoy /> */}

          <div className={style["select-btn"]}>
            <CheckBtn
              active={
                drawing.selectIndex !== null &&
                color.selectIndex !== null &&
                (character.selectIndex === 0 ||
                  (character.selectIndex === 1 &&
                    hair.selectIndex !== null &&
                    clothes.selectIndex !== null))
              }
              onClick={handleCheck}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomGirl = ({
  hairIndex,
  onClickHair,
  clothesIndex,
  onClickClothes,
}) => (
  <div className={style["custom-container"]}>
    <div className={style.line}></div>

    <div className={style["hair-container"]}>
      {[
        { text: "짧은 머리", img: shorthair },
        { text: "단발", img: middlehair },
        { text: "긴머리", img: longhair },
      ].map((item, index) => (
        <CustomHairBtn
          key={index}
          text={item.text}
          img={item.img}
          isSelected={hairIndex === index}
          isDimmed={hairIndex !== null && hairIndex !== index}
          onClick={() => onClickHair(index)}
        />
      ))}
    </div>

    <div className={style["clothes-container"]}>
      {[Glook1, Glook2, Glook3].map((img, index) => (
        <CustomClothesBtn
          key={index}
          img={img}
          isSelected={clothesIndex === index}
          isDimmed={clothesIndex !== null && clothesIndex !== index}
          onClick={() => onClickClothes(index)}
        />
      ))}
    </div>
  </div>
);

const CustomBoy = () => (
  <div className={style["custom-container"]}>
    <div className={style.line}></div>
    <div className={style["clothes-container"]}>
      {[Glook1, Glook2, Glook3].map((img, index) => (
        <CustomClothesBtn
          key={index}
          img={img}
          isSelected={clothesIndex === index}
          isDimmed={clothesIndex !== null && clothesIndex !== index}
          onClick={() => onClickClothes(index)}
        />
      ))}
    </div>
  </div>
);

export default DrawingOption;
