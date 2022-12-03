import React from 'react';

export interface TextInputProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
}
export default function TextInput({ label, value, onChange }: TextInputProps) {
  return (
    <div className="flex flex-col w-full gap-1">
      <label className="text-brand text-sm">{label}</label>
      <input
        type="text"
        className="rounded p-2 focus:outline-none text-text-alt"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      ></input>
    </div>
  );
}
