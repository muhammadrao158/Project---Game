import React from 'react';

interface TopBarProps {
  timeLeft: number;
  score: number;
  level: number;
}

const TopBar: React.FC<TopBarProps> = ({ timeLeft, score, level }) => (
  <div className="flex items-center justify-between w-full py-4 px-8 bg-gradient-to-r from-cyan-700 to-blue-700 text-white rounded-t-xl">
    <div className="text-2xl font-bold">Find the Rule</div>
    <div className="flex items-center gap-8">
      <div className="text-lg">Level {level}</div>
      <div className="flex items-center gap-4">
        <span className="text-xl font-semibold">Score: {score}</span>
        <div className="relative w-12 h-12">
          {/* Circle countdown - placeholder */}
          <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 40 40">
            <circle
              cx="20" cy="20" r="18"
              stroke="#fff" strokeWidth="4" fill="none" opacity={0.2}
            />
            <circle
              cx="20" cy="20" r="18"
              stroke="#fff" strokeWidth="4" fill="none"
              strokeDasharray={113}
              strokeDashoffset={(1 - timeLeft / 90) * 113}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-lg">{timeLeft}s</span>
        </div>
      </div>
    </div>
  </div>
);

export default TopBar;

