import DiaryCard from "../../../shared/ui/DiaryCard/DiaryCard";
import Header from "../../../widgets/Header/Header";
import diary0413 from "../../MainPage/assets/0413.png";
import beforediary from "../../MainPage/assets/beforediary.png";
import style from "./diary-create-page.module.scss";

const DiaryCreatePage = () => {
  return (
    <section className={style["diary-page"]}>
      <Header />
      <div className={style["diary-container"]}>
        <DiaryCard
          date="2025.04.13"
          beforediary={beforediary}
          image={diary0413}
          style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
        />
        <DiaryCard
          date="2025.04.13"
          text="오늘은 학교에 갔다. 친구들이랑 체육 시간에 공놀이를 했다. 내가 제일 멀리 던졌다! 기분이 좋았다. 점심시간에는 김밥이 나왔다. 맛있어서 두 번 먹었다. 집에 와서 엄마랑 같이 강아지 산책을 했다. 강아지가 방방 뛰어서 웃겼다. 오늘은 즐거운 하루였다."
          image={diary0413}
          style={{ backgroundColor: "#F5E7CB" }}
        />
      </div>
    </section>
  );
};

export default DiaryCreatePage;
