import style from "./idioms-question.module.scss";

const IdiomsQuestion = ({ image, question, idioms = [] }) => {
  return (
    <div>
      <div className={style["question-container"]}>
        <img src={image} />
        <p className={style["question"]}>{question}</p>
      </div>
      <div className={style["btn_div"]}>
        {idioms.map((word, index) => (
          <button key={index} className={style["btn_answer"]}>
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default IdiomsQuestion;
