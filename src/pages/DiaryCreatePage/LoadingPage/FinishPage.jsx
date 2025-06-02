import CheckBtn from "../../../shared/ui/Button/CheckBtn/CheckBtn";
import Header from "../../../widgets/Header/Header";
import Finish from "../assets/Finish.png";
import style from "./finish-page.module.scss";

const FinishPage = () => {
  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["finish-container"]}>
        <h3>일기가 완성되었어요!</h3>
        <img src={Finish} alt="로딩중..." />
        <button>보러가기</button>
      </div>
    </div>
  );
};

export default FinishPage;
