"use client";

import { createContext, useContext } from "react";

interface CanvasContextType {
  context: CanvasRenderingContext2D | null;
}

export const CanvasContext = createContext<CanvasContextType>({
  context: null,
});

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("Canvas components must be used within a Canvas component");
  }

  return context;
};
