import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variants = {
  primary: "bg-tejas-saffron text-white hover:bg-tejas-saffron-dark shadow-sm",
  secondary: "bg-tejas-blue text-white hover:bg-tejas-blue-dark shadow-sm",
  outline: "border-2 border-tejas-blue text-tejas-blue hover:bg-tejas-blue/5",
  ghost: "text-tejas-ink hover:bg-stone-100",
  link: "text-tejas-saffron underline-offset-4 hover:underline p-0 h-auto",
};

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm font-medium",
  lg: "h-13 px-8 text-base font-semibold",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tejas-saffron focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
);
Button.displayName = "Button";
