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
      // Anim + next level delay
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-100 to-blue-200 items-center">
      <div className="w-full max-w-3xl mx-auto mt-8 rounded-xl shadow-lg">
        <TopBar timeLeft={timeLeft} score={score} level={level} />
      </div>
      <main className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl">
        {gameState === "start" && (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-4xl font-bold mb-8">Rule Reveal</h1>
            <button className="bg-cyan-600 text-white py-4 px-12 rounded-lg text-2xl font-semibold shadow-lg hover:bg-cyan-700 transition" onClick={handleStart}>
              Get Ready
            </button>
          </div>
        )}

        {(gameState === "playing" || gameState.startsWith("feedback")) && (
          <>
            <div className="mt-16 mb-8 w-full flex justify-center">
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
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-3xl font-bold mb-4">Time's up!</h2>
            <div className="text-2xl mb-2">Your Score: {score}</div>
            <button className="bg-cyan-600 text-white py-2 px-8 rounded-lg text-xl font-semibold shadow-lg hover:bg-cyan-700" onClick={handleStart}>
              Play Again
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
