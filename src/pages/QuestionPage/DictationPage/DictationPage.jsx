import style from "./dictation-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import MicButton from "../../../features/questions/dictation/MicButton/MicButton";
import CanvasToolbar from "../../../features/questions/dictation/CanvasToolbar/CanvasToolbar";
import SubmitButton from "../../../features/questions/dictation/SubmitButton/SubmitButton";

const DictationPage = () => {
  return (
    <div>
      <Header />
      <section className={style["dictation-container"]}>
        <ProgressBar solvedCount={20} totalCount={100} />
        <h3>아래 마이크를 눌러 소리를 듣고 맞춤법을 지켜서 따라 적어주세요!</h3>
        <MicButton />
        <CanvasToolbar />
        {/* <Canvas /> */}
        <SubmitButton />
      </section>
    </div>
  );
};

export default DictationPage;
