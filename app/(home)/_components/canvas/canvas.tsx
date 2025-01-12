"use client";

import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type PropsWithChildren,
} from "react";
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
  const rectRef = useRef({
    x: 400,
    y: 300,
    width: 100,
    height: 100,
  });
  const dragRef = useRef({
    isMouseDown: false,
    isRectSelected: false,
    prevMouseX: 0,
    prevMouseY: 0,
  });
  const animationFrameRef = useRef<number>(-1);

  const animate = useCallback(() => {
    if (!context) {
      return;
    }

    context.fillStyle = `rgb(${background.r}, ${background.g}, ${background.b})`;
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "black";
    context.beginPath();
    context.rect(
      rectRef.current.x,
      rectRef.current.y,
      rectRef.current.width,
      rectRef.current.height
    );
    context.stroke();

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [context, width, height, background]);

  const isRectangleClicked = (x: number, y: number): boolean => {
    if (
      x >= rectRef.current.x &&
      x <= rectRef.current.x + rectRef.current.width &&
      y >= rectRef.current.y &&
      y <= rectRef.current.y + rectRef.current.height
    ) {
      return true;
    }

    return false;
  };

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

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      dragRef.current.prevMouseX = x;
      dragRef.current.prevMouseY = y;
      dragRef.current.isMouseDown = true;

      if (isRectangleClicked(x, y)) {
        dragRef.current.isRectSelected = true;
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (dragRef.current.isMouseDown && dragRef.current.isRectSelected) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const dx = x - dragRef.current.prevMouseX;
        const dy = y - dragRef.current.prevMouseY;

        rectRef.current.x += dx;
        rectRef.current.y += dy;

        dragRef.current.prevMouseX = x;
        dragRef.current.prevMouseY = y;
      }
    };

    const handlePointerUp = () => {
      dragRef.current.isMouseDown = false;
      dragRef.current.isRectSelected = false;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("pointerleave", handlePointerUp);

    setContext(ctx);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("pointerleave", handlePointerUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height]);

  useEffect(() => {
    if (!context) {
      return;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [context, animate]);

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
