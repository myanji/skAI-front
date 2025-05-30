import style from "./word-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import WordQuestion from "../../../features/questions/word/WordQuestion/WordQuestion";
import WordActions from "../../../features/questions/word/WordAction/WordActions";
import airplane from "./airplane.png";

const WordPage = () => {
  return (
    <div>
      <Header />
      <section className={style["word-container"]}>
        <ProgressBar solvedCount={20} totalCount={100} />
        <WordQuestion
          image={airplane}
          question="날개가 고정된 채로 하늘을 나는 탈것이에요! 프로펠러를 돌리거나 뜨거운
          바람을 내뿜어서 앞으로 슝~ 나아가요. 아주 오래전, 1903년에 미국의
          라이트 형제가 처음으로 이것을 타고 날았어요!"
        />
        <WordActions />
      </section>
    </div>
  );
};

export default WordPage;
