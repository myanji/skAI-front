import { useState, useEffect } from "react";
import ColorBtn from "../../../features/diary/DrawingOptionBtn/ColorBtn/ColorBtn";
import CustomHairBtn from "../../../features/diary/DrawingOptionBtn/CustomHair/CustomHairBtn";
import OptionBtn from "../../../features/diary/DrawingOptionBtn/OptionBtn/OptionBtn";
import Header from "../../../widgets/Header/Header";
import style from "./drawing-option.module.scss";
import shorthair from "../assets/shorthair.png";
import middlehair from "../assets/middlehair.png";
import longhair from "../assets/longhair.png";
import look1 from "../assets/look1.png";
import look2 from "../assets/look2.png";
import look3 from "../assets/look3.png";
import look4 from "../assets/look4.png";
import look5 from "../assets/look5.png";
import CustomClothesBtn from "../../../features/diary/DrawingOptionBtn/CustomClothes/CustomClothesBtn";
import useSelectIndex from "../../../shared/hooks/useSelectIndex";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import LoadingPage from "../LoadingPage/LodingPage";
import FinishPage from "../LoadingPage/FinishPage";
import api from "../../../shared/lib/api";

const DrawingOption = ({ diaryImage }) => {
  const drawing = useSelectIndex(); // 그림체 선택
  const color = useSelectIndex(); // 색상 선택
  const character = useSelectIndex(); // 캐릭터 꾸미기 여부
  const hair = useSelectIndex(); // 헤어스타일 (여자만)
  const clothes = useSelectIndex(); // 옷 선택

  const [gender, setGender] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [resultData, setResultData] = useState(null);
  const [showFinish, setShowFinish] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile/profile");
        setGender(res.data.gender);
      } catch (err) {
        console.error("프로필 정보 불러오기 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleCheck = async () => {
    try {
      const styleMapping = [
        "만화같이",
        "수채화",
        "유화",
        "몽환적인",
        "배경중심",
      ];
      const colorMapping = [
        "화남",
        "놀라움",
        "기쁨",
        "활기찬",
        "슬픔",
        "신비로움",
        "보통",
      ];
      const selectedStyle = styleMapping[drawing.selectIndex];
      const selectedColor = colorMapping[color.selectIndex];
      const useCustom = character.selectIndex === 1;

      let hairstyleParam = "";
      let outfitParam = "";
      if (useCustom) {
        if (gender === "girl") {
          const girlHairMapping = ["short", "med", "long"];
          hairstyleParam = girlHairMapping[hair.selectIndex];
          const girlOutfitMapping = ["one", "two", "three"];
          outfitParam = girlOutfitMapping[clothes.selectIndex];
        } else if (gender === "boy") {
          hairstyleParam = "short";
          const boyOutfitMapping = ["four", "five"];
          outfitParam = boyOutfitMapping[clothes.selectIndex];
        }
      }

      const queryParams = new URLSearchParams({
        style: selectedStyle,
        color: selectedColor,
        useCustom: useCustom.toString(),
        hairstyle: hairstyleParam,
        outfit: outfitParam,
      }).toString();

      const formData = new FormData();
      formData.append("diaryImage", diaryImage);

      setIsLoading(true);
      const response = await api.post(
        `/api/diary/generate?${queryParams}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResultData(response.data);
      setIsLoading(false);
      setShowFinish(true);
    } catch (err) {
      console.error("그림일기 생성 요청 실패:", err);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  if (showFinish && resultData) {
    return <FinishPage resultData={resultData} />;
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
              (item, idx) => (
                <OptionBtn
                  key={idx}
                  text={item}
                  isSelected={drawing.selectIndex === idx}
                  onClick={() => drawing.onClickBtn(idx)}
                />
              )
            )}
          </div>

          <h3>원하는 색상을 선택해보세요</h3>
          <p>선택한 색상 대로 그림이 만들어져요!</p>
          <div className={style["color-container"]}>
            {[
              { text: "화남", color: "#FF5D5D" },
              { text: "놀라움", color: "#FFA24C" },
              { text: "기쁨", color: "#FFED4E" },
              { text: "활기찬", color: "#B4FF53" },
              { text: "슬픔", color: "#5DDCFF" },
              { text: "신비로움", color: "#A05DFF" },
              { text: "보통", color: "#F5E7CB" },
            ].map((item, idx) => (
              <ColorBtn
                key={idx}
                text={item.text}
                color={item.color}
                isSelected={color.selectIndex === idx}
                onClick={() => color.onClickBtn(idx)}
              />
            ))}
          </div>

          <h3>그림일기 주인공을 꾸며보세요</h3>
          <p>선택하지 않으면 지정된 캐릭터가 자동으로 그림일기에 등장합니다!</p>
          <div className={style["character-container"]}>
            {["꾸미지 않는다", "꾸민다"].map((item, idx) => (
              <OptionBtn
                key={idx}
                text={item}
                isSelected={character.selectIndex === idx}
                onClick={() => character.onClickBtn(idx)}
              />
            ))}
          </div>

          {character.selectIndex === 1 && gender === "girl" && (
            <CustomGirl
              hairIndex={hair.selectIndex}
              onClickHair={hair.onClickBtn}
              clothesIndex={clothes.selectIndex}
              onClickClothes={clothes.onClickBtn}
            />
          )}
          {character.selectIndex === 1 && gender === "boy" && (
            <CustomBoy
              clothesIndex={clothes.selectIndex}
              onClickClothes={clothes.onClickBtn}
            />
          )}

          <div className={style["select-btn"]}>
            <CheckBtn
              active={
                drawing.selectIndex !== null &&
                color.selectIndex !== null &&
                (character.selectIndex === 0 ||
                  (character.selectIndex === 1 &&
                    ((gender === "girl" &&
                      hair.selectIndex !== null &&
                      clothes.selectIndex !== null) ||
                      (gender === "boy" && clothes.selectIndex !== null))))
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
      ].map((item, idx) => (
        <CustomHairBtn
          key={idx}
          text={item.text}
          img={item.img}
          isSelected={hairIndex === idx}
          isDimmed={hairIndex !== null && hairIndex !== idx}
          onClick={() => onClickHair(idx)}
        />
      ))}
    </div>
    <div className={style["clothes-container"]}>
      {[look1, look2, look3].map((img, idx) => (
        <CustomClothesBtn
          key={idx}
          img={img}
          isSelected={clothesIndex === idx}
          isDimmed={clothesIndex !== null && clothesIndex !== idx}
          onClick={() => onClickClothes(idx)}
        />
      ))}
    </div>
  </div>
);

const CustomBoy = ({ clothesIndex, onClickClothes }) => (
  <div className={style["custom-container"]}>
    <div className={style.line}></div>
    <div className={style["clothes-container"]}>
      {[look4, look5].map((img, idx) => (
        <CustomClothesBtn
          key={idx}
          img={img}
          isSelected={clothesIndex === idx}
          isDimmed={clothesIndex !== null && clothesIndex !== idx}
          onClick={() => onClickClothes(idx)}
        />
      ))}
    </div>
  </div>
);

export default DrawingOption;
