import { useState, useEffect, useRef } from 'react';

const SLOGANS = ["Fund.", "Grow.", "Succeed."];
const MOVES = [
  { transform: "translateY(-28px) rotate(-4deg) scale(1.08)", duration: 320 },
  { transform: "translateY(0px) rotate(0deg) scale(1)", duration: 200 },
  { transform: "translateX(22px) translateY(-12px) rotate(6deg)", duration: 280 },
  { transform: "translateX(-18px) translateY(5px) rotate(-8deg)", duration: 260 },
  { transform: "translateY(0px) rotate(0deg) scale(1)", duration: 180 },
  { transform: "rotate(360deg) scale(1.12)", duration: 600 },
  { transform: "rotate(0deg) scale(1)", duration: 150 },
  { transform: "translateY(-36px) scale(1.18)", duration: 250 },
  { transform: "translateY(8px) scale(0.92)", duration: 160 },
  { transform: "translateY(0px) scale(1)", duration: 200 },
  { transform: "translateX(-24px) rotate(-12deg)", duration: 220 },
  { transform: "translateX(24px) rotate(12deg)", duration: 220 },
  { transform: "translateX(0px) rotate(0deg)", duration: 180 },
  { transform: "translateX(20px) translateY(-20px)", duration: 200 },
  { transform: "translateX(20px) translateY(20px)", duration: 200 },
  { transform: "translateX(-20px) translateY(20px)", duration: 200 },
  { transform: "translateX(-20px) translateY(-20px)", duration: 200 },
  { transform: "translateX(0px) translateY(0px)", duration: 200 },
];

export default function ImaraFundBrand() {
  const [slogan, setSlogan] = useState(0);
  const [animState, setAnimState] = useState("visible");
  const [charIndex, setCharIndex] = useState(0);
  const [imaraStyle, setImaraStyle] = useState({
    transform: "translateY(0px) rotate(0deg) scale(1)",
    transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)",
  });
  const moveRef = useRef(null);

  useEffect(() => {
    const runNextMove = () => {
      const move = MOVES[Math.floor(Math.random() * MOVES.length)];
      const delay = 600 + Math.random() * 1200;
      setImaraStyle({ transform: move.transform, transition: `transform ${move.duration}ms cubic-bezier(.34,1.56,.64,1)` });
      moveRef.current = setTimeout(() => {
        if (Math.random() > 0.4) {
          setImaraStyle({ transform: "translateY(0px) rotate(0deg) scale(1)", transition: "transform 250ms cubic-bezier(.34,1.56,.64,1)" });
          moveRef.current = setTimeout(runNextMove, delay);
        } else {
          moveRef.current = setTimeout(runNextMove, delay * 0.6);
        }
      }, move.duration + 80);
    };
    moveRef.current = setTimeout(runNextMove, 800);
    return () => clearTimeout(moveRef.current);
  }, []);

  useEffect(() => {
    const hold = setTimeout(() => setAnimState("exit"), 2200);
    return () => clearTimeout(hold);
  }, [slogan]);

  useEffect(() => {
    if (animState === "exit") {
      const word = SLOGANS[slogan];
      let i = word.length;
      const id = setInterval(() => {
        i--; setCharIndex(i);
        if (i <= 0) {
          clearInterval(id);
          setTimeout(() => {
            setSlogan(s => (s + 1) % SLOGANS.length);
            setCharIndex(0);
            setAnimState("enter");
          }, 100);
        }
      }, 55);
      return () => clearInterval(id);
    }
    if (animState === "enter") {
      const word = SLOGANS[slogan % SLOGANS.length];
      let i = 0;
      const id = setInterval(() => {
        i++; setCharIndex(i);
        if (i >= word.length) { clearInterval(id); setAnimState("visible"); }
      }, 65);
      return () => clearInterval(id);
    }
  }, [animState]);

  const currentWord = SLOGANS[slogan];
  const displayWord = animState === "exit" || animState === "enter" ? currentWord.slice(0, charIndex) : currentWord;
  const showCursor = animState === "exit" || animState === "enter";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&family=Space+Grotesk:wght@700&display=swap');

        .ib-root {
          display: inline-flex;
          flex-direction: column;
          align-items: flex-start;
          position: relative;
          user-select: none;
          gap: 4px;
       
         
        }

        .ib-brand {
          display: flex;
          align-items: baseline;
          gap: 0;
          line-height: 1;
          overflow: visible;
        }

        .ib-imara {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: clamp(56px, 10vw, 96px);
          letter-spacing: -3px;
          color: #503AFB;
          display: inline-block;
          transform-origin: center bottom;
          will-change: transform;
          cursor: default;
        }

        .ib-fund {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          font-size: clamp(56px, 10vw, 96px);
          letter-spacing: -3px;
          background: linear-gradient(135deg, #155DFC 0%, #9810FA 50%, #E60076 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          display: inline-block;
        }

        .ib-fund::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 100%;
          height: 4px;
          background: linear-gradient(90deg, #155DFC, #9810FA, #E60076);
          border-radius: 2px;
          animation: ibLine 1.2s cubic-bezier(.34,1.56,.64,1) forwards;
          transform-origin: left;
        }

        @keyframes ibLine {
          from { transform: scaleX(0); opacity: 0; }
          to   { transform: scaleX(1); opacity: 1; }
        }

        .ib-space { display: inline-block; width: 0.22em; }

        .ib-slogan-row {
          display: flex;
          align-items: center;
          gap: 6px;
          height: clamp(44px, 7vw, 68px);
          padding-left: 6px;
        }

        .ib-slogan {
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 700;
          font-size: clamp(36px, 6vw, 62px);
          letter-spacing: -1.5px;
          background: linear-gradient(135deg, #155DFC 0%, #9810FA 50%, #E60076 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% 200%;
          animation: ibGrad 3s ease infinite;
          line-height: 1;
        }

        @keyframes ibGrad {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .ib-cursor {
          display: inline-block;
          width: 4px;
          height: clamp(34px, 5.5vw, 58px);
          background: linear-gradient(180deg, #155DFC, #E60076);
          border-radius: 2px;
          animation: ibBlink .55s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes ibBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }

        .ib-dot {
          position: absolute;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: linear-gradient(135deg, #155DFC, #E60076);
          top: 6px;
          right: -18px;
          animation: ibFloat 2.2s ease-in-out infinite;
        }

        @keyframes ibFloat {
          0%, 100% { transform: translateY(0) scale(1); opacity: .85; }
          50%       { transform: translateY(-8px) scale(1.4); opacity: 1; }
        }
      `}</style>

      <div className="ib-root">
        <div className="ib-brand">
          <span className="ib-imara" style={imaraStyle}>Imara</span>
          <span className="ib-space" />
          <span className="ib-fund">
            Fund
            <span className="ib-dot" />
          </span>
        </div>
        <div className="ib-slogan-row">
          <span className="ib-slogan">{displayWord}</span>
          {showCursor && <span className="ib-cursor" />}
        </div>
      </div>
    </>
  );
}
