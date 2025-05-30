import styles from "./diary-card.module.scss";

const DiaryCard = ({ date, image, text, beforediary, style = {} }) => {
  return (
    <article className={styles["diary-card"]} style={{ ...style }}>
      <h3>{date}</h3>
      <img src={image} alt={`${date} 일기의 그림`} />
      {text && <p>{text}</p>}
      {beforediary && <img src={beforediary} alt="직접 작성한 일기" />}
    </article>
  );
};

export default DiaryCard;
