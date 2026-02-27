import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Logo } from "./logo";

describe("Logo", () => {
  it("renders a home link with the brand name", () => {
    render(<Logo />);

    const logoLink = screen.getByRole("link", { name: /ainzstack/i });
    expect(logoLink).toBeVisible();
    expect(logoLink).toHaveAttribute("href", "/");
  });
});
