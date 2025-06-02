import ProfileCard from "../../features/profile/ProfileCard/ProfileCard";
import Header from "../../widgets/Header/Header";
import profileImg from "../ProfileEditPage/assets/bear.png";
import style from "./mypage.module.scss";
import ProfileBtn from "../../shared/ui/Button/ProfileBtn/ProfileBtn";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style["layout"]}>
      <Header />
      <section className={style["mypage-container"]}>
        <ProfileCard
          frontData={{
            image: profileImg,
            name: "맥스영",
            grade: "초등학교 1학년",
          }}
          backData={{
            name: "정민영",
            email: "1234@naver.com",
            joinDate: "2025.03.15",
          }}
        />
        <div
          className={style["mypage-btn"]}
          onClick={() => {
            navigate("/profileeditpage");
          }}
        >
          <ProfileBtn text="프로필 수정" />
        </div>
      </section>
    </div>
  );
};

export default MyPage;
