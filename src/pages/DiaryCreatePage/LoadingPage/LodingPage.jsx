import Header from "../../../widgets/Header/Header";
import Loading from "../assets/Loading.png";
import style from "./loading-page.module.scss";

const LoadingPage = () => {
  return (
    <div>
      <Header />
      <div className={style["loading-container"]}>
        <h3>일기를 만들고 있어요...</h3>
        <p>만드는데 5분정도 소요되니 조금만 기다려주세요!</p>
        <img src={Loading} alt="로딩중..." />
      </div>
    </div>
  );
};

export default LoadingPage;
