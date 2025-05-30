import style from "./sentence-action.module.scss";

const SentenceAction = ({ answer }) => {
  return (
    <div>
      <p className={style["answer"]}>{answer}</p>
      <div className={style["answer_div"]}></div>
    </div>
  );
};

export default SentenceAction;
