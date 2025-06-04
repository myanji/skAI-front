// src/features/questions/word/WordAction/WordActions.jsx
import React from "react";
import styles from "./word-actions.module.scss";

const WordActions = ({
  onSubmit,
  onHintClick,
  showHint,
  hint,
  hintWordClass,
  disabledSend,
}) => {
  return (
    <div className={styles["btnContainer"]}>
      {!showHint && (
        <button
          className={styles["btnHint"]}
          type="button"
          onClick={onHintClick}
        >
          힌트보기
        </button>
      )}

      {showHint && (
        <p className={styles["hint-text"]}>
          {hint}글자 {`(${hintWordClass})`}
        </p>
      )}

      <button
        className={`${styles["btnSend"]} ${
          !disabledSend ? styles["enabled"] : ""
        }`}
        type="button"
        onClick={onSubmit}
        disabled={disabledSend}
      >
        확인
      </button>
    </div>
  );
};

export default WordActions;
