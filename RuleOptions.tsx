import React from 'react';

interface RuleOptionsProps {
  options: string[];
  onSelect: (idx: number) => void;
  disabled?: boolean;
}

const RuleOptions: React.FC<RuleOptionsProps> = ({ options, onSelect, disabled }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(0.75rem, 1.5vw, 1rem)',
    marginTop: 'clamp(1rem, 2vw, 2rem)',
    width: '100%',
    maxWidth: '600px'
  }}>
    {options.map((opt, idx) => (
      <button
        key={idx}
        onClick={() => onSelect(idx)}
        disabled={disabled}
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          color: '#0B4F5C',
          padding: 'clamp(1rem, 2vw, 1.5rem) clamp(1.5rem, 3vw, 2rem)',
          borderRadius: '12px',
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          fontWeight: '600',
          border: 'none',
          cursor: disabled ? 'not-allowed' : 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          transition: 'all 0.2s',
          opacity: disabled ? 0.6 : 1,
          minHeight: 'clamp(50px, 8vh, 60px)',
          width: '100%'
        }}
        onMouseOver={(e) => {
          if (!disabled) {
            e.currentTarget.style.transform = 'scale(1.02)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
          }
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        }}
      >
        {opt}
      </button>
    ))}
  </div>
);

export default RuleOptions;

