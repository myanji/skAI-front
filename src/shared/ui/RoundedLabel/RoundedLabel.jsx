import style from "./rounded-label.module.scss";

const RoundedLabel = ({ text }) => {
  return (
    <div className={style["text"]}>
      <h1>{text}</h1>
    </div>
  );
};

export default RoundedLabel;
