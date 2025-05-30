import style from "./profile-edit-Page.module.scss";
import Header from "../../widgets/Header/Header";
import ProfileCard from "../../features/profile/ProfileCard/ProfileCard";
import ProfileBtn from "../../shared/ui/Button/ProfileBtn/ProfileBtn";

import bear from "./assets/bear.png";
import bunny from "./assets/rabbit.png";
import cat from "./assets/cat.png";
import robot from "./assets/robot.png";

const ProfileEditPage = () => {
  return (
    <div>
      <Header />

      <div className={style["profile-edit-container"]}>
        <h2 className={style.title}>프로필 수정</h2>
        <section className={style.content}>
          <ProfileCard
            frontData={{
              image: bear,
              name: "맥스영",
              grade: "초등학교 1학년",
            }}
          />

          <div className={style.editor}>
            <div className={style["profile-img"]}>
              {[bear, bunny, cat, robot].map((avatar, idx) => (
                <img key={idx} src={avatar} className={style.profile} />
              ))}
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>닉네임</label>
              <input className={style.input} type="text" />
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>생일</label>
              <input className={style.input} type="date" />
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>성별</label>
              <div className={style["gender-btn-div"]}>
                <button className={style["gender-btn"]}>남</button>
                <button className={style["gender-btn"]}>여</button>
              </div>
            </div>
          </div>
        </section>
        <div className={style.saveBtn}>
          <ProfileBtn text="저장하기" />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
