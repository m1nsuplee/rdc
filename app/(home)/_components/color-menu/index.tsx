"use client";

import { useState } from "react";
import type { Color } from "../../_models/canvas.model";
import { colors } from "./colors";

interface ColorMenuProps {
  defaultColor?: Color;
  onColorChange?: (color: Color) => void;
}

export const ColorMenu = ({
  defaultColor = colors[0],
  onColorChange,
}: ColorMenuProps) => {
  const [selectedColor, setSelectedColor] = useState<Color>(defaultColor);

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
    onColorChange?.(color);
  };

  return (
    <div className="mb-4 flex gap-2">
      {colors.map((color, index) => (
        <button
          key={index}
          className={`h-8 w-8 rounded-full border-2 ${
            color === selectedColor ? "border-gray-500" : "border-transparent"
          }`}
          style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})` }}
          onClick={() => handleColorChange(color)}
        />
      ))}
    </div>
  );
};
