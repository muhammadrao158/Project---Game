import React from 'react';

interface NumberBoardProps {
  sequence: (number | null)[];
}

const NumberBoard: React.FC<NumberBoardProps> = ({ sequence }) => {
  if (!sequence || sequence.length === 0) {
    return null;
  }
  return (
    <div style={{
      backgroundColor: '#083E49',
      border: 'clamp(6px, 1vw, 8px) solid #9C6A2E',
      borderRadius: '12px',
      padding: 'clamp(2rem, 4vw, 3rem) clamp(1.5rem, 3vw, 2rem)',
      minHeight: 'clamp(150px, 25vh, 200px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
      width: '100%',
      maxWidth: '100%',
      boxSizing: 'border-box'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        fontWeight: 'bold',
        color: '#FFFFFF',
        gap: 'clamp(0.5rem, 1.5vw, 1rem)',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {sequence.map((num, idx) => (
          <React.Fragment key={idx}>
            <span style={{ color: num === null ? '#CDEEEF' : '#FFFFFF' }}>
              {num === null ? '?' : num}
            </span>
            {idx < sequence.length - 1 && (
              <span style={{ color: '#FFFFFF', margin: '0 0.5rem' }}>,</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NumberBoard;

