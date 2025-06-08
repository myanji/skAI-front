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
import Step2 from "../pages/StepPage/Step2";
import Step3 from "../pages/StepPage/Step3";
import CalendarPage from "../pages/DiaryPage/CalendarPage/CalendarPage";
import DiaryCreatePage from "../pages/DiaryCreatePage/DiaryCreatePage/DiaryCreatePage";
import DiaryPage from "../pages/DiaryPage/DiaryPage/DiaryPage";
import AntonymPage from "../pages/QuestionPage/AntonymPage/AntonymPage";
import Header from "../widgets/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />

        {/* 1단계 */}
        <Route path="step1">
          <Route index element={<Step1 />} />
          <Route path="word" element={<WordPage />} />
          <Route path="sentence" element={<SentencePage />} />
          <Route path="idioms" element={<IdiomsPage />} />
          <Route path="dictation" element={<DictationPage />} />
          <Route path="antonym" element={<AntonymPage />} />
        </Route>

        {/* 2단계 (필요하다면) */}
        <Route path="step2">
          <Route index element={<Step2 />} />
          <Route path="word" element={<WordPage />} />
          <Route path="sentence" element={<SentencePage />} />
          <Route path="idioms" element={<IdiomsPage />} />
          <Route path="dictation" element={<DictationPage />} />
          <Route path="antonym" element={<AntonymPage />} />
        </Route>

        {/* 3단계 */}
        <Route path="step3">
          <Route index element={<Step3 />} />
          <Route path="word" element={<WordPage />} />
          <Route path="sentence" element={<SentencePage />} />
          <Route path="idioms" element={<IdiomsPage />} />
          <Route path="dictation" element={<DictationPage />} />
          <Route path="antonym" element={<AntonymPage />} />
        </Route>

        <Route path="mypage" element={<MyPage />} />
        <Route path="profile-edit" element={<ProfileEditPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin" element={<SignInPage />} />

        {/* 일기 */}
        <Route path="diary">
          <Route path="create" element={<DiaryModeSelect />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="completion" element={<DiaryCreatePage />} />
          <Route path="view" element={<DiaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
