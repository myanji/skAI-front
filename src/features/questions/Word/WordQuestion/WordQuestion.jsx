import styles from "./word-question.module.scss";

const WordQuestion = ({ image, question }) => {
  return (
    <>
      <h3 className={styles.title}>
        문제와 그림을 보고 해당하는 단어를 입력해주세요!
      </h3>
      <img className={styles.image} src={image} alt="문제 이미지" />
      <p className={styles.question}>{question}</p>
      <input className={styles.answer} />
    </>
  );
};

export default WordQuestion;
