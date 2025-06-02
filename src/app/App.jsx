import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import Step1 from "../pages/StepPage/Step1";
import WordPage from "../pages/QuestionPage/WordPage/WordPage";
import SentencePage from "../pages/QuestionPage/SentencePage/SentencePage";
import IdiomsPage from "../pages/QuestionPage/IdiomsPage/IdiomsPage";
import DictationPage from "../pages/QuestionPage/DictationPage/DictationPage";
import MyPage from "../pages/MyPage/MyPage";
import ProfileEditPage from "../pages/ProfileEditPage/ProfileEditPage";
import DiaryModeSelect from "../pages/DiaryCreatePage/DiaryModeSelect/DiaryModeSelect";
import SignUpPage from "../pages/AuthPage/SignUpPage/SignUpPage";
import SignInPage from "../pages/AuthPage/SignInPage/SignInPage";
import SignUpFinishPage from "../pages/AuthPage/SignUpFinishPage/SignUpFinishPage";
import Step2 from "../pages/StepPage/Step2";
import Step3 from "../pages/StepPage/Step3";
import CalendarPage from "../pages/DiaryPage/CalendarPage/CalendarPage";
import DiaryCreatePage from "../pages/DiaryCreatePage/DiaryCreatePage/DiaryCreatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/Step1" element={<Step1 />} />
        <Route path="/Step2" element={<Step2 />} />
        <Route path="/Step3" element={<Step3 />} />
        <Route path="/Word" element={<WordPage />} />
        <Route path="/Sentence" element={<SentencePage />} />
        <Route path="/Idioms" element={<IdiomsPage />} />
        <Route path="/Dictation" element={<DictationPage />} />
        <Route path="/MyPage" element={<MyPage />} />
        <Route path="/ProfileEditPage" element={<ProfileEditPage />} />
        <Route path="/DiaryCreate" element={<DiaryModeSelect />} />
        <Route path="/SignUpPage" element={<SignUpPage />} />
        <Route path="/SignInPage" element={<SignInPage />} />
        <Route path="/Calendar" element={<CalendarPage />} />
        <Route path="/DiaryCreatePage" element={<DiaryCreatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
