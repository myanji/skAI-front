import style from "./curriculum-card.module.scss";

const CurriculumCard = ({ image, title, onClick }) => {
  return (
    <section className={style["curriculum-card"]}>
      <div className={style.card} onClick={onClick}>
        <div className={style["image-container"]}>
          <img src={image} alt={title} />
        </div>

        <div className={style["text-container"]}>
          <h3>{title}</h3>
        </div>
      </div>
    </section>
  );
};

export default CurriculumCard;
