// src/shared/ui/Button/CanvasToolbar/CanvasToolbar.jsx
import Pencil from "./Pencil.png";
import Eraser from "./Eraser.png";
import style from "./canvas-toolbar.module.scss";

const CanvasToolbar = ({ tool, onToolChange }) => {
  return (
    <div className={style.canvas_btn}>
      <button
        className={tool === "pencil" ? style.select : ""}
        onClick={() => onToolChange("pencil")}
      >
        <img src={Pencil} alt="연필" />
      </button>
      <button
        className={tool === "eraser" ? style.select : ""}
        onClick={() => onToolChange("eraser")}
      >
        <img src={Eraser} alt="지우개" />
      </button>
    </div>
  );
};

export default CanvasToolbar;
