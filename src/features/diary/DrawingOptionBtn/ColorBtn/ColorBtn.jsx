import style from "./color-btn.module.scss";

const ColorBtn = ({ text, color, isSelected, onClick }) => {
  return (
    <button
      className={`${style["color-btn"]} 
    ${isSelected ? style["color-select"] : ""}`}
      onClick={onClick}
    >
      <div
        className={style["color-dot"]}
        style={{ backgroundColor: color }}
      ></div>
      {text}
    </button>
  );
};

export default ColorBtn;
