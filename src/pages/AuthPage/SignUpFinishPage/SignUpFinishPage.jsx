import style from "./sign-up-finish-page.module.scss";
import check from "./Check.png";
import Header from "../../../widgets/Header/Header";
import { useNavigate } from "react-router-dom";

const SignUpFinishPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style["layout"]}>
      <div className={style["sign-up-finish-container"]}>
        <img className={style["check-img"]} src={check} alt="Check 이미지" />
        <h1>회원가입 완료</h1>
        <p>정상적으로 회원가입이 완료되었습니다!</p>
        <p>로그인 후 이용해주세요</p>
        <div className={style["bar"]}></div>
        <div className={style["btn-container"]}>
          <button onClick={() => navigate("/")}>메인으로</button>
          <button
            onClick={() => navigate("/SignInPage")}
            className={style["login-btn"]}
          >
            로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpFinishPage;
