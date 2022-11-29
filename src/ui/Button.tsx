import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant: 'default' | 'primary';
}
export default function Button({ label, variant, onClick }: ButtonProps) {
  return <button className="bg-brand text-text uppercase text-xl w-full p-2 rounded">{label}</button>;
}
