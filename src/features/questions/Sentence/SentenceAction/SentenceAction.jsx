import { useState, useEffect } from "react";
import style from "./sentence-action.module.scss";

const SentenceAction = ({ answer }) => {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`${style.result} ${entered ? style.enter : ""}`}>
      <p className={style.answer}>{answer}</p>
      <div className={style.answer_div}></div>
    </div>
  );
};

export default SentenceAction;
