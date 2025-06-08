// src/pages/Diary/CanvasPage/CanvasPage.jsx
import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import CanvasToolbar from "../../../shared/ui/Button/CanvasToolbar/CanvasToolbar";
import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import Canvas from "../../../shared/ui/Canvas/Canvas";
import DrawingOption from "../DrawingOption/DrawingOption";
import style from "./canvas-page.module.scss";

const CanvasPage = () => {
  const [tool, setTool] = useState("pencil");

  // 캔버스 내용을 이미지로 변환하여 다음 컴포넌트로 넘길 때 사용
  const [imageBlob, setImageBlob] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  // html2canvas로 스크린샷할 대상(ref)
  const previewRef = useRef(null);

  const handleCheck = async () => {
    if (!previewRef.current) return;

    // previewRef 영역을 캡처
    const canvas = await html2canvas(previewRef.current);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/jpg")
    );

    if (blob) {
      // File 객체로 변환
      const file = new File([blob], "beforediary.jpg", {
        type: "image/jpeg",
      });

      setImageBlob(file);
      setImageURL(URL.createObjectURL(file));
      setConfirmed(true);
    }
  };

  // confirmed가 true면 DrawingOption으로 이동
  if (confirmed && imageBlob) {
    return <DrawingOption diaryImage={imageBlob} />;
  }

  return (
    <div className={style.layout}>
      <div className={style["canvas-container"]}>
        <h3>일기를 작성해주세요!</h3>
        <p>
          스마트 패드로 아래 네모 칸에 일기를 직접 적은 후, 다 적었다면 확인
          버튼을 눌러주세요!
        </p>

        <div className={style["canvas-div"]}>
          <div className={style.toolbar}>
            <CanvasToolbar tool={tool} onToolChange={setTool} />
          </div>
          <div className={style.canvas}>
            <div ref={previewRef}>
              <Canvas mode={tool} />
            </div>
          </div>
        </div>

        <CheckBtn active={true} onClick={handleCheck} />
      </div>
    </div>
  );
};

export default CanvasPage;
