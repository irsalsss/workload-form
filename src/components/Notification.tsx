import { useEffect, useRef } from 'react';

const NOTIFICATION_DURATION_MS = 2000;

interface NotificationProps {
  errorMessage: string;
  onDismiss: () => void;
}

export default function Notification({
  errorMessage,
  onDismiss,
}: NotificationProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(onDismiss, NOTIFICATION_DURATION_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [errorMessage, onDismiss]);

  return (
    <div className="flex items-center gap-4 bg-white rounded-md p-4 shadow-md w-fit fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <button
        aria-label="Dismiss"
        className="bg-red-500 rounded-full text-white w-6 h-6 text-sm flex items-center justify-center cursor-pointer shrink-0"
        onClick={onDismiss}
      >
        X
      </button>

      <span>{errorMessage}</span>
    </div>
  );
}
