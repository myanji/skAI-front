import style from "./antonym-question.module.scss";
import Antonym from "./Antonym.svg";

const AntonymQuestion = ({
  question,
  antonyms = [],
  onAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  return (
    <section className={style["question-container"]}>
      <div className={style["wordlist-container"]}>
        <p>{question}</p>
        <img src={Antonym} alt="단어장" className={style["wordlist-image"]} />
      </div>

      <div className={style["btn_div"]}>
        {antonyms.map((word, index) => {
          let btnClass = style["btn_answer"];
          if (selectedAnswer === word) {
            btnClass =
              word === correctAnswer
                ? `${style["btn_answer"]} ${style["correct"]}`
                : `${style["btn_answer"]} ${style["incorrect"]}`;
          }

          return (
            <button
              key={index}
              className={btnClass}
              onClick={() => onAnswer(word)}
              disabled={Boolean(selectedAnswer)}
            >
              {word}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AntonymQuestion;
