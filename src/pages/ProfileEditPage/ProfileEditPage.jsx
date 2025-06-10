import { useEffect, useState } from "react";
import style from "./profile-edit-Page.module.scss";
import ProfileCard from "../../features/profile/ProfileCard/ProfileCard";
import ProfileBtn from "../../shared/ui/Button/ProfileBtn/ProfileBtn";
import api from "../../shared/lib/api";
import useCalculateGrade from "../../shared/hooks/useCalculateGrade";
import { useNavigate } from "react-router-dom";

const avatarOptions = [
  "/avatars/bear.png",
  "/avatars/rabbit.png",
  "/avatars/cat.png",
  "/avatars/robot.png",
];

const ProfileEditPage = () => {
  const calculateGrade = useCalculateGrade();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    kidsname: "",
    birthday: "",
    nickname: "닉네임",
    gender: "",
    image: "/avatars/bear.png",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/profile/profile");
        const data = res.data;
        setFormData({
          kidsname: data.kidsname || "",
          birthday: data.birthday || "",
          nickname: data.nickname || "",
          gender: data.gender || "",
          image: data.image || "/avatars/bear.png",
        });
      } catch (err) {
        console.error("프로필 정보 불러오기 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({ ...prev, gender }));
  };

  const handleAvatarSelect = (image) => {
    setFormData((prev) => ({ ...prev, image }));
  };

  const handleSave = async () => {
    try {
      await api.put("/api/profile/set/profile", {
        ...formData,
        image: formData.image,
      });
      navigate("/mypage");
    } catch (err) {
      console.error("저장 실패:", err);
    }
  };

  return (
    <div className={style["layout"]}>
      <div className={style["profile-edit-container"]}>
        <h2 className={style.title}>프로필 수정</h2>
        <section className={style.content}>
          <ProfileCard
            frontData={{
              image: formData.image,
              name: formData.nickname,
              grade: calculateGrade(formData.birthday),
            }}
          />

          <div className={style.editor}>
            <div className={style["profile-img"]}>
              {avatarOptions.map((avatar, idx) => (
                <img
                  key={idx}
                  src={avatar}
                  className={`${style.profile} ${
                    formData.image === avatar ? style.selected : ""
                  }`}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>닉네임</label>
              <input
                className={style.input}
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleChange}
              />
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>생일</label>
              <input
                className={style.input}
                type="date"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
              />
            </div>

            <div className={style["input-div"]}>
              <label className={style.label}>성별</label>
              <div className={style["gender-btn-div"]}>
                <button
                  className={`${style["gender-btn"]} ${
                    formData.gender === "boy" ? style.selected : ""
                  }`}
                  onClick={() => handleGenderSelect("boy")}
                >
                  남
                </button>
                <button
                  className={`${style["gender-btn"]} ${
                    formData.gender === "girl" ? style.selected : ""
                  }`}
                  onClick={() => handleGenderSelect("girl")}
                >
                  여
                </button>
              </div>
            </div>
          </div>
        </section>
        <div className={style.saveBtn} onClick={handleSave}>
          <ProfileBtn text="저장하기" />
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
