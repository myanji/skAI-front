import style from "./idioms-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import airplane from "./airplane.png";
import IdiomsQuestion from "../../../features/questions/Idioms/IdiomsQuestion/IdiomsQuestion";

const IdiomsPage = () => {
  return (
    <div>
      <Header />
      <section className={style["idioms-container"]}>
        <ProgressBar solvedCount={20} totalCount={100} />
        <h3>문제와 그림을 보고 해당하는 사자성어/속담을 클릭해주세요!</h3>
        <IdiomsQuestion
          image={airplane}
          question="날개가 고정된 채로 하늘을 나는 탈것이에요! 
          프로펠러를 돌리거나 뜨거운 바람을 내뿜어서 앞으로 슝~ 나아가요. 
          아주 오래전, 1903년에 미국의 라이트 형제가 처음으로 이것을 타고 날았어요!"
          idioms={["과유불급", "전화위복", "우이독경", "자업자득"]}
        />
      </section>
    </div>
  );
};

export default IdiomsPage;
