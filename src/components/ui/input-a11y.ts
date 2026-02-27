export interface ResolveInputErrorStateOptions {
  id?: string;
  generatedId: string;
  error?: boolean | string;
  errorId?: string;
  describedBy?: string;
}

export interface ResolveInputErrorStateResult {
  inputId: string;
  hasError: boolean;
  errorMessage?: string;
  errorMessageId?: string;
  ariaDescribedBy?: string;
}

function mergeAriaDescribedBy(
  ...values: Array<string | undefined>
): string | undefined {
  const tokens: string[] = [];
  const seen = new Set<string>();

  for (const value of values) {
    if (!value) {
      continue;
    }

    for (const token of value.split(/\s+/)) {
      if (!token || seen.has(token)) {
        continue;
      }

      seen.add(token);
      tokens.push(token);
    }
  }

  return tokens.length > 0 ? tokens.join(" ") : undefined;
}

export function resolveInputErrorState({
  id,
  generatedId,
  error,
  errorId,
  describedBy,
}: ResolveInputErrorStateOptions): ResolveInputErrorStateResult {
  const inputId = id ?? generatedId;
  const hasError = Boolean(error);

  if (!hasError) {
    return {
      inputId,
      hasError,
      ariaDescribedBy: describedBy,
    };
  }

  const errorMessage = typeof error === "string" ? error : undefined;
  const errorMessageId = errorMessage ? `${inputId}-error` : errorId;

  return {
    inputId,
    hasError,
    errorMessage,
    errorMessageId,
    ariaDescribedBy: mergeAriaDescribedBy(describedBy, errorMessageId),
  };
}
