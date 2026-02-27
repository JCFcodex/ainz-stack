import { useId } from "react";
import { cn } from "@/lib/utils";
import { resolveInputErrorState } from "./input-a11y";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  errorId?: string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({
  className,
  type,
  error,
  errorId,
  id,
  ref,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const {
    inputId,
    hasError,
    errorMessage,
    errorMessageId,
    ariaDescribedBy: resolvedAriaDescribedBy,
  } = resolveInputErrorState({
    id,
    generatedId,
    error,
    errorId,
    describedBy: ariaDescribedBy,
  });

  return (
    <div className="relative">
      <input
        id={inputId}
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        aria-invalid={hasError}
        aria-describedby={resolvedAriaDescribedBy}
        {...props}
      />
      {errorMessage && errorMessageId && (
        <p
          id={errorMessageId}
          className="mt-1 text-xs text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
