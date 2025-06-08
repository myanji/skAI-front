// src/widgets/Header/Header.jsx
import { useState, useEffect } from "react";
import style from "./header.module.scss";
import defaultImg from "../../pages/ProfileEditPage/assets/bear.png";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../shared/lib/api";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImg);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
      api
        .get("/api/profile/profile")
        .then((res) => setProfileImage(res.data.image || defaultImg))
        .catch(() => setProfileImage(defaultImg))
        .finally(() => setIsLoaded(true));
    } else {
      setIsLoaded(true);
    }
  }, []);

  // 현재 경로에 따라 active 처리
  const getMenuClass = (path) =>
    location.pathname.startsWith(path) ? style.active : "";

  return (
    <header className={style["header-container"]}>
      <h1 className={style["logo"]} onClick={() => navigate("/")}>
        <p>S</p>-KAI
      </h1>
      <nav>
        <ul className={style["menu"]}>
          <li
            className={getMenuClass("/step1")}
            onClick={() => navigate("/step1")}
          >
            1단계
          </li>
          <li
            className={getMenuClass("/step2")}
            onClick={() => navigate("/step2")}
          >
            2단계
          </li>
          <li
            className={getMenuClass("/step3")}
            onClick={() => navigate("/step3")}
          >
            3단계
          </li>
          <li
            className={getMenuClass("/Diary/Calendar")}
            onClick={() => navigate("/Diary/Calendar")}
          >
            일기
          </li>
        </ul>
      </nav>
      <div>
        {isLoaded && isLoggedIn ? (
          <button
            className={style["profile"]}
            onClick={() => navigate("/mypage")}
          >
            <img src={profileImage} alt="프로필" />
          </button>
        ) : isLoaded ? (
          <button
            className={style["login-btn"]}
            onClick={() => navigate("/signin")}
          >
            로그인
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
