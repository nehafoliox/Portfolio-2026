"use client";

import { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, isVisible, onDismiss }: ToastProps) {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setIsLeaving(false);
      const timer = setTimeout(() => {
        setIsLeaving(true);
        setTimeout(onDismiss, 300);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);

  if (!isVisible && !isLeaving) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 z-[100] ${
        isLeaving ? "animate-toast-out" : "animate-toast-in"
      }`}
    >
      <div className="flex items-center gap-2 bg-surface-dark text-white px-6 py-3 rounded-full shadow-xl">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        <span className="text-caption font-medium">{message}</span>
      </div>
    </div>
  );
}
