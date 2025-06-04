import React from "react";
import style from "./modal.module.scss";

const Modal = ({ visible, title, correctAnswer, shortContent, onConfirm }) => {
  if (!visible) return null;

  return (
    <div className={style["modal-overlay"]}>
      <div className={style["modal-box"]} onClick={(e) => e.stopPropagation()}>
        <h2 className={style["modal-title"]}>{title}</h2>
        {correctAnswer && (
          <p className={style["modal-content"]}>
            <strong>{correctAnswer}</strong>
            란(은) <br />
            {shortContent}
          </p>
        )}
        <button className={style["modal-button"]} onClick={onConfirm}>
          다음문제 풀기
        </button>
      </div>
    </div>
  );
};

export default Modal;
