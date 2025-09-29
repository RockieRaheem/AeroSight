import { cn } from "@/lib/utils";

export const AeroSightLogo = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("fill-current text-primary", className)}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path d="M 50,10 L 60,30 L 90,30 L 65,45 L 75,65 L 50,50 L 25,65 L 35,45 L 10,30 L 40,30 Z"
            className="text-primary"
      />
      <circle cx="50" cy="50" r="35"
              className="stroke-current text-accent"
              strokeWidth="5"
              fill="none"
              strokeDasharray="15 10"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 50 50"
          to="360 50 50"
          dur="10s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  </svg>
);
