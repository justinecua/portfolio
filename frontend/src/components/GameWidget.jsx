import { useState, useRef, useEffect, useCallback } from "react";

const CANVAS_W = 280;
const CANVAS_H = 360;
const PADDLE_W = 54;
const PADDLE_H = 10;
const PADDLE_Y = CANVAS_H - 24;

function GameWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("ready"); // ready | playing | over
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [best, setBest] = useState(0);

  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  const stateRef = useRef({
    paddleX: CANVAS_W / 2 - PADDLE_W / 2,
    targetX: CANVAS_W / 2 - PADDLE_W / 2,
    blocks: [],
    spawnTimer: 0,
    speed: 2.2,
    score: 0,
    lives: 3,
  });

  const resetGame = useCallback(() => {
    stateRef.current = {
      paddleX: CANVAS_W / 2 - PADDLE_W / 2,
      targetX: CANVAS_W / 2 - PADDLE_W / 2,
      blocks: [],
      spawnTimer: 0,
      speed: 2.2,
      score: 0,
      lives: 3,
    };
    setScore(0);
    setLives(3);
  }, []);

  const startGame = () => {
    resetGame();
    setStatus("playing");
  };

  // ── input handling ──
  useEffect(() => {
    if (!open) return;

    const canvas = canvasRef.current;

    const moveTo = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      stateRef.current.targetX = Math.min(
        Math.max(x - PADDLE_W / 2, 0),
        CANVAS_W - PADDLE_W,
      );
    };

    const onKeyDown = (e) => {
      const s = stateRef.current;
      if (e.key === "ArrowLeft") s.targetX = Math.max(s.targetX - 26, 0);
      if (e.key === "ArrowRight")
        s.targetX = Math.min(s.targetX + 26, CANVAS_W - PADDLE_W);
    };

    const onPointerMove = (e) => {
      if (e.buttons === 1 || e.touches) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        moveTo(clientX);
      }
    };

    const onPointerDown = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      moveTo(clientX);
    };

    window.addEventListener("keydown", onKeyDown);
    canvas.addEventListener("mousemove", onPointerMove);
    canvas.addEventListener("mousedown", onPointerDown);
    canvas.addEventListener("touchstart", onPointerDown, { passive: true });
    canvas.addEventListener("touchmove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      canvas.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("mousedown", onPointerDown);
      canvas.removeEventListener("touchstart", onPointerDown);
      canvas.removeEventListener("touchmove", onPointerMove);
    };
  }, [open]);

  // ── game loop ──
  useEffect(() => {
    if (!open || status !== "playing") return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;

    const loop = () => {
      // paddle easing
      s.paddleX += (s.targetX - s.paddleX) * 0.25;

      // spawn blocks
      s.spawnTimer -= 1;
      if (s.spawnTimer <= 0) {
        s.spawnTimer = Math.max(34 - s.speed * 4, 16);
        s.blocks.push({
          x: Math.random() * (CANVAS_W - 18),
          y: -18,
          size: 14 + Math.random() * 8,
          hue: Math.floor(Math.random() * 360),
        });
      }

      // update blocks
      s.blocks.forEach((b) => (b.y += s.speed));

      // collisions / offscreen
      const remaining = [];
      for (const b of s.blocks) {
        const hit =
          b.y + b.size >= PADDLE_Y &&
          b.y <= PADDLE_Y + PADDLE_H &&
          b.x + b.size >= s.paddleX &&
          b.x <= s.paddleX + PADDLE_W;

        if (hit) {
          s.score += 1;
          setScore(s.score);
          s.speed = Math.min(s.speed + 0.05, 6);
          continue;
        }

        if (b.y > CANVAS_H) {
          s.lives -= 1;
          setLives(s.lives);
          continue;
        }

        remaining.push(b);
      }
      s.blocks = remaining;

      // draw
      ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.fillStyle = "rgba(255,255,255,0.03)";
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      s.blocks.forEach((b) => {
        ctx.fillStyle = `hsl(${b.hue}, 70%, 60%)`;
        ctx.fillRect(b.x, b.y, b.size, b.size);
      });

      ctx.fillStyle = "#39d0c8";
      ctx.fillRect(s.paddleX, PADDLE_Y, PADDLE_W, PADDLE_H);

      if (s.lives <= 0) {
        setStatus("over");
        setBest((prevBest) => Math.max(prevBest, s.score));
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [open, status]);

  return (
    <div className="game-widget">
      {open && (
        <div className="game-panel">
          <div className="game-panel-header">
            <div className="game-panel-title">🎮 Dodge &amp; Catch</div>
            <button
              className="game-close-btn"
              onClick={() => setOpen(false)}
              aria-label="Close game"
            >
              ✕
            </button>
          </div>

          <div className="game-stats">
            <span>Score: {score}</span>
            <span>Lives: {"❤️".repeat(Math.max(lives, 0))}</span>
            <span>Best: {best}</span>
          </div>

          <div className="game-canvas-wrap">
            <canvas
              ref={canvasRef}
              width={CANVAS_W}
              height={CANVAS_H}
              className="game-canvas"
            />

            {status !== "playing" && (
              <div className="game-overlay">
                {status === "over" ? (
                  <>
                    <p className="game-overlay-title">Game Over</p>
                    <p className="game-overlay-sub">Score: {score}</p>
                  </>
                ) : (
                  <p className="game-overlay-title">Dodge &amp; Catch</p>
                )}
                <button className="game-play-btn" onClick={startGame}>
                  {status === "over" ? "Play Again" : "Start"}
                </button>
                <p className="game-overlay-hint">
                  Move with ← → or drag / touch
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <button
        className="game-launcher"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open mini game"
      >
        {open ? "✕" : "🎮"}
      </button>
    </div>
  );
}

export default GameWidget;
