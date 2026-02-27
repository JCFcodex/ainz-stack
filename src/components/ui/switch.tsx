"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type SwitchProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> & {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
};

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      className,
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState(defaultChecked);
    const checked = controlledChecked ?? uncontrolled;

    function toggle() {
      const next = !checked;
      setUncontrolled(next);
      onCheckedChange?.(next);
    }

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        className={cn(
          "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          checked ? "bg-foreground" : "bg-border",
          className,
        )}
        onClick={toggle}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block size-4 rounded-full bg-white shadow-sm transition-transform",
            checked ? "translate-x-4" : "translate-x-0",
          )}
        />
      </button>
    );
  },
);
Switch.displayName = "Switch";

export { Switch };
