import { useState, useEffect } from "react";
import style from "./header.module.scss";
import defaultImg from "../../pages/ProfileEditPage/assets/bear.png";
import { useNavigate } from "react-router-dom";
import api from "../../shared/lib/api";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileImage, setProfileImage] = useState(defaultImg);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);

      api
        .get("/api/profile/profile")
        .then((res) => {
          const userImg = res.data.image;
          setProfileImage(userImg || defaultImg);
        })
        .catch((err) => {
          console.error("프로필 이미지 불러오기 실패:", err);
          setProfileImage(defaultImg);
        })
        .finally(() => {
          setIsLoaded(true);
        });
    } else {
      setIsLoaded(true);
    }
  }, []);

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
        {isLoaded && isLoggedIn ? (
          <button
            className={style["profile"]}
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <img src={profileImage} alt="프로필" />
          </button>
        ) : isLoaded ? (
          <button
            className={style["login-btn"]}
            onClick={() => navigate("/SignInPage")}
          >
            로그인
          </button>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
