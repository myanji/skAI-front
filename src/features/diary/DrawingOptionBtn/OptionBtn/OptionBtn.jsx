import style from "./option-btn.module.scss";

const OptionBtn = ({ text, isSelected, onClick }) => {
  return (
    <button
      className={`${style["option-btn"]} ${
        isSelected ? style["option-select"] : ""
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default OptionBtn;
