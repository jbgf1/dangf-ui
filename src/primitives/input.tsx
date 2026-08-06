import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
  type CompositionEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
} from 'react';

import { cn } from '../internal/cn';
import { isComposingKeyboardEvent } from '../internal/keyboard';

export type InputCommitSource = 'blur' | 'compositionEnd';
export type InputType = 'text' | 'search' | 'email' | 'url' | 'tel' | 'password';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  type?: InputType;
  onValueChange?: (value: string) => void;
  onCommit?: (value: string, source: InputCommitSource) => void;
  deferValueChangeDuringComposition?: boolean;
  ignoreKeyDownWhileComposing?: boolean;
  syncDefaultValueWhenBlurred?: boolean;
}

function resolveInputValue(
  value: InputHTMLAttributes<HTMLInputElement>['defaultValue'],
): string {
  return value === undefined || value === null ? '' : String(value);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      defaultValue,
      deferValueChangeDuringComposition = false,
      ignoreKeyDownWhileComposing = true,
      onBlur,
      onChange,
      onCommit,
      onCompositionEnd,
      onCompositionStart,
      onKeyDown,
      onValueChange,
      syncDefaultValueWhenBlurred = true,
      type = 'text',
      value,
      ...props
    },
    forwardedRef,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isComposingRef = useRef(false);

    const assignRef = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof forwardedRef === 'function') {
          forwardedRef(node);
        } else if (forwardedRef) {
          forwardedRef.current = node;
        }
      },
      [forwardedRef],
    );

    useEffect(() => {
      if (!syncDefaultValueWhenBlurred || value !== undefined) {
        return;
      }
      const input = inputRef.current;
      if (!input || isComposingRef.current || document.activeElement === input) {
        return;
      }
      const nextValue = resolveInputValue(defaultValue);
      if (input.value !== nextValue) {
        input.value = nextValue;
      }
    }, [defaultValue, syncDefaultValueWhenBlurred, value]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      if (!deferValueChangeDuringComposition || !isComposingRef.current) {
        onValueChange?.(event.currentTarget.value);
      }
    };

    const handleCompositionStart = (event: CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = true;
      onCompositionStart?.(event);
    };

    const handleCompositionEnd = (event: CompositionEvent<HTMLInputElement>) => {
      isComposingRef.current = false;
      onCompositionEnd?.(event);
      if (deferValueChangeDuringComposition) {
        onValueChange?.(event.currentTarget.value);
      }
      onCommit?.(event.currentTarget.value, 'compositionEnd');
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      onBlur?.(event);
      onCommit?.(event.currentTarget.value, 'blur');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      if (ignoreKeyDownWhileComposing && isComposingKeyboardEvent(event)) {
        return;
      }
      onKeyDown?.(event);
    };

    return (
      <input
        ref={assignRef}
        data-slot="input"
        type={type}
        value={value}
        defaultValue={defaultValue}
        onChange={handleChange}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'dgf:flex dgf:h-10 dgf:w-full dgf:rounded-[var(--dgf-radius-sm)] dgf:border dgf:border-[var(--dgf-color-border)] dgf:bg-[var(--dgf-color-surface)] dgf:px-3 dgf:py-2 dgf:text-sm dgf:text-[var(--dgf-color-text)] dgf:placeholder:text-[var(--dgf-color-text-muted)] dgf:focus-visible:outline-none dgf:focus-visible:ring-2 dgf:focus-visible:ring-[var(--dgf-color-accent)] dgf:disabled:cursor-not-allowed dgf:disabled:opacity-50',
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';
