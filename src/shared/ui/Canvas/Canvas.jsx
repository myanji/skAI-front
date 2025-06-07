// src/shared/ui/Canvas/Canvas.jsx
import { useEffect, useRef, useState } from "react";
import style from "./canvas.module.scss";

const Canvas = ({
  mode,
  width = "40vw", // "50vw", "40vh", "100%", "300px" 등
  height = "50vh", // 마찬가지
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 1) 컴포넌트 마운트 또는 width/height 변경 시
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // (1) CSS 크기 지정
    container.style.width = width;
    container.style.height = height;

    // (2) 레이아웃이 반영된 다음 프레임에서 실제 픽셀 크기 측정
    requestAnimationFrame(() => {
      const { width: wPx, height: hPx } = container.getBoundingClientRect();

      // (3) 캔버스 내부 버퍼 크기를 실제 픽셀 크기로 설정
      canvas.width = Math.round(wPx);
      canvas.height = Math.round(hPx);

      // (4) 컨텍스트 초기화
      const context = canvas.getContext("2d");
      context.strokeStyle = "black";
      context.lineWidth = 2.5;
      context.lineCap = "round";
      context.globalCompositeOperation = "source-over";

      contextRef.current = context;
      setCtx(context);
    });
  }, [width, height]);

  // 2) 펜/지우개 모드가 바뀔 때마다 컨텍스트 설정만 업데이트
  useEffect(() => {
    const context = contextRef.current;
    if (!context) return;

    if (mode === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = 20;
    } else {
      context.globalCompositeOperation = "source-over";
      context.strokeStyle = "black";
      context.lineWidth = 2.5;
    }
  }, [mode]);

  // 3) 마우스 그리기
  const startDrawing = () => setIsDrawing(true);
  const finishDrawing = () => setIsDrawing(false);
  const drawing = ({ nativeEvent }) => {
    if (!ctx) return;
    const { offsetX, offsetY } = nativeEvent;
    if (!isDrawing) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  // 4) 터치 그리기
  const handleTouchStart = (e) => {
    e.preventDefault();
    const context = contextRef.current;
    if (!context) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const pressure = touch.force || 0.1;

    context.beginPath();
    context.moveTo(x, y);
    if (mode === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = pressure * 20;
    } else {
      context.globalCompositeOperation = "source-over";
      context.lineWidth = pressure * 2.5;
      context.strokeStyle = "black";
    }
    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;
    const context = contextRef.current;
    if (!context) return;
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const pressure = touch.force || 0.1;

    if (mode === "eraser") {
      context.globalCompositeOperation = "destination-out";
      context.lineWidth = pressure * 20;
    } else {
      context.globalCompositeOperation = "source-over";
      context.lineWidth = pressure * 2.5;
      context.strokeStyle = "black";
    }
    context.lineTo(x, y);
    context.stroke();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div className={style.canvas_wrap} ref={containerRef}>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={drawing}
        onMouseUp={finishDrawing}
        onMouseLeave={finishDrawing}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>
  );
};

export default Canvas;
