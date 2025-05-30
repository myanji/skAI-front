import styles from "./word-actions.module.scss";

const WordActions = () => {
  return (
    <div className={styles.btnContainer}>
      <button className={styles.btnHint}>힌트보기</button>
      <button className={styles.btnSend}>확인</button>
    </div>
  );
};

export default WordActions;
