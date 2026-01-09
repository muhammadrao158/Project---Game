import React from 'react';

interface TopBarProps {
  timeLeft: number;
  score: number;
  level: number;
}

const TopBar: React.FC<TopBarProps> = ({ timeLeft, score, level }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1rem 2rem',
    backgroundColor: '#0B4F5C',
    color: '#FFFFFF',
    position: 'relative'
  }}>
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '25%',
      transform: 'translateX(-50%)',
      fontSize: 'clamp(1rem, 2vw, 1.5rem)',
      fontWeight: 'bold',
      color: '#FFFFFF',
      whiteSpace: 'nowrap'
    }}>
      Choose the Correct Answer
    </div>
    
    {/* Timer - Centered, below text */}
    <div style={{
      position: 'absolute',
      left: '50%',
      top: '80%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: 'clamp(48px, 8vw, 64px)', 
        height: 'clamp(48px, 8vw, 64px)', 
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <svg 
          className="absolute top-0 left-0 w-full h-full" 
          viewBox="0 0 40 40" 
          style={{ transform: 'rotate(-90deg)' }}
        >
          <circle
            cx="20" cy="20" r="18"
            stroke="rgba(255,255,255,0.3)" 
            strokeWidth="4" 
            fill="none"
          />
          <circle
            cx="20" cy="20" r="18"
            stroke={timeLeft <= 10 ? '#E25B2A' : '#FFFFFF'} 
            strokeWidth="4" 
            fill="none"
            strokeDasharray={113}
            strokeDashoffset={(1 - timeLeft / 90) * 113}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.5s' }}
          />
        </svg>
        <span 
          style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(1rem, 2vw, 1.5rem)',
            fontWeight: 'bold',
            zIndex: 10,
            color: '#FFFFFF'
          }}
        >
          {timeLeft}
        </span>
      </div>
    </div>

    {/* Score - Right side */}
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: 'clamp(1rem, 2vw, 1.25rem)',
      fontWeight: 'bold',
      color: '#F5C542',
      marginLeft: 'auto'
    }}>
      <span>💰</span>
      <span>{score}</span>
    </div>
  </div>
);

export default TopBar;

