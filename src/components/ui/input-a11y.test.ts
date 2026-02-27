import { describe, expect, it } from "vitest";
import { resolveInputErrorState } from "./input-a11y";

describe("resolveInputErrorState", () => {
  it("links internal error message id when error is a string", () => {
    const state = resolveInputErrorState({
      id: "login-email",
      generatedId: "generated-id",
      error: "Please enter a valid email",
      describedBy: "email-hint",
    });

    expect(state).toEqual({
      inputId: "login-email",
      hasError: true,
      errorMessage: "Please enter a valid email",
      errorMessageId: "login-email-error",
      ariaDescribedBy: "email-hint login-email-error",
    });
  });

  it("falls back to generated id when explicit id is missing", () => {
    const state = resolveInputErrorState({
      generatedId: "generated-id",
      error: "Required field",
    });

    expect(state.inputId).toBe("generated-id");
    expect(state.errorMessageId).toBe("generated-id-error");
    expect(state.ariaDescribedBy).toBe("generated-id-error");
  });

  it("supports boolean error with external errorId", () => {
    const state = resolveInputErrorState({
      id: "signup-email",
      generatedId: "generated-id",
      error: true,
      errorId: "signup-email-server-error",
      describedBy: "signup-email-hint",
    });

    expect(state).toEqual({
      inputId: "signup-email",
      hasError: true,
      errorMessage: undefined,
      errorMessageId: "signup-email-server-error",
      ariaDescribedBy: "signup-email-hint signup-email-server-error",
    });
  });

  it("preserves describedBy when there is no error", () => {
    const state = resolveInputErrorState({
      id: "billing-email",
      generatedId: "generated-id",
      error: false,
      describedBy: "billing-email-help",
    });

    expect(state).toEqual({
      inputId: "billing-email",
      hasError: false,
      ariaDescribedBy: "billing-email-help",
    });
  });

  it("deduplicates aria-describedby tokens", () => {
    const state = resolveInputErrorState({
      id: "profile-email",
      generatedId: "generated-id",
      error: true,
      errorId: "profile-email-error",
      describedBy: "profile-email-error profile-email-help",
    });

    expect(state.ariaDescribedBy).toBe(
      "profile-email-error profile-email-help",
    );
  });
});
