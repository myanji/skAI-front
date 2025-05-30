import style from "./check-btn.module.scss";

const CheckBtn = ({ active, onClick }) => {
  const handleClick = () => {
    if (!active) return;
    onClick?.();
  };

  return (
    <button
      className={`${style.button} ${active ? style.access : ""}`}
      onClick={handleClick}
    >
      확인
    </button>
  );
};

export default CheckBtn;
