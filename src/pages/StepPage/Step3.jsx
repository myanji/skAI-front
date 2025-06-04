import style from "./step.module.scss";
import Header from "../../widgets/Header/Header";
import StepCard from "../../shared/ui/StepCard/StepCard";
import RoundedLabel from "../../shared/ui/RoundedLabel/RoundedLabel";
import word from "./assets/word.png";
import sentence from "./assets/sentence.png";
import dictation from "./assets/dictation.png";
import idioms from "./assets/idioms.png";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <section className={style["step-container"]}>
        <RoundedLabel text="3단계" />
        <div className={style["card-container"]}>
          <StepCard
            imageSrc={word}
            title={"단어 맞추기"}
            onClick={() => navigate("/word", { state: { level: 3 } })}
          />
          <StepCard
            imageSrc={sentence}
            title={"문장 순서 맞추기"}
            onClick={() => navigate("/sentence", { state: { level: 3 } })}
          />
          <StepCard
            imageSrc={dictation}
            title={"받아쓰기"}
            onClick={() => navigate("/dictation", { state: { level: 3 } })}
          />

          <StepCard
            imageSrc={idioms}
            title={"사자성어"}
            onClick={() => navigate("/idioms", { state: { level: 3 } })}
          />
        </div>
      </section>
    </div>
  );
};

export default Step3;
