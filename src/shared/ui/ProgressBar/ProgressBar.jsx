import style from "./progress-bar.module.scss";

const ProgressBar = ({ solvedCount, totalCount }) => {
  return (
    <section className={style["container"]}>
      <div className={style["progress-bar"]}>
        <div></div>
      </div>
      <p className={style["count"]}>
        <p>{solvedCount}</p>/{totalCount}
      </p>
    </section>
  );
};

export default ProgressBar;
