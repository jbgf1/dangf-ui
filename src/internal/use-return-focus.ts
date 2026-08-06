import { useCallback, useRef } from 'react';

export function useReturnFocus() {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const captureReturnFocus = useCallback(() => {
    const activeElement = document.activeElement;
    returnFocusRef.current =
      activeElement instanceof HTMLElement && activeElement !== document.body
        ? activeElement
        : null;
  }, []);

  const restoreReturnFocus = useCallback((event: Event) => {
    const returnFocus = returnFocusRef.current;
    if (!returnFocus?.isConnected) {
      return;
    }
    event.preventDefault();
    returnFocus.focus();
    returnFocusRef.current = null;
  }, []);

  return { captureReturnFocus, restoreReturnFocus };
}
