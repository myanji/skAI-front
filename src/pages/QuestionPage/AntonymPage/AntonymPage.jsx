import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AntonymQuestion from "../../../features/questions/Antonym/AntonymQuestion";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import style from "./antonym-page.module.scss";
import api from "../../../shared/lib/api";
import Modal from "../../../features/questions/Modal/Modal";

// 배열 섞기
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const AntonymPage = () => {
  const location = useLocation();
  const { level = 1 } = location.state || {};

  //  반의어 배열
  const [antonymList, setAntonymList] = useState([]);
  // 문제 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 섞인 배열
  const [options, setOptions] = useState([]);
  // 선택한 보기
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // 모달 여부
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchIdioms = async () => {
      try {
        const res = await api.get(`/api/proverbs/type/${level}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAntonymList(res.data);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("반의어 불러오기 실패", err);
      }
    };
    fetchIdioms();
  }, [level]);

  useEffect(() => {
    if (antonymList.length > 0 && currentIndex < antonymList.length) {
      const q = antonymList[currentIndex];
      const arr = [q.correct, q.wrong1, q.wrong2, q.wrong3];
      setOptions(shuffleArray(arr));
      // 문제를 바꿀 때마다 이전에 눌렀던 보기 강조 해제
      setSelectedAnswer(null);
    }
  }, [currentIndex, antonymList]);

  if (antonymList.length === 0) {
    return (
      <div>
        <Header />
        <section className={style["antonym-container"]}>
          <p>문제를 불러오는 중입니다…</p>
        </section>
      </div>
    );
  }
  if (currentIndex >= antonymList.length) {
    return (
      <div>
        <Header />
        <section className={style["antonym-container"]}>
          <p>모든 문제를 완료하셨습니다!</p>
        </section>
      </div>
    );
  }

  // 현재 문제 객체 및 정답 정보
  const currentQuestion = antonymList[currentIndex];
  const correctAnswer = currentQuestion.correct;
  const proverbId = currentQuestion.id;

  const handleAnswer = (chosen) => {
    if (selectedAnswer) return;
    setSelectedAnswer(chosen);

    if (chosen === correctAnswer) {
      setShowModal(true);
    } else {
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 500);
    }
  };

  const handleNextFromModal = async () => {
    try {
      await api.post(`/api/proverbs/${proverbId}`, null, {
        params: { isCorrect: true },
      });
    } catch (err) {
      console.error("정답 기록 요청 실패", err);
    } finally {
      // 모달 닫고, 강조 해제, 다음 문제로 인덱스 증가
      setShowModal(false);
      setSelectedAnswer(null);
      setCurrentIndex((prev) =>
        prev + 1 < antonymList.length ? prev + 1 : prev
      );
    }
  };

  return (
    <section>
      <div className={style["antonym-container"]}>
        <ProgressBar
          solvedCount={currentQuestion.level_id}
          totalCount={antonymList[antonymList.length - 1]?.level_id}
        />

        <h3>아래 단어와 대조되는 단어를 골라주세요</h3>

        <AntonymQuestion
          question={currentQuestion.content}
          antonyms={options}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
        />
      </div>
      <Modal
        visible={showModal}
        title="정답이에요!"
        onConfirm={handleNextFromModal}
      ></Modal>
    </section>
  );
};

export default AntonymPage;
