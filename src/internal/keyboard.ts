export interface ComposingKeyboardEvent {
  key: string;
  isComposing?: boolean;
  nativeEvent?: {
    isComposing?: boolean;
  };
}

export function isComposingKeyboardEvent(event: ComposingKeyboardEvent): boolean {
  return (
    event.isComposing === true ||
    event.nativeEvent?.isComposing === true ||
    event.key === 'Process'
  );
}
