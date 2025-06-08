import styles from "./diary-card.module.scss";
import sad from "./assets/sad.png";
import happy from "./assets/happy.png";
import energetic from "./assets/energetic.png";
import angry from "./assets/angry.png";
import mysterious from "./assets/mysterious.png";
import neutral from "./assets/neutral.png";
import surprised from "./assets/surprised.png";

const emotionMap = {
  화남: angry,
  놀라움: surprised,
  기쁨: happy,
  활기찬: energetic,
  슬픔: sad,
  신비로움: mysterious,
  보통: neutral,
};

const DiaryCard = ({ date, image, text, beforediary, color, style = {} }) => {
  const emotion = emotionMap[color] || happy;
  return (
    <article className={styles["diary-card"]} style={{ ...style }}>
      <h3>{date}</h3>
      <div className={styles["emotion-div"]}>
        <p>오늘의 기분:</p>
        <img src={emotion} alt="감정" className={styles["emotion"]} />
      </div>
      <img
        src={image}
        alt={`${date} 일기의 그림`}
        className={styles["diary-img"]}
      />
      {text && <p className={styles["diary-text"]}>{text}</p>}
      {beforediary && (
        <img
          className={styles["before-diary"]}
          src={beforediary}
          alt="직접 작성한 일기"
        />
      )}
    </article>
  );
};

export default DiaryCard;
