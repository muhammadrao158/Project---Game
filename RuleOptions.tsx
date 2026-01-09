import React from 'react';

interface RuleOptionsProps {
  options: string[];
  onSelect: (idx: number) => void;
  disabled?: boolean;
}

const colors = [
  'bg-cyan-500 hover:bg-cyan-600',
  'bg-blue-500 hover:bg-blue-600',
  'bg-indigo-500 hover:bg-indigo-600',
];

const RuleOptions: React.FC<RuleOptionsProps> = ({ options, onSelect, disabled }) => (
  <div className="flex flex-col md:flex-row gap-6 mt-12 w-full justify-center items-stretch">
    {options.map((opt, idx) => (
      <button
        key={idx}
        className={`flex-1 rounded-xl text-lg md:text-2xl px-8 py-7 font-semibold text-white shadow-md transition-all duration-150 outline-none ${colors[idx]} ${disabled ? 'opacity-50 cursor-not-allowed' : 'focus:ring-4'}`}
        onClick={() => onSelect(idx)}
        disabled={disabled}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default RuleOptions;

