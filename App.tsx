import { useState, useEffect, useMemo } from "react";
import TopBar from "./components/TopBar";
import NumberBoard from "./components/NumberBoard";
import RuleOptions from "./components/RuleOptions";
import Feedback from "./components/Feedback";
import { getGeneratedSequence } from "./game/sequenceGenerators";
import type { GameState } from "./game/gameStates";

export default function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [selected, setSelected] = useState<number | null>(null);

  const current = useMemo(() => {
    if (gameState === "start" || gameState === "end") {
      return { sequence: [], rules: [], correctIdx: 0 };
    }
    return getGeneratedSequence(level);
  }, [level, gameState]);

  // Timer effect
  useEffect(() => {
    if (gameState !== "playing") return;
    if (timeLeft <= 0) {
      setGameState("end");
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, timeLeft]);

  const handleStart = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(90);
    setGameState("playing");
    setSelected(null);
  };

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === current.correctIdx) {
      setScore((s) => s + 50);
      setGameState("feedback_correct");
      setTimeout(() => {
        setLevel((l) => l + 1);
        setSelected(null);
        setGameState("playing");
      }, 1000);
    } else {
      setGameState("feedback_incorrect");
      setTimeout(() => {
        setSelected(null);
        setGameState("playing");
      }, 1000);
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #cffafe, #bfdbfe)',
        alignItems: 'center',
        padding: '2rem 1rem'
      }}
    >
      <TopBar timeLeft={timeLeft} score={score} level={level} />
      
      <div style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(1rem, 2vw, 2rem)',
        gap: 'clamp(1rem, 2vw, 2rem)',
        position: 'relative',
        boxSizing: 'border-box'
      }}>
        {/* Left Sidebar */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: 'clamp(80px, 10vw, 120px)',
          minWidth: '60px',
          gap: '1rem',
          paddingTop: 'clamp(1rem, 2vw, 2rem)',
          flexShrink: 0
        }}>
          <div style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 'bold',
            color: '#FFFFFF',
            marginBottom: '1rem'
          }}>
            1st
          </div>
          <div style={{
            width: '4px',
            height: 'clamp(200px, 30vh, 300px)',
            backgroundColor: '#FFFFFF',
            borderRadius: '2px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)'
            }}>
              🏁
            </div>
          </div>
          <div style={{
            marginTop: 'auto',
            paddingBottom: 'clamp(1rem, 2vw, 2rem)',
            fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)',
            color: '#FFFFFF',
            fontWeight: 'bold',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            BRAIN<br />RACERS
          </div>
        </div>

        {/* Main Content */}
        <main 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 'clamp(1rem, 2vw, 2rem)',
            minHeight: '400px',
            position: 'relative',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }}
        >
        {gameState === "start" && (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              gap: '2rem'
            }}
          >
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#FFFFFF', margin: 0 }}>Rule Reveal</h1>
            <button 
              onClick={handleStart}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0B4F5C',
                padding: '1rem 3rem',
                borderRadius: '12px',
                fontSize: '1.5rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
              }}
            >
              Get Ready
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState.startsWith("feedback")) && (
          <>
            <div style={{ marginBottom: '2rem', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <NumberBoard sequence={current.sequence} />
            </div>
            <RuleOptions
              options={current.rules}
              onSelect={handleSelect}
              disabled={selected !== null || gameState !== "playing"}
            />
            {gameState === "feedback_correct" && <Feedback correct />}
            {gameState === "feedback_incorrect" && <Feedback correct={false} />}
          </>
        )}

        {gameState === "end" && (
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '400px',
              gap: '1rem'
            }}
          >
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FFFFFF', margin: 0 }}>Time's up!</h2>
            <div style={{ fontSize: '1.5rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>Your Score: {score}</div>
            <button 
              onClick={handleStart}
              style={{
                backgroundColor: '#FFFFFF',
                color: '#0B4F5C',
                padding: '0.75rem 2rem',
                borderRadius: '12px',
                fontSize: '1.25rem',
                fontWeight: '600',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              }}
            >
              Play Again
            </button>
          </div>
        )}
        </main>
      </div>

      {/* Bottom Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        left: '2rem',
        zIndex: 100
      }}>
        <button
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.2)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            backdropFilter: 'blur(10px)'
          }}
          onClick={() => {/* Sound toggle - placeholder */}}
        >
          🔊
        </button>
      </div>

      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100
      }}>
        <button
          style={{
            padding: '0.75rem 2rem',
            borderRadius: '24px',
            backgroundColor: '#FFFFFF',
            color: '#0B4F5C',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
          }}
          onClick={() => {/* Share functionality - placeholder */}}
        >
          SHARE
        </button>
      </div>
    </div>
  );
}
