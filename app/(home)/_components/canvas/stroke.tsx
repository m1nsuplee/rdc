"use client";

import { useEffect, useRef, type PropsWithChildren } from "react";
import { useCanvasContext } from "./context";
import type { Color } from "../../_models/canvas.model";

interface StrokeProps extends PropsWithChildren {
  color?: Color;
  width?: number;
}

export const Stroke = ({
  color = { r: 0, g: 0, b: 0 },
  width = 2,
  children,
}: StrokeProps) => {
  const { context } = useCanvasContext();
  const isDrawing = useRef(false);

  useEffect(() => {
    if (!context) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      isDrawing.current = true;
      context.beginPath();
      context.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
      context.lineWidth = width;
      const { x, y } = getPointerPosition(e);
      context.moveTo(x, y);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDrawing.current) {
        return;
      }

      const { x, y } = getPointerPosition(e);
      context.lineTo(x, y);
      context.stroke();
    };

    const handlePointerUp = () => {
      isDrawing.current = false;
      context.closePath();
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
  }, [context, color, width]);

  return <>{children}</>;
};
