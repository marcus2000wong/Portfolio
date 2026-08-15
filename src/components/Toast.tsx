import React from 'react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex items-center gap-3 bg-zinc-900/95 text-white border border-zinc-700/80 px-4 py-3 rounded-full shadow-2xl backdrop-blur-md animate-bounce-short">
      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
      <span className="text-xs sm:text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-zinc-400 hover:text-white text-xs cursor-pointer focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};
