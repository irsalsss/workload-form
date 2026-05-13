import { useEffect, useRef } from 'react';

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
    timerRef.current = setTimeout(onDismiss, 2000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [errorMessage]);

  return (
    <div className="flex items-center gap-4 bg-white rounded-md p-4 shadow-md w-fit fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <span className="bg-red-500 rounded-full text-white w-6 h-6 text-sm flex items-center justify-center">
        X
      </span>

      <span>{errorMessage}</span>
    </div>
  );
}
