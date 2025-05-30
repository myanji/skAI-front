import style from "./custom-clothes-btn.module.scss";

const CustomClothesBtn = ({ img, onClick, isSelected, isDimmed }) => {
  return (
    <button
      className={`${style["clothes-btn"]} 
      ${isSelected ? style.selected : ""} 
      ${isDimmed ? style.dimmed : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={`${img} 버튼`} />
    </button>
  );
};

export default CustomClothesBtn;
