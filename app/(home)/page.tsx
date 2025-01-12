"use client";

import { useState } from "react";
import { Canvas, Stroke } from "./_components/canvas";
import { ColorMenu } from "./_components/color-menu";
import { RectangleLayer, type Color } from "./_models/canvas.model";
import { Erase } from "./_components/canvas/erase";
import { ToolMenu } from "./_components/tool-menu";
import { Cursor } from "./_components/canvas/cursor";
import { Rectangle } from "./_components/canvas/rectangle";

const CURSOR_STYLES = {
  pen: {
    width: 20,
    color: "#000000",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  eraser: {
    width: 40,
    color: "#ff0000",
    backgroundColor: "rgba(255, 0, 0, 0.1)",
  },
} as const;

export default function Home() {
  const [strokeColor, setStrokeColor] = useState<Color>({ r: 0, g: 0, b: 0 });
  const [currentTool, setCurrentTool] = useState<"pen" | "eraser" | "move">(
    "move"
  );
  const [rectangleLayers, setRectangleLayers] = useState<RectangleLayer[]>([]);

  return (
    <main className="p-4">
      <div className="flex gap-4 items-start mb-4">
        <ColorMenu onColorChange={setStrokeColor} />
        <ToolMenu
          onToolChange={setCurrentTool}
          onRectangleAdd={(rectangle) => {
            setRectangleLayers([...rectangleLayers, rectangle]);
          }}
          currentTool={currentTool}
        />
      </div>
      <div className="relative">
        <Canvas
          className="rounded border border-gray-500"
          width={800}
          height={600}
        >
          {(() => {
            switch (currentTool) {
              case "pen":
                return (
                  <Cursor style={CURSOR_STYLES.pen}>
                    <Stroke color={strokeColor} />
                  </Cursor>
                );
              case "eraser":
                return (
                  <Cursor style={CURSOR_STYLES.eraser}>
                    <Erase />
                  </Cursor>
                );
              default:
                return null;
            }
          })()}
          {rectangleLayers.map((rectangle, index) => (
            <Rectangle
              key={index}
              x={rectangle.x}
              y={rectangle.y}
              width={rectangle.width}
              height={rectangle.height}
            />
          ))}
        </Canvas>
      </div>
    </main>
  );
}
