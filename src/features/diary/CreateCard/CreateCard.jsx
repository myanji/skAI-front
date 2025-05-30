import style from "./create-card.module.scss";

const CreateCard = ({ img, text, onClick, isSelected, isDimmed }) => {
  return (
    <div
      className={`${style["card-container"]} ${
        isSelected ? style.selected : ""
      } ${isDimmed ? style.dimmed : ""}`}
      onClick={onClick}
    >
      <img className={style["card-img"]} src={img} alt={text} />
      <h3 className={style["card-text"]}>{text}</h3>
    </div>
  );
};

export default CreateCard;
