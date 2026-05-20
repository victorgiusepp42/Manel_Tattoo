import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (coarse || reduced) {
      document.body.classList.add("custom-cursor-off");
      return;
    }
    setEnabled(true);

    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role='button'], summary, .carousel__item"));
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className={`custom-cursor ${hover ? "custom-cursor--hover" : ""}`}
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 2v14M8 10l4 6 4-6"
          stroke="#f87171"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <ellipse cx="12" cy="19" rx="2" ry="3" fill="#b91c1c" opacity="0.85" />
      </svg>
    </div>
  );
}
