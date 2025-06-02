import AuthBtn from "../../../features/auth/AuthBtn/AuthBtn";
import AuthInput from "../../../features/auth/AuthInput/AuthInput";
import Header from "../../../widgets/Header/Header";
import style from "./sign-up-page.module.scss";
import { useState, useEffect } from "react";
import api from "../../../shared/lib/api";
import SignUpFinishPage from "../SignUpFinishPage/SignUpFinishPage";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isOver14, setIsOver14] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [completed, setCompleted] = useState(false);

  const [errors, setErrors] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
    passwordConfirmError: "",
  });

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      nameError:
        name && (name.length < 2 || name.length > 10)
          ? "이름은 2~10자여야 합니다"
          : "",
    }));
  }, [name]);

  useEffect(() => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    setErrors((prev) => ({
      ...prev,
      emailError:
        email && !emailRegex.test(email)
          ? "이메일 형식이 올바르지 않습니다."
          : "",
    }));
  }, [email]);

  useEffect(() => {
    const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{10,20}$/;
    setErrors((prev) => ({
      ...prev,
      passwordError:
        password && !pwdRegex.test(password)
          ? "영문, 숫자 포함 10-20자여야 합니다."
          : "",
    }));
  }, [password]);

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      passwordConfirmError:
        passwordConfirm && passwordConfirm !== password
          ? "비밀번호가 일치하지 않습니다."
          : "",
    }));
  }, [passwordConfirm, password]);

  const canSubmit =
    name &&
    email &&
    password &&
    passwordConfirm &&
    isOver14 &&
    termsAgreed &&
    !Object.values(errors).some((msg) => msg);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;

    const payload = { kidsname: name, email, password };
    try {
      await api.post("/members/signup", payload);
      setCompleted(true);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  if (completed) {
    return <SignUpFinishPage />;
  }
  return (
    <div className={style["layout"]}>
      <Header />
      <div className={style["sign-up-container"]}>
        <h1>회원가입</h1>
        <p className={style["explanation"]}>
          가입 정보 입력 및 약관에 동의해주세요.
        </p>
        <form onSubmit={handleSubmit} className={style["input-container"]}>
          {/* 이름 */}
          <div className={style["input-group"]}>
            <AuthInput
              placeholder="자녀 이름(2~10자 이내)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.nameError && (
              <p className={style["error-text"]}>{errors.nameError}</p>
            )}
          </div>

          {/* 이메일 */}
          <div className={style["input-group"]}>
            <AuthInput
              placeholder="아이디 (이메일)"
              value={email}
              autoComplete="username"
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.emailError && (
              <p className={style["error-text"]}>{errors.emailError}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className={style["input-group"]}>
            <AuthInput
              placeholder="비밀번호 (영문 숫자 포함 10-20자)"
              type="password"
              value={password}
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.passwordError && (
              <p className={style["error-text"]}>{errors.passwordError}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className={style["input-group"]}>
            <AuthInput
              placeholder="비밀번호 확인"
              type="password"
              value={passwordConfirm}
              autoComplete="new-password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
            {errors.passwordConfirmError && (
              <p className={style["error-text"]}>
                {errors.passwordConfirmError}
              </p>
            )}
          </div>

          {/* 체크박스 동의 */}
          <div className={style["checkbox-group"]}>
            <label className={style["checkbox-item"]}>
              <input
                type="checkbox"
                checked={isOver14}
                onChange={(e) => setIsOver14(e.target.checked)}
              />
              <span>만 14세 이상입니다.</span>
            </label>
            <label className={style["checkbox-item"]}>
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
              />
              <span className={style["tos"]}>
                이용약관 동의 및 개인정보 처리 방침(필수)
              </span>
            </label>
          </div>

          <AuthBtn
            type="submit"
            text="가입하기"
            disabled={!canSubmit}
            canSubmit={canSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
