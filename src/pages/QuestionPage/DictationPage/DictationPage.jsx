// src/pages/Dictation/DictationPage/DictationPage.jsx
import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import style from "./dictation-page.module.scss";
import ProgressBar from "../../../shared/ui/ProgressBar/ProgressBar";
import Header from "../../../widgets/Header/Header";
import CanvasToolbar from "../../../shared/ui/Button/CanvasToolbar/CanvasToolbar";
import Canvas from "../../../shared/ui/Canvas/Canvas";
import api from "../../../shared/lib/api";
import micIcon from "./mic.png";
import voiceIcon from "./voice.png";
import Modal from "../../../features/questions/Modal/Modal";
import { useLocation } from "react-router-dom";

const DictationPage = () => {
  const [tool, setTool] = useState("pencil");
  const location = useLocation();
  const { level = 1 } = location.state || {};

  // 사운드 재생 상태
  const [loadingSound, setLoadingSound] = useState(false);
  const [played, setPlayed] = useState(false);

  // 현재 문제의 ID, level_id
  const [dictationId, setDictationId] = useState(null);
  const [levelId, setLevelID] = useState(null);

  // OCR 결과
  const [ocrResult, setOcrResult] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // 모달 표시
  const [showModal, setShowModal] = useState(false);

  // 캔버스 리셋용 키 & ref
  const [canvasKey, setCanvasKey] = useState(0);
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const { data: items } = await api.get("/api/dictation/unsolved", {
          params: { level },
        });
        if (items.length > 0) {
          const first = items[0];
          setDictationId(first.id);
          setLevelID(first.levelId);
        }
      } catch (err) {
        console.error("첫 문제 정보 로드 실패", err);
      }
    })();
  }, [level]);

  const handlePlaySound = async () => {
    if (loadingSound || !dictationId) return;
    setLoadingSound(true);
    try {
      const res = await api.get("/api/dictation/unsolved", {
        params: { level },
      });
      const item = res.data.find((it) => it.id === dictationId);
      if (!item?.soundsUrl) throw new Error("재생할 URL이 없습니다.");

      const audio = new Audio(item.soundsUrl);
      audio.onended = () => setPlayed(false);
      await audio.play();
      setPlayed(true);
    } catch (err) {
      console.error("음성 재생 실패", err);
      alert("소리를 재생할 수 없습니다.");
    } finally {
      setLoadingSound(false);
    }
  };

  const handleSubmit = async () => {
    if (!dictationId) {
      alert("먼저 소리를 들어야 합니다.");
      return;
    }
    setSubmitting(true);
    try {
      const shot = await html2canvas(canvasContainerRef.current);
      const blob = await new Promise((r) => shot.toBlob(r, "image/jpeg"));
      const form = new FormData();
      form.append("image", blob, "dictation.jpg");

      const res = await api.post("/api/dictation/ocr/result", form, {
        params: { dictationId },
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOcrResult(res.data);
    } catch (err) {
      console.error("OCR 제출 실패", err);
      alert("작성한 내용을 인식할 수 없습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRewrite = () => {
    setOcrResult("");
    setCanvasKey((k) => k + 1);
  };

  const handleCompare = async () => {
    try {
      const { data } = await api.post("/api/dictation/compare", {
        dictationId,
      });
      if (data.status === "CORRECT") {
        setShowModal(true);
      } else {
        alert("아직 틀린 부분이 있어요. 다시 확인해 주세요.");
      }
    } catch (err) {
      console.error("비교 API 실패", err);
      alert("결과를 확인할 수 없습니다.");
    }
  };

  const handleNext = () => {
    setShowModal(false);
    setOcrResult("");
    setPlayed(false);
    setCanvasKey((k) => k + 1);

    api
      .get("/api/dictation/unsolved", { params: { level } })
      .then(({ data: items }) => {
        if (items.length > 0) {
          setDictationId(items[0].id);
          setLevelID(items[0].level_id);
        }
      })
      .catch((e) => console.error("다음 문제 로드 실패", e));
  };

  return (
    <div>
      <section className={style["dictation-container"]}>
        <ProgressBar solvedCount={levelId} totalCount={100} />

        <h3>아래 마이크를 눌러 소리를 듣고 맞춤법을 지켜서 따라 적어주세요!</h3>

        {/* 사운드 버튼 */}
        <div className={style["mike-wrapper"]}>
          <button
            className={style["mike-box"]}
            onClick={handlePlaySound}
            disabled={loadingSound}
          >
            <img
              src={played ? voiceIcon : micIcon}
              alt={played ? "재생 완료" : "마이크"}
              style={{ opacity: loadingSound ? 0.5 : 1 }}
            />
          </button>
        </div>

        {!ocrResult ? (
          <>
            {/*  캔버스 쓰기 모드 */}
            <div className={style["canvas-div"]}>
              <CanvasToolbar tool={tool} onToolChange={setTool} />
              <div
                className={style.canvas}
                ref={canvasContainerRef}
                key={canvasKey}
              >
                <Canvas mode={tool} width="80vh" height="20vh" />
              </div>
            </div>
            <button
              className={style["btn_send"]}
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? "제출 중…" : "확인"}
            </button>
          </>
        ) : (
          <>
            {/*  OCR 결과 모드 */}
            <div className={style["ocr-result"]}>
              <h4>인식 결과</h4>
              <p className={style["ocr-result-text"]}>{ocrResult}</p>
              <div className={style["answer_div"]}></div>
              <div className={style["ocr-result-actions"]}>
                <button
                  className={style["btn_rewrite"]}
                  onClick={handleRewrite}
                >
                  다시 쓰기
                </button>
                <button
                  className={style["btn_confirm"]}
                  onClick={handleCompare}
                >
                  확인
                </button>
              </div>
            </div>
          </>
        )}

        <Modal visible={showModal} title="정답이에요!" onConfirm={handleNext} />
      </section>
    </div>
  );
};

export default DictationPage;
