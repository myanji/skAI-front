import { useEffect, useRef, useState } from "react";
import style from "./canvas.module.scss";

const Canvas = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.5;
    canvas.height = window.innerHeight;

    const context = canvas.getContext("2d");
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    context.lineCap = "round";
    contextRef.current = context;
    setCtx(context);
  }, []);

  const startDrawing = () => setIsDrawing(true);
  const finishDrawing = () => setIsDrawing(false);

  const drawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    if (!ctx) return;

    if (!isDrawing) {
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
    } else {
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    }
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const pressure = touch.force || 0.1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = pressure * 10;
    ctx.strokeStyle = "black";
    ctx.globalCompositeOperation = "source-over";
    setIsDrawing(true);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!isDrawing) return;

    const touch = e.touches[0];
    const rect = canvasRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const pressure = touch.force || 0.1;
    ctx.lineWidth = pressure * 10;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handleTouchEnd = () => {
    setIsDrawing(false);
  };

  return (
    <div>
      <div className={style["canvas_wrap"]}>
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={drawing}
          onMouseUp={finishDrawing}
          onMouseLeave={finishDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        ></canvas>
      </div>
    </div>
  );
};

export default Canvas;
