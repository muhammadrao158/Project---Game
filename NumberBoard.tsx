import React from 'react';

interface NumberBoardProps {
  sequence: (number | null)[];
}

const NumberBoard: React.FC<NumberBoardProps> = ({ sequence }) => (
  <div className="bg-gradient-to-br from-cyan-200 to-blue-200 shadow-lg rounded-xl py-10 px-14 flex justify-center items-center min-h-[120px]">
    <div className="flex gap-6 text-4xl md:text-6xl font-extrabold text-slate-800">
      {sequence.map((num, idx) => (
        <span key={idx} className={num === null ? 'text-gray-300' : ''}>
          {num === null ? '?': num}
        </span>
      ))}
    </div>
  </div>
);

export default NumberBoard;

