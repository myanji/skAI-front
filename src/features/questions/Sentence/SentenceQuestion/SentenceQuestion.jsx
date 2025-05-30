import style from "./sentence-question.module.scss";

const SentenceQuestion = ({ words }) => {
  return (
    <div className={style["card_div"]}>
      {words.map((word, index) => (
        <button key={index} className={style["card"]}>
          {word}
        </button>
      ))}
    </div>
  );
};

export default SentenceQuestion;
