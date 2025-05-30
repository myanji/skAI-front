import style from "./profile-btn.module.scss";

const ProfileBtn = ({ text }) => {
  return <button className={style.button}>{text}</button>;
};

export default ProfileBtn;
