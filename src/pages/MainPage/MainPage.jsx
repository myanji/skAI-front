import Footer from "../../widgets/Footer/Footer";
import Header from "../../widgets/Header/Header";
import DiaryCard from "../../shared/ui/DiaryCard/DiaryCard";
import mainImg from "./assets/mainImg.png";
import style from "./main-page.module.scss";

import diary0411 from "./assets/0411.png";
import diary0413 from "./assets/0413.png";
import diary0415 from "./assets/0415.png";
import diary0418 from "./assets/0418.png";
import diary0501 from "./assets/0501.png";
import beforediary from "./assets/beforediary.png";
import step1 from "./assets/step1.png";
import step2 from "./assets/step2.png";
import step3 from "./assets/step3.png";

import RoundedLabel from "../../shared/ui/RoundedLabel/RoundedLabel";
import CurriculumCard from "../../features/Main/CurriculumCard/CurriculumCard";

import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <main className={style["layout"]}>
      <Header />
      <section className={style["first-section"]}>
        <div>
          <p className={style["subtitle-1"]}>
            우리 아이 <strong>국어 교육</strong> <br /> 이제는
            <strong> ai</strong> 와 함께
          </p>
          <h1>S-KAI</h1>
          <p className={style["subtitle-2"]}>
            2025년도부터는 새롭게 <br /> 국어교육도 남다르게 시작하자!
          </p>
        </div>
        <img src={mainImg} alt="곰과 로봇이 함께 공부하는 모습" />
      </section>
      <section className={style["second-section"]}>
        <div className={style["second-diary"]}>
          <DiaryCard
            date="2025.04.13"
            beforediary={beforediary}
            image={diary0413}
            color="보통"
            style={{ border: "1px solid #ddd", backgroundColor: "#FFFFFF" }}
          />
          <DiaryCard
            date="2025.04.13"
            text="오늘은 학교에 갔다. 친구들이랑 체육 시간에 공놀이를 했다. 내가 제일 멀리 던졌다! 기분이 좋았다. 점심시간에는 김밥이 나왔다. 맛있어서 두 번 먹었다. 집에 와서 엄마랑 같이 강아지 산책을 했다. 강아지가 방방 뛰어서 웃겼다. 오늘은 즐거운 하루였다."
            image={diary0413}
            color="보통"
            style={{ backgroundColor: "#F5E7CB" }}
          />
        </div>
        <p className={style["second-content"]}>
          일기를 적으면 맞춤법 검사와 귀여운 그림도 자동 생성! <br />
          오늘 하루를 기록하고, 깔끔하게 다듬고, 예쁜 그림으로 추억을
          남겨보세요!
        </p>
      </section>
      <section className={style["third-content"]}>
        <div className={style["diary-stack"]}>
          {[
            {
              date: "2025.04.11",
              text: "오늘은 학교에서 과학 실험을 했다. 색종이를 접어서 종이비행기를 만들어 날렸다. 내 비행기가 제일 멀리 날아가서 기분이 좋았다. 점심시간에는 떡볶이가 나왔다. 매콤하지만 맛있었다. 집에 와서 아빠랑 산책을 갔다. 저녁 하늘이 예뻐서 사진도 찍었다. 특별한 하루였다.",
              image: diary0411,
              color: "화남",
              style: { backgroundColor: "#FCC8C8" },
            },
            {
              date: "2025.04.15",
              text: "오늘은 친구 생일이었다. 아침에 친구한테 생일 축하한다고 말해줬다. 음악 시간에는 노래를 배웠는데 멜로디가 예뻤다. 점심시간에는 케이크도 나와서 신났다. 방과 후에는 학원에 갔다가 집에 와서 가족이랑 보드게임을 했다. 웃음이 가득한 하루였다.",
              image: diary0415,
              color: "기쁨",
              style: { backgroundColor: "#FCF5AF" },
            },
            {
              date: "2025.04.18",
              text: "오늘은 아침부터 비가 내렸다. 우산을 쓰고 학교에 갔는데, 빗소리가 조용해서 기분이 차분해졌다. 체육 시간에는 실내에서 줄넘기를 했다. 백 개 넘게 해서 뿌듯했다. 점심으로는 내가 좋아하는 카레가 나와서 맛있게 먹었다. 집에 와서는 창밖을 보며 책을 읽었다. 비 오는 날이었지만 마음은 따뜻한 하루였다",
              image: diary0418,
              color: "활기찬",
              style: { backgroundColor: "#FFD5AB" },
            },
            {
              date: "2025.05.01",
              text: "오늘 꿈은 조금 무서웠다. 어두운 숲에서 길을 잃었는데 갑자기 반짝이는 나비들이 나를 데려가 줬다. 나비들이 길을 밝혀줘서 무사히 집을 찾았다. 아침에 일어났을 땐 조금 무서웠지만, 다시 생각해보니 신비롭고 멋진 꿈이었다. 나비에게 고마웠다.",
              image: diary0501,
              color: "신비로운",
              style: { backgroundColor: "#E8CCEC" },
            },
          ].map((item, index) => (
            <DiaryCard
              key={index}
              color={item.color}
              date={item.date}
              text={item.text}
              image={item.image}
              style={item.style}
            />
          ))}
        </div>
        <p className={style["third-content"]}>
          하루하루 일기를 쓰며 나만의 일기를 모아보세요!
        </p>
      </section>
      <section className={style["final-content"]}>
        <RoundedLabel text="커리큘럼" />
        <div className={style["card-stack"]}>
          {[
            {
              image: step1,
              title: "1단계 가기",
              path: "/step1",
            },
            {
              image: step2,
              title: "2단계 가기",
              path: "/step2",
            },
            {
              image: step3,
              title: "3단계 가기",
              path: "/step3",
            },
          ].map((item, index) => (
            <CurriculumCard
              key={index}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              onClick={() => navigate(item.path)}
            />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default MainPage;
