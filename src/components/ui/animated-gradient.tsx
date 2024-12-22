export const AnimatedGradient = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
      <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 opacity-50" />
    </div>
  );
};
