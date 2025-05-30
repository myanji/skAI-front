import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import Canvas from "../../../shared/ui/Canvas/Canvas";
import Header from "../../../widgets/Header/Header";
import style from "./canvas-page.module.scss";

const CanvasPage = () => {
  return (
    <div>
      <Header />
      <div className={style["canvas-container"]}>
        <h3>일기를 작성해주세요!</h3>
        <p>
          스마트 패드로 아래 네모 칸에 일기를 직접 적은 후, 다 적었다면 확인
          버튼을 눌러주세요!
        </p>
        <Canvas />
        <CheckBtn />
      </div>
    </div>
  );
};

export default CanvasPage;
