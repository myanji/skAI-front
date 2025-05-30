import styles from "./step-card.module.scss";

const StepCard = ({ imageSrc, title }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageBox}>
        <img src={imageSrc} alt={title} />
      </div>
      <p className={styles.title}>{title}</p>
    </div>
  );
};
export default StepCard;
