"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import { useCanvasContext } from "./context";

interface EraseProps extends PropsWithChildren {
  width?: number;
}

export const Erase = ({ width = 20, children }: EraseProps) => {
  const { context } = useCanvasContext();
  const isErasing = useRef(false);

  useEffect(() => {
    if (!context) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      isErasing.current = true;
      context.beginPath();
      context.globalCompositeOperation = 'destination-out';
      context.strokeStyle = 'rgba(0,0,0,1)';
      context.lineWidth = width;
      const { x, y } = getPointerPosition(e);
      context.moveTo(x, y);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isErasing.current) {
        return;
      }

      const { x, y } = getPointerPosition(e);
      context.lineTo(x, y);
      context.stroke();
    };

    const handlePointerUp = () => {
      isErasing.current = false;
      context.closePath();
      context.globalCompositeOperation = 'source-over'; // 원래 모드로 복구
    };

    const getPointerPosition = (e: PointerEvent) => {
      const rect = context.canvas.getBoundingClientRect();
      const scaleX = context.canvas.width / rect.width;
      const scaleY = context.canvas.height / rect.height;
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };

    const canvas = context.canvas;
    canvas.style.touchAction = "none";

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);
    canvas.addEventListener("pointercancel", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
      canvas.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [context, width]);

  return <>{children}</>;
};