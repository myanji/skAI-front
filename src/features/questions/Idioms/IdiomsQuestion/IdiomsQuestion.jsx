import style from "./idioms-question.module.scss";

const IdiomsQuestion = ({
  image,
  question,
  idioms = [],
  onAnswer,
  selectedAnswer,
  correctAnswer,
}) => {
  return (
    <div>
      <div className={style["question-container"]}>
        <img
          src={image}
          alt="문제 이미지"
          className={style["question-image"]}
        />
        <p className={style["question-text"]}>{question}</p>
      </div>
      <div className={style["btn_div"]}>
        {idioms.map((word, index) => {
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
    </div>
  );
};

export default IdiomsQuestion;
