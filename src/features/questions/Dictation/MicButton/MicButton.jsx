import Mic from "../mic.png";
import style from "./mic-button.module.scss";

const MicButton = () => {
  return (
    <div className={style["mike-box"]}>
      <img src={Mic} alt="마이크 사진" />
    </div>
  );
};

export default MicButton;
