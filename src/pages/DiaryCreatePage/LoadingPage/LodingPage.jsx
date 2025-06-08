/* src/pages/LoadingPage/LoadingPage.jsx */
import Header from "../../../widgets/Header/Header";
import Loading from "../assets/Loading.png";
import style from "./loading-page.module.scss";

const LoadingPage = () => {
  const text = "그림을 만들고 있어요...".split("");
  return (
    <div className={style.layout}>
      <div className={style["loading-container"]}>
        <h3 className={style.animatedText}>
          {text.map((ch, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
              dangerouslySetInnerHTML={{
                __html: ch === " " ? "&nbsp;" : ch,
              }}
            />
          ))}
        </h3>
        <p>만드는데 3분정도 소요되니 조금만 기다려주세요!</p>
        <img src={Loading} alt="로딩중..." />
      </div>
    </div>
  );
};

export default LoadingPage;
