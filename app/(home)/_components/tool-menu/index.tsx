"use client";

import { LayerType, type RectangleLayer } from "../../_models/canvas.model";

interface ToolMenuProps {
  onToolChange: (tool: "pen" | "eraser") => void;
  onRectangleAdd: (rectangle: RectangleLayer) => void;
  currentTool: "pen" | "eraser";
}

export const ToolMenu = ({
  onToolChange,
  onRectangleAdd,
  currentTool,
}: ToolMenuProps) => {
  const createRectangleLayer = (): RectangleLayer => {
    return {
      type: LayerType.Rectangle,
      x: 400,
      y: 300,
      width: 100,
      height: 100,
      fill: { r: 0, g: 0, b: 0 },
    };
  };

  return (
    <div className="flex gap-2 mb-4">
      <button
        onClick={() => onToolChange("pen")}
        className={`px-4 py-2 rounded ${
          currentTool === "pen"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        ✏️ 펜
      </button>
      <button
        onClick={() => onToolChange("eraser")}
        className={`px-4 py-2 rounded ${
          currentTool === "eraser"
            ? "bg-blue-500 text-white"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        ⌫ 지우개
      </button>
      <button
        onClick={() => {
          const rectangle = createRectangleLayer();
          onRectangleAdd(rectangle);
        }}
        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
      >
        🎨 직사각형
      </button>
    </div>
  );
};
