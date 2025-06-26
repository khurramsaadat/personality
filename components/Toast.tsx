"use client";
import React, { useEffect, useRef } from "react";

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (show) {
      timerRef.current = setTimeout(() => {
        onClose();
      }, 3000);
      return () => timerRef.current && clearTimeout(timerRef.current);
    }
  }, [show, onClose]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} bg-primary-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}
      role="status"
      aria-live="polite"
      style={{ minWidth: 220, maxWidth: 320 }}
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close notification"
      >
        &times;
      </button>
    </div>
  );
};

export default Toast; 