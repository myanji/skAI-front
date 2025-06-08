import style from "./idioms-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import IdiomsQuestion from "../../../features/questions/Idioms/IdiomsQuestion/IdiomsQuestion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
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

const IdiomsPage = () => {
  const location = useLocation();
  const { level = 1 } = location.state || {};

  // 사자성어/속담 배열
  const [idiomList, setIdiomList] = useState([]);
  // 문제 인덱스
  const [currentIndex, setCurrentIndex] = useState(0);
  // 섞인 배열
  const [options, setOptions] = useState([]);
  // 선택한 보기
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // 모달 여부
  const [showModal, setShowModal] = useState(false);

  // 서버에서 사자성어/속담 목록 불러오기
  useEffect(() => {
    const fetchIdioms = async () => {
      try {
        const res = await api.get(`/api/proverbs/type/${level}`);
        if (Array.isArray(res.data) && res.data.length > 0) {
          setIdiomList(res.data);
          setCurrentIndex(0);
        }
      } catch (err) {
        console.error("속담 불러오기 실패", err);
      }
    };
    fetchIdioms();
  }, [level]);

  // 2) currentIndex 혹은 idiomList가 바뀔 때마다,
  //    “한 번 섞인” 보기 배열을 새로 생성해서 options에 저장
  useEffect(() => {
    if (idiomList.length > 0 && currentIndex < idiomList.length) {
      const q = idiomList[currentIndex];
      const arr = [q.correct, q.wrong1, q.wrong2, q.wrong3];
      setOptions(shuffleArray(arr));
      // 문제를 바꿀 때마다 이전에 눌렀던 보기 강조 해제
      setSelectedAnswer(null);
    }
  }, [currentIndex, idiomList]);

  // 3) 로딩 중 혹은 문제를 모두 풀었을 때 조기 반환
  if (idiomList.length === 0) {
    return (
      <div>
        <Header />
        <section className={style["idioms-container"]}>
          <p>사자성어/속담을 불러오는 중입니다…</p>
        </section>
      </div>
    );
  }
  if (currentIndex >= idiomList.length) {
    return (
      <div>
        <Header />
        <section className={style["idioms-container"]}>
          <p>모든 사자성어/속담 문제를 완료하셨습니다!</p>
        </section>
      </div>
    );
  }

  // 4) 현재 문제 객체 및 정답 정보
  const currentQuestion = idiomList[currentIndex];
  const correctAnswer = currentQuestion.correct;
  const proverbId = currentQuestion.id;

  // 5) 보기 클릭 핸들러
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

  // 6) 모달에서 “다음문제 풀기” 클릭 시
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
        prev + 1 < idiomList.length ? prev + 1 : prev
      );
    }
  };

  return (
    <div>
      <Header />
      <section className={style["idioms-container"]}>
        <ProgressBar
          solvedCount={currentQuestion.level_id}
          totalCount={idiomList[idiomList.length - 1]?.level_id}
        />

        <h3 className={style["instruction"]}>
          문제와 그림을 보고 해당하는 사자성어/속담을 클릭해주세요!
        </h3>

        <IdiomsQuestion
          image={currentQuestion.imageUrl}
          question={currentQuestion.content}
          idioms={options}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          correctAnswer={correctAnswer}
        />
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

export default IdiomsPage;
