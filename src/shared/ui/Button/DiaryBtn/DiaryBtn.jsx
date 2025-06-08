import { useNavigate } from "react-router-dom";
import style from "./diary-btn.module.scss";

const DiaryBtn = ({ onClick }) => {
  const navigate = useNavigate();

  return (
    <section className={style["btn-container"]}>
      <button className={style["calendar-link"]} onClick={onClick}>
        달력 보기
      </button>
      <button
        className={style["diary-link"]}
        onClick={() => {
          navigate("/Diary/create");
        }}
      >
        일기 쓰기
      </button>
    </section>
  );
};

export default DiaryBtn;
