import { cn } from "@/lib/utils";

interface MartBridgeLogoProps {
  /** Size in pixels (height and width). Default is 72. */
  size?: number;
  /** Additional CSS class names */
  className?: string;
}

export function MartBridgeLogo({ size = 72, className }: MartBridgeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MartBridge logo"
      className={cn(className)}
    >
      {/* Navy "M" letter */}
      <path
        d="M12 58V20L24 38L36 20L48 38L60 20V58H52V36L42 52L36 42L30 52L20 36V58H12Z"
        fill="#0B1F3F"
      />
      {/* Orange bridge/arc motif */}
      <path
        d="M16 16C16 16 28 6 36 6C44 6 56 16 56 16"
        stroke="#F47920"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M22 22C22 22 30 14 36 14C42 14 50 22 50 22"
        stroke="#F47920"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}
