// src/pages/Sentence/SentencePage/SentencePage.jsx
import { useState, useEffect } from "react";
import style from "./sentence-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import SentenceAction from "../../../features/questions/Sentence/SentenceAction/SentenceAction";
import Modal from "../../../features/questions/Modal/Modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import api from "../../../shared/lib/api";

const SentencePage = () => {
  const { level = 1 } = location.state || {};

  const [cards, setCards] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [sentenceId, setSentenceId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // 문제 불러오기 헬퍼
  const loadQuestion = async () => {
    try {
      const res = await api.get("/api/sentences/shuffle/next", {
        params: { level },
      });
      const items = res.data;
      console.log(items);
      setCards(items);
      if (items.length > 0) {
        setSentenceId(items[0].level_id);
      }
      const sorted = [...items].sort((a, b) => a.order - b.order);
      setCorrectAnswer(sorted.map((it) => it.content).join(" "));
      // 모든 UI 상태 초기화
      setShowAnswer(false);
      setShowModal(false);
    } catch (err) {
      console.error("문장 카드 로드 실패", err);
    }
  };

  // 마운트 시 한 번 로드
  useEffect(() => {
    loadQuestion();
  }, [level]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newCards = Array.from(cards);
    const [moved] = newCards.splice(result.source.index, 1);
    newCards.splice(result.destination.index, 0, moved);
    setCards(newCards);

    const attempt = newCards.map((it) => it.content).join(" ");
    if (attempt === correctAnswer) {
      setShowAnswer(true);

      // 1. 1.5초 뒤 정답 기록 & 모달 띄우기
      setTimeout(async () => {
        try {
          if (sentenceId !== null) {
            await api.post(`/api/sentences/${sentenceId}`, null, {
              params: { isCorrect: true },
            });
          }
        } catch (err) {
          console.error("정답 기록 요청 실패", err);
        } finally {
          setShowModal(true);
        }
      }, 1800);
    }
  };

  const handleModalConfirm = () => {
    // 모달 닫고 다음 문제 로드
    setShowModal(false);
    loadQuestion();
  };

  return (
    <div>
      <Header />

      <section className={style["sentence-container"]}>
        <ProgressBar solvedCount={sentenceId} totalCount={100} />

        <h3>단어카드의 순서를 바꿔 올바른 문장을 만들어보세요!</h3>
        <p className={style["explanation"]}>
          정답이 맞다면 문장이 아래에 나타나요
        </p>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="sentence-cards" direction="horizontal">
            {(provided) => (
              <div
                className={style["cards-wrapper"]}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((card, idx) => (
                  <Draggable
                    key={card.id}
                    draggableId={String(card.id)}
                    index={idx}
                  >
                    {(prov) => (
                      <div
                        className={style.card}
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        {card.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        {showAnswer && <SentenceAction answer={correctAnswer} />}

        <Modal
          visible={showModal}
          title="정답이에요!"
          onConfirm={handleModalConfirm}
        />
      </section>
    </div>
  );
};

export default SentencePage;
