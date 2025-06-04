import style from "./progress-bar.module.scss";

const ProgressBar = ({ solvedCount, totalCount }) => {
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((solvedCount / totalCount) * 100))
  );

  return (
    <section className={style["container"]}>
      <div className={style["progress-bar"]}>
        <div className={style.fill} style={{ width: `${percentage}%` }}></div>
      </div>
      <div className={style["count"]}>
        <p>{solvedCount}</p>/{totalCount}
      </div>
    </section>
  );
};

export default ProgressBar;
