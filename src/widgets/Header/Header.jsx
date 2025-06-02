import { useState, useEffect } from "react";
import style from "./header.module.scss";
import profileimg from "../../pages/ProfileEditPage/assets/bear.png";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  });

  return (
    <header className={style["header-container"]}>
      <h1 className={style["logo"]} onClick={() => navigate("/")}>
        <p>S</p>-KAI
      </h1>

      <nav>
        <ul className={style["menu"]}>
          <li onClick={() => navigate("/step1")}>1단계</li>
          <li onClick={() => navigate("/step2")}>2단계</li>
          <li onClick={() => navigate("/step3")}>3단계</li>
          <li onClick={() => navigate("/Calendar")}>일기</li>
        </ul>
      </nav>

      <div>
        {isLoggedIn ? (
          <button
            className={style["profile"]}
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <img src={profileimg} />
          </button>
        ) : (
          <button
            className={style["login-btn"]}
            onClick={() => navigate("/SignInPage")}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
