import { useState } from "react";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import DiaryCreatePage from "../DiaryCreatePage/DiaryCreatePage";
import api from "../../../shared/lib/api";
import style from "./select-img.module.scss";
import Header from "../../../widgets/Header/Header";

const engines = ["DALL·E 3", "Stable Diffusion", "Black Forest Lab"];

const SelectImg = ({ resultData }) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showDiary, setShowDiary] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleCheck = async () => {
    if (selectedIdx === null) return;
    const engine = engines[selectedIdx];
    const imageUrl = resultData.imageUrls[engine];

    setSaving(true);
    try {
      await api.post("/api/diary/save-selected-image", null, {
        params: {
          diaryId: resultData.id,
          selectedImageUrl: imageUrl,
          model: engine,
        },
      });
      setShowDiary(true);
    } catch (err) {
      console.error("선택 이미지 저장 실패", err);
    } finally {
      setSaving(false);
    }
  };

  if (showDiary) {
    const engine = engines[selectedIdx];
    const imageUrl = resultData.imageUrls[engine];

    return (
      <DiaryCreatePage
        date={resultData.date}
        beforediary={resultData.capturedImageUrl}
        image={imageUrl}
        generatedText={resultData.correctedText}
        color={resultData.color}
      />
    );
  }

  return (
    <section className={style.layout}>
      <div className={style["select-img-container"]}>
        <h1>그림을 선택해주세요.</h1>
        <p>원하는 그림을 하나 선택한 뒤 확인 버튼을 눌러주세요.</p>
        <div className={style["img-container"]}>
          {engines.map((engine, idx) => {
            const url = resultData.imageUrls[engine];
            const isDimmed = selectedIdx !== null && selectedIdx !== idx;
            return (
              <img
                key={engine}
                src={url}
                alt={engine}
                className={`${style.img} ${isDimmed ? style.dimmed : ""} ${
                  selectedIdx === idx ? style.selected : ""
                }`}
                onClick={() => setSelectedIdx(idx)}
              />
            );
          })}
        </div>
        <CheckBtn
          active={selectedIdx !== null && !saving}
          onClick={handleCheck}
        />
      </div>
    </section>
  );
};

export default SelectImg;
