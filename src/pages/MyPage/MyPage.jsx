import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/lib/api";
import ProfileCard from "../../features/profile/ProfileCard/ProfileCard";
import Header from "../../widgets/Header/Header";
import profileImg from "../ProfileEditPage/assets/bear.png";
import style from "./mypage.module.scss";
import ProfileBtn from "../../shared/ui/Button/ProfileBtn/ProfileBtn";
import useCalculateGrade from "../../shared/hooks/useCalculateGrade";

const MyPage = () => {
  const calculateGrade = useCalculateGrade();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile/profile");
        setProfileData(res.data);
      } catch (err) {
        console.error("프로필 정보 불러오기 실패:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/SignInPage");
  };

  return (
    <div className={style["layout"]}>
      <Header />
      <section className={style["mypage-container"]}>
        {profileData && (
          <ProfileCard
            frontData={{
              image: profileData.image || profileImg,
              name: profileData.nickname,
              grade: calculateGrade(profileData.birthday),
            }}
            backData={{
              name: profileData.kidsname,
              email: profileData.email,
              joinDate: profileData.createdAt.slice(0, 10),
            }}
          />
        )}

        <div
          className={style["mypage-btn"]}
          onClick={() => navigate("/profileeditpage")}
        >
          <ProfileBtn text="프로필 수정" />
        </div>
        <p className={style["logout"]} onClick={handleLogout}>
          로그아웃
        </p>
      </section>
    </div>
  );
};

export default MyPage;
