import Pencil from "../Pencil.png";
import Eraser from "../Eraser.png";
import style from "./canvas-toolbar.module.scss";

const CanvasToolbar = () => {
  return (
    <div className={style["canvas_btn"]}>
      <button className={style["select"]}>
        <img src={Pencil} alt="연필" />
      </button>
      <button>
        <img src={Eraser} alt="지우개" />
      </button>
    </div>
  );
};

export default CanvasToolbar;
