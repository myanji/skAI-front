import style from "./sentence-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import SentenceQuestion from "../../../features/questions/Sentence/SentenceQuestion/SentenceQuestion";
import SentenceAction from "../../../features/questions/Sentence/SentenceAction/SentenceAction";

const SentencePage = () => {
  return (
    <div>
      <Header />
      <section className={style["sentence-container"]}>
        <ProgressBar solvedCount={20} totalCount={100} />
        <h3>단어카드의 순서를 바꿔 올바른 문장을 만들어보세요!</h3>
        <p className={style["explanation"]}>
          정답이 맞다면 문장이 아래에 나타나요
        </p>
        <SentenceQuestion words={["하늘은", "맑아", "푸르고", "보인다."]} />
        <SentenceAction answer="하늘은 푸르고 맑아 보인다." />
      </section>
    </div>
  );
};

export default SentencePage;
