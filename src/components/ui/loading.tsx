'use client';

export const Loading = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-white/20 rounded-full animate-spin border-t-white"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-white/10 rounded-full animate-pulse"></div>
      </div>
    </div>
  );
};
