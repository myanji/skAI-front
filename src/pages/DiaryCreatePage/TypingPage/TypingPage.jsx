import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import DrawingOption from "../DrawingOption/DrawingOption";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import Header from "../../../widgets/Header/Header";
import style from "./typing-page.module.scss";

const TypingPage = () => {
  const [diaryText, setDiaryText] = useState("");
  const [imageBlob, setImageBlob] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const previewRef = useRef(null);

  const handleCheck = async () => {
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpg")
    );

    if (blob) {
      const file = new File([blob], "beforediary.jpg", { type: "image/jpeg" });

      setImageBlob(file);
      setImageURL(URL.createObjectURL(file));
      setConfirmed("next");
    }
  };

  if (confirmed === "next" && imageBlob) {
    return <DrawingOption diaryImage={imageBlob} />;
  }

  return (
    <div className={style["layout"]}>
      <div className={style["typing-container"]}>
        <h3>일기를 작성해주세요!</h3>
        <p>
          타자로 적고싶은 일기를 작성한 후, 다 적었다면 확인 버튼을 눌러주세요!
        </p>
        <p className={style["waring"]}>
          일기는 200자 이내로만 적을 수 있습니다.
        </p>

        <div className={style["textarea-container"]}>
          <textarea
            maxLength={200}
            value={diaryText}
            onChange={(e) => setDiaryText(e.target.value)}
            className={style.textarea}
          />
          <div ref={previewRef} className={style["preview-box"]}>
            {diaryText}
          </div>
        </div>

        <CheckBtn
          active={diaryText.trim().length >= 10}
          onClick={handleCheck}
        />
      </div>
    </div>
  );
};

export default TypingPage;
