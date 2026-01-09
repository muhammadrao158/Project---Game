import React from 'react';

interface FeedbackProps {
  correct: boolean;
}

const Feedback: React.FC<FeedbackProps> = ({ correct }) => (
  <div className={`mt-8 text-4xl font-bold transition-all duration-300 ${correct ? 'text-green-500 animate-bounce' : 'text-red-400 animate-shake'}`}>
    {correct ? '✓' : '✕'}
  </div>
);

export default Feedback;

