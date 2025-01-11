"use client";

import { useEffect } from "react";
import { useCanvasContext } from "./context";

interface RectangleProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function Rectangle({ x, y, width, height }: RectangleProps) {
  const { context } = useCanvasContext();

  useEffect(() => {
    if (!context) {
      return;
    }

    context.beginPath();
    context.strokeStyle = "#000000"; // 검은색으로 설정
    context.rect(x, y, width, height);
    context.stroke();
  }, [context]);

  return <></>;
}
