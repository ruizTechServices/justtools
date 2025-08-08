import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number; // Tailwind h-w value in px
}

export default function LoadingSpinner({ className, size = 24 }: LoadingSpinnerProps) {
  const inlineStyle: React.CSSProperties = {
    width: size,
    height: size,
  };

  return (
    <svg
      className={cn("animate-spin text-primary", className)}
      style={inlineStyle}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}
