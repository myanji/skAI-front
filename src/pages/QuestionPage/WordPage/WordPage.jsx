import style from "./word-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import WordQuestion from "../../../features/questions/word/WordQuestion/WordQuestion";
import WordActions from "../../../features/questions/word/WordAction/WordActions";
import { useEffect, useState } from "react";
import api from "../../../shared/lib/api";
import { useLocation } from "react-router-dom";
import Modal from "../../../features/questions/Modal/Modal";

const WordPage = () => {
  const location = useLocation();
  const { level = 1 } = location.state || {};

  // 단어 배열
  const [wordList, setWordList] = useState([]);
  // 문제 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 답
  const [inputAnswer, setInputAnswer] = useState("");
  // 정답 여부
  const [isCorrect, setIsCorrect] = useState(null);
  // 모달 여부
  const [showModal, setShowModal] = useState(false);
  // 힌트 여부
  const [showHint, setShowHint] = useState(false);
  // 상태 추적
  const [submitted, setSubmitted] = useState(false);

  // 서버에서 word 불러오기
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/api/word/level", { params: { level } });

        if (Array.isArray(res.data) && res.data.length > 0) {
          setWordList(res.data);
          setCurrentIndex(0);
          setInputAnswer("");
          setIsCorrect(null);
          setShowHint(false);
          setSubmitted(false);
        }
      } catch (err) {
        console.error("word 문제 불러오기 실패", err);
      }
    };
    fetchQuestions();
  }, [level]);

  if (wordList.length === 0) {
    return (
      <div>
        <Header />
        <section className={style["word-container"]}>
          <p>문제를 불러오는 중입니다…</p>
        </section>
      </div>
    );
  }

  // 모든 문제를 다 풀었으면 완료 메시지 표시
  if (currentIndex >= wordList.length) {
    return (
      <div>
        <Header />
        <section className={style["word-container"]}>
          <p>모든 문제를 완료했습니다!</p>
        </section>
      </div>
    );
  }

  const currentQuestion = wordList[currentIndex];
  const correctAnswer = currentQuestion.word; // 정답 단어
  const wordId = currentQuestion.id; // 문제 ID
  const [hint, wordClass] = [currentQuestion.hint, currentQuestion.wordClass];

  // 현재 문제 객체 및 정답 정보
  const handleAnswer = () => {
    setSubmitted(true);

    // 사용자 입력값(inputAnswer)이 정답(correctAnswer)과 완전히 일치하면 true
    if (inputAnswer.trim() === correctAnswer) {
      setIsCorrect(true);
      setShowModal(true);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextFromModal = async () => {
    try {
      await api.post("/api/word/submit", {
        wordId: wordId,
        isCorrect: true,
      });
    } catch (err) {
      console.error("정답 기록 요청 실패", err);
    } finally {
      setShowModal(false);
      setInputAnswer("");
      setIsCorrect(null);
      setShowHint(false);
      setSubmitted(false);
      setCurrentIndex((prev) => (prev + 1 < wordList.length ? prev + 1 : prev));
    }
  };

  return (
    <div>
      <Header />
      <section className={style["word-container"]}>
        <ProgressBar
          solvedCount={currentQuestion.level_id}
          totalCount={wordList.length}
        />
        <WordQuestion
          image={currentQuestion.imageUrl}
          question={currentQuestion.content}
          inputValue={inputAnswer}
          onChange={(e) => {
            setInputAnswer(e.target.value);
            setIsCorrect(null);
            setSubmitted(false);
          }}
          isCorrect={isCorrect}
          submitted={submitted}
        />
        <WordActions
          inputValue={inputAnswer}
          onChange={(e) => setInputAnswer(e.target.value)}
          onSubmit={handleAnswer}
          onHintClick={() => setShowHint(true)}
          showHint={showHint}
          hint={hint}
          hintWordClass={wordClass}
          disabledSend={!inputAnswer || inputAnswer.trim() === ""}
        />

        {currentIndex === wordList.length - 1 && (
          <p className={style["end-message"]}>모든 문제를 완료했습니다!</p>
        )}
      </section>

      <Modal
        visible={showModal}
        title="정답이에요!"
        onConfirm={handleNextFromModal}
        correctAnswer={correctAnswer}
        shortContent={currentQuestion.shortContent}
      ></Modal>
    </div>
  );
};

export default WordPage;
