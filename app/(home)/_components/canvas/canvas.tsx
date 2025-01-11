"use client";

import { useEffect, useRef, useState, type PropsWithChildren } from "react";
import { CanvasContext } from "./context";
import type { Color } from "../../_models/canvas.model";

interface CanvasProps extends PropsWithChildren {
  width?: number;
  height?: number;
  className?: string;
  background?: Color;
}

export const Canvas = ({
  width = 800,
  height = 600,
  className = "",
  background = { r: 255, g: 255, b: 255 },
  children,
}: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    setContext(ctx);
  }, [width, height]);

  useEffect(() => {
    if (!context) {
      return;
    }

    context.fillStyle = `rgb(${background.r}, ${background.g}, ${background.b})`;
    context.fillRect(0, 0, width, height);
  }, [context]);

  return (
    <CanvasContext.Provider value={{ context }}>
      <canvas
        ref={canvasRef}
        className={className}
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      />
      {children}
    </CanvasContext.Provider>
  );
};
