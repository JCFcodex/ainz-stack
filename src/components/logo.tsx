import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-xl",
};

export function Logo({ className, size = "md" }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-1.5 font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80",
        sizeMap[size],
        className,
      )}
    >
      <span className="flex size-7 items-center justify-center rounded-lg bg-foreground text-background text-xs font-bold">
        A
      </span>
      <span>
        ainz<span className="font-normal text-muted-foreground">stack</span>
      </span>
    </Link>
  );
}
