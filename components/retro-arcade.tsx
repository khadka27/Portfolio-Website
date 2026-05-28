"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad, X, Play, RotateCcw, Award } from "lucide-react";

const GRID_SIZE = 20;
const CELL_COUNT = 20;
const INITIAL_SPEED = 120; // ms

type Point = { x: number; y: number };

export default function RetroArcade() {
  const [isOpen, setIsOpen] = useState(false);
  const [snake, setSnake] = useState<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 }); // Moving up
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("arcade-high-score");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  // Listen to open arcade event (e.g. from CLI or custom buttons)
  useEffect(() => {
    const handleOpenArcade = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-retro-arcade", handleOpenArcade);
    return () => window.removeEventListener("open-retro-arcade", handleOpenArcade);
  }, []);

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    let isOnSnake = true;
    while (isOnSnake) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      isOnSnake = currentSnake.some((segment) => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood!;
  }, []);

  const resetGame = () => {
    setSnake([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ]);
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const checkCollision = (head: Point): boolean => {
    // Check wall collision
    if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
      return true;
    }
    // Check self collision (except the tail segment if it moves)
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        return true;
      }
    }
    return false;
  };

  const moveSnake = useCallback(() => {
    if (!isPlaying || isGameOver) return;

    setSnake((prevSnake) => {
      const head = prevSnake[0];
      const newHead = {
        x: head.x + direction.x,
        y: head.y + direction.y,
      };

      if (checkCollision(newHead)) {
        setIsGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      const nextSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        const nextScore = score + 1;
        setScore(nextScore);
        if (nextScore > highScore) {
          setHighScore(nextScore);
          localStorage.setItem("arcade-high-score", nextScore.toString());
        }
        // Unlock achievement badge at 10 score
        if (nextScore >= 10) {
          window.dispatchEvent(new CustomEvent("achievement-unlock", { detail: { id: "arcade-master" } }));
        }
        setFood(generateFood(nextSnake));
      } else {
        nextSnake.pop(); // Remove tail
      }

      return nextSnake;
    });
  }, [isPlaying, isGameOver, direction, food, score, highScore, generateFood]);

  // Game tick loop
  useEffect(() => {
    if (isPlaying && !isGameOver) {
      gameLoopRef.current = setInterval(moveSnake, INITIAL_SPEED);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [isPlaying, isGameOver, moveSnake]);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      const keys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "Escape"];
      if (keys.includes(e.key)) {
        e.preventDefault(); // Stop page scrolling
      }

      if (e.key === "Escape") {
        setIsOpen(false);
        setIsPlaying(false);
        return;
      }

      if (!isPlaying) {
        if (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight") {
          setIsPlaying(true);
          if (isGameOver) resetGame();
        }
        return;
      }

      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          if (direction.y !== 1) setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          if (direction.y !== -1) setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          if (direction.x !== 1) setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          if (direction.x !== -1) setDirection({ x: 1, y: 0 });
          break;
        case " ":
          setIsPlaying(false); // Pause
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPlaying, isGameOver, direction]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100000] flex items-center justify-center p-4">
        
        {/* Retro Game cabinet frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="relative w-full max-w-[360px] bg-[#141b27] border-[6px] border-[#2f3d53] rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(251,146,60,0.15)] flex flex-col font-mono text-foreground"
        >
          {/* Top Yellow warning stripe */}
          <div className="h-2 bg-primary w-full" />

          {/* Header Panel */}
          <div className="p-4 bg-[#0d131f] border-b border-[#2f3d53] flex items-center justify-between select-none">
            <div className="flex items-center gap-2 text-primary font-bold text-sm">
              <Gamepad className="h-4.5 w-4.5 animate-[pulse_1.5s_infinite]" />
              <span>ARCADE_SHELL v0.9</span>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setIsPlaying(false);
              }}
              className="text-muted-foreground hover:text-red-500 transition-colors cursor-pointer"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          {/* Screen area with CRT curvature overlay */}
          <div className="relative bg-[#060a10] p-4 flex flex-col items-center">
            
            {/* Score HUD bar */}
            <div className="w-full flex justify-between items-center text-xs font-bold text-primary mb-3 px-1 select-none">
              <div className="flex items-center gap-1">
                <span>SCORE:</span>
                <span className="text-foreground">{score}</span>
              </div>
              <div className="flex items-center gap-1">
                <Award className="h-3.5 w-3.5" />
                <span>HIGH:</span>
                <span className="text-foreground">{highScore}</span>
              </div>
            </div>

            {/* Canvas/Game board grid */}
            <div 
              className="relative aspect-square w-full max-w-[280px] bg-[#020508] border border-primary/20 rounded-lg overflow-hidden flex flex-wrap"
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
                gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
              }}
            >
              {/* Scanline CRT overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none z-10" />

              {/* Render board cells */}
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                const x = idx % GRID_SIZE;
                const y = Math.floor(idx / GRID_SIZE);
                
                const isHead = snake[0].x === x && snake[0].y === y;
                const isSnakeSegment = snake.some((segment) => segment.x === x && segment.y === y);
                const isFoodCell = food.x === x && food.y === y;

                return (
                  <div
                    key={idx}
                    className="aspect-square transition-all duration-100"
                    style={{
                      backgroundColor: isHead
                        ? "var(--primary)"
                        : isSnakeSegment
                        ? "color-mix(in srgb, var(--primary) 70%, transparent)"
                        : isFoodCell
                        ? "#ef4444"
                        : "transparent",
                      borderRadius: isHead ? "4px" : isSnakeSegment ? "2px" : isFoodCell ? "50%" : "0",
                      transform: isFoodCell ? "scale(0.85)" : "none",
                      boxShadow: isFoodCell ? "0 0 8px rgba(239,68,68,0.6)" : "none",
                    }}
                  />
                );
              })}

              {/* Overlay states */}
              {!isPlaying && !isGameOver && (
                <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center p-6 text-center select-none">
                  <Play className="h-10 w-10 text-primary mb-3 animate-pulse" />
                  <h4 className="text-sm font-bold text-foreground mb-1">DEV_SNAKE GAME</h4>
                  <p className="text-[10px] text-muted-foreground leading-normal mb-5">
                    Eat bugs to debug the codebase. Reach 10 points to unlock badge.
                  </p>
                  <button
                    onClick={resetGame}
                    className="btn-primary py-2 px-6 rounded-lg text-xs font-bold"
                  >
                    Start Game
                  </button>
                  <span className="text-[9px] text-muted-foreground/60 mt-3">
                    Use Arrow / WASD keys to steer
                  </span>
                </div>
              )}

              {isGameOver && (
                <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center p-6 text-center select-none">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 font-extrabold text-lg mb-3">
                    !
                  </div>
                  <h4 className="text-sm font-bold text-red-400 mb-1">GAME OVER</h4>
                  <p className="text-[10px] text-muted-foreground mb-5">
                    System crash. Final score: {score}
                  </p>
                  <button
                    onClick={resetGame}
                    className="btn-outline flex items-center gap-1.5 py-2 px-6 rounded-lg text-xs font-bold border border-primary/30 hover:border-primary cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5 text-primary" /> Retry
                  </button>
                </div>
              )}
            </div>

            {/* Pause overlay helper */}
            {isPlaying && !isGameOver && (
              <span className="text-[9px] text-muted-foreground/50 mt-3 select-none">
                Press SPACE to Pause • ESC to Exit
              </span>
            )}
            
            {/* Paused state overlay */}
            {!isPlaying && !isGameOver && score > 0 && (
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center select-none">
                <span className="text-primary font-bold text-xs uppercase tracking-widest animate-pulse mb-3">GAME PAUSED</span>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="btn-primary py-2 px-6 rounded-lg text-xs font-bold"
                >
                  Resume
                </button>
              </div>
            )}
          </div>

          {/* Arcade Cabinet Panel Controller decals */}
          <div className="p-5 bg-[#0b0e15] border-t border-[#2f3d53] flex flex-col items-center gap-3 select-none">
            {/* Decal direction guide pad */}
            <div className="flex flex-col items-center gap-1.5 opacity-40">
              <span className="text-[8px] font-bold text-muted-foreground">DIRECTION CONTROL</span>
              <div className="grid grid-cols-3 gap-1 w-20">
                <div />
                <div className="h-5 bg-[#252f41] border border-border/50 rounded flex items-center justify-center text-[10px] text-muted-foreground">▲</div>
                <div />
                <div className="h-5 bg-[#252f41] border border-border/50 rounded flex items-center justify-center text-[10px] text-muted-foreground">◀</div>
                <div className="h-5 bg-[#252f41] border border-border/50 rounded flex items-center justify-center text-[10px] text-muted-foreground">▼</div>
                <div className="h-5 bg-[#252f41] border border-border/50 rounded flex items-center justify-center text-[10px] text-muted-foreground">▶</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
