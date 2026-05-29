'use client';

import { useState, useCallback } from 'react';

interface ToastProps {
  message: string;
  visible: boolean;
  error?: boolean;
}

export function Toast({ message, visible, error }: ToastProps) {
  return (
    <div
      className={`toast${visible ? ' show' : ''}`}
      style={{ background: error ? '#e74c3c' : '#2ecc71' }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}

export function useToast() {
  const [state, setState] = useState({ message: '', visible: false, error: false });

  const show = useCallback((message: string, error = false) => {
    setState({ message, visible: true, error });
    setTimeout(() => setState((p) => ({ ...p, visible: false })), 3000);
  }, []);

  return { toastState: state, showToast: show };
}
