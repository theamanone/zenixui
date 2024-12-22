import { cn } from "@/lib/utils";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative flex flex-col items-center justify-center overflow-hidden", containerClassName)}>
      <svg
        className="absolute left-0 top-0 h-[100vh] w-full -translate-y-48 scale-x-150 [mask-image:radial-gradient(circle_at_center,white,transparent_75%)]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--color-primary)' }} />
            <stop offset="100%" style={{ stopColor: 'var(--color-secondary)' }} />
          </linearGradient>
        </defs>
        <g className="animate-wave opacity-20">
          <path
            d="M0 200 Q 100 150 200 200 Q 300 250 400 200 Q 500 150 600 200 Q 700 250 800 200 Q 900 150 1000 200 V 400 H 0 Z"
            fill="url(#gradient)"
          />
        </g>
        <g className="animate-wave-2 opacity-20">
          <path
            d="M0 250 Q 100 200 200 250 Q 300 300 400 250 Q 500 200 600 250 Q 700 300 800 250 Q 900 200 1000 250 V 400 H 0 Z"
            fill="url(#gradient)"
          />
        </g>
        <g className="animate-wave-3 opacity-20">
          <path
            d="M0 300 Q 100 250 200 300 Q 300 350 400 300 Q 500 250 600 300 Q 700 350 800 300 Q 900 250 1000 300 V 400 H 0 Z"
            fill="url(#gradient)"
          />
        </g>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
