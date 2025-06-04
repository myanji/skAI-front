import React from "react";
import styles from "./word-question.module.scss";

const WordQuestion = ({
  image,
  question,
  inputValue,
  onChange,
  isCorrect,
  submitted,
}) => {
  return (
    <div className={styles["question-container"]}>
      <h3 className={styles.title}>
        문제와 그림을 보고 해당하는 단어를 입력해주세요!
      </h3>

      <img className={styles.image} src={image} alt="문제 이미지" />
      <p className={styles.question}>{question}</p>

      <input
        className={styles.answer}
        type="text"
        value={inputValue}
        onChange={onChange}
        placeholder="답을 입력하세요"
      />

      {submitted && isCorrect === false && (
        <p className={styles["error-text"]}>틀렸습니다. 다시 입력해주세요!</p>
      )}
    </div>
  );
};

export default WordQuestion;
