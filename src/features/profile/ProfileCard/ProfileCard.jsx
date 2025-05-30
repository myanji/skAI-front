import style from "./profile-card.module.scss";
import { useState } from "react";

const ProfileCard = ({ frontData, backData }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // 카드 앞면
  const FrontFace = () => (
    <div className={style["card-front"]}>
      <img className={style.image} src={frontData.image} alt="프로필 이미지" />
      <h3 className={style.name}>{frontData.name}</h3>
      <p className={style.grade}>{frontData.grade}</p>
    </div>
  );

  // 카드 뒷면
  const BackFace = () =>
    backData && (
      <div className={style["card-back"]}>
        <p>
          <strong>이름 </strong>
          {backData.name}
        </p>
        <p>
          <strong>메일 </strong>
          {backData.email}
        </p>
        <p>
          <strong>가입날짜 </strong>
          {backData.joinDate}
        </p>
      </div>
    );

  // 뒷면 데이터가 없을 때 단순 2D 카드
  if (!backData) {
    return (
      <div className={style["card-wrapper"]}>
        <FrontFace />
      </div>
    );
  }

  // 뒷면 데이터가 있으면 3D 애니메이션 적용
  return (
    <div className={style["card-wrapper"]}>
      <div
        className={`${style["card-inner"]} 
        ${isFlipped ? style["flipped"] : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <FrontFace />
        <BackFace />
      </div>
    </div>
  );
};

export default ProfileCard;
