export function LoopMark({ size = 40, animate = true }: { size?: number; animate?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={animate ? "loop-mark" : ""}
    >
      <path
        d="M50 12C71.5 12 88 28.5 88 50C88 71.5 71.5 88 50 88C28.5 88 12 71.5 12 50"
        stroke="#3B5BFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M12 50L2 42M12 50L2 58"
        stroke="#3B5BFF"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="50" cy="12" r="5" fill="#1FAA59" className={animate ? "pulse-node" : ""} style={{ animationDelay: "0s" }} />
      <circle cx="88" cy="50" r="5" fill="#C98A1F" className={animate ? "pulse-node" : ""} style={{ animationDelay: "0.6s" }} />
      <circle cx="50" cy="88" r="5" fill="#E2492D" className={animate ? "pulse-node" : ""} style={{ animationDelay: "1.2s" }} />
      <circle cx="12" cy="50" r="5" fill="#3B5BFF" className={animate ? "pulse-node" : ""} style={{ animationDelay: "1.8s" }} />
    </svg>
  );
}
