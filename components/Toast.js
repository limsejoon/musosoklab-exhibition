import { useEffect } from 'react';

export default function Toast({ message, onClose }) {
  useEffect(() => {
    if (!message) return;
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      className="fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-white text-sm shadow-lg z-50 whitespace-nowrap"
      style={{ backgroundColor: '#1A1916' }}
    >
      {message}
    </div>
  );
}
