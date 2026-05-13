import { useCallback, useState } from 'react';
import Notification from '../components/Notification';

export function useNotification() {
  const [errorMessage, setErrorMessage] = useState('');

  const showError = useCallback((msg: string) => {
    setErrorMessage(msg);
  }, []);

  const dismiss = useCallback(() => setErrorMessage(''), []);

  const notification = errorMessage ? (
    <Notification errorMessage={errorMessage} onDismiss={dismiss} />
  ) : null;

  return { showError, notification };
}
