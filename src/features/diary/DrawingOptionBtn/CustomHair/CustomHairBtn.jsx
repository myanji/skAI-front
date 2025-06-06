import style from "./custom-hair-btn.module.scss";

const CustomHairBtn = ({ text, img, onClick, isSelected, isDimmed }) => {
  return (
    <button
      className={`${style["Hair-btn"]} 
      ${isSelected ? style.selected : ""} 
      ${isDimmed ? style.dimmed : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={`${img} 버튼`} />
      {text}
    </button>
  );
};

export default CustomHairBtn;
