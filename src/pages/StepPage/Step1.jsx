import style from "./step.module.scss";
import Header from "../../widgets/Header/Header";
import StepCard from "../../shared/ui/StepCard/StepCard";
import RoundedLabel from "../../shared/ui/RoundedLabel/RoundedLabel";
import word from "./assets/word.png";
import sentence from "./assets/sentence.png";
import dictation from "./assets/dictation.png";
import idioms from "./assets/idioms.png";

const Step1 = () => {
  return (
    <div>
      <Header />
      <section className={style["step-container"]}>
        <RoundedLabel text="1단계" />
        <div className={style["card-container"]}>
          <StepCard imageSrc={word} title={"단어 맞추기"} />
          <StepCard imageSrc={sentence} title={"문장 순서 맞추기"} />
          <StepCard imageSrc={dictation} title={"받아쓰기"} />
          <StepCard imageSrc={idioms} title={"반의어 찾기"} />
        </div>
      </section>
    </div>
  );
};

export default Step1;
