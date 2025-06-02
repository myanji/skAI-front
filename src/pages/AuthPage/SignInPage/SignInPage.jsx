import AuthBtn from "../../../features/auth/AuthBtn/AuthBtn";
import AuthInput from "../../../features/auth/AuthInput/AuthInput";
import Header from "../../../widgets/Header/Header";
import style from "./sign-in-page.module.scss";
import { useState } from "react";
import api from "../../../shared/lib/api";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const canSubmit = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    setErrorMessage("");
    try {
      const { data } = await api.post("/members/login", { email, password });
      const token = data.result.token;
      sessionStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setErrorMessage(msg);
    }
  };

  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["sign-in-container"]}>
        <h1>로그인</h1>
        <form onSubmit={handleSubmit} className={style["input-container"]}>
          <AuthInput
            placeholder="이메일"
            value={email}
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AuthInput
            placeholder="비밀번호"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className={style["error-text"]}>
              아이디나 비밀번호가 맞지 않습니다.
            </p>
          )}

          <AuthBtn
            type="submit"
            text="로그인"
            disabled={!canSubmit}
            canSubmit={canSubmit}
          />
        </form>

        <div className={style["auth-nav"]}>
          <a href="/SignUpPage">회원가입</a>
          <span>|</span>
          <a href="/FindPassword">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
