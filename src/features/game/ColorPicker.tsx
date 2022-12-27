import React from 'react';

interface ColorPickerProps {
  options: string[];
  value: string;
  onChange?: (value: string) => void;
}

export default function ColorPicker({ options, value, onChange }: ColorPickerProps) {
  const handleColorClick = (color: string) => {
    if (color !== value) {
      onChange?.(color);
    }
  };

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <div
          className={`w-8 h-8 rounded-full border-2 ${option === value ? 'border-brand' : 'border-white'}`}
          style={{ backgroundColor: option }}
          onClick={() => handleColorClick(option)}
        ></div>
      ))}
    </div>
  );
}
