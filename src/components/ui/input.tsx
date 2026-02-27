import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  ref?: React.Ref<HTMLInputElement>;
}

export function Input({ className, type, error, ref, ...props }: InputProps) {
  const hasError = !!error;
  const errorMessage = typeof error === "string" ? error : undefined;

  return (
    <div className="relative">
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          hasError && "border-destructive focus-visible:ring-destructive",
          className,
        )}
        ref={ref}
        aria-invalid={hasError}
        aria-describedby={errorMessage ? `${props.id}-error` : undefined}
        {...props}
      />
      {errorMessage && (
        <p
          id={`${props.id}-error`}
          className="mt-1 text-xs text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}
