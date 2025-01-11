"use client";

import { useEffect, useState, type ReactElement } from "react";

interface CursorStyle {
  width: number;
  color: string;
  backgroundColor: string;
}

interface CursorProps {
  children: ReactElement;
  style: CursorStyle;
}

export const Cursor = ({ children, style }: CursorProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handlePointerEnter = () => setIsVisible(true);
    const handlePointerLeave = () => setIsVisible(false);

    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerenter", handlePointerEnter);
    canvas.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerenter", handlePointerEnter);
      canvas.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  if (!isVisible) return children;

  const cursorStyle = {
    position: "fixed" as const,
    left: position.x,
    top: position.y,
    width: style.width,
    height: style.width,
    transform: "translate(-50%, -50%)",
    pointerEvents: "none" as const,
    borderRadius: "50%",
    border: `2px solid ${style.color}`,
    backgroundColor: style.backgroundColor,
  };

  return (
    <>
      {children}
      <div style={cursorStyle} />
    </>
  );
};
