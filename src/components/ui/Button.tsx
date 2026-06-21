import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { cn } from "@/utils/cn";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}
interface LinkProps extends BaseProps { to: string; href?: never; onClick?: never; type?: never; }
interface AnchorProps extends BaseProps { href: string; to?: never; onClick?: never; type?: never; }
interface ButtonProps extends BaseProps {
  onClick?: () => void; type?: "button" | "submit"; to?: never; href?: never; disabled?: boolean;
}
type Props = LinkProps | AnchorProps | ButtonProps;

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-600 shadow-soft",
  secondary: "bg-accent text-primary hover:bg-accent-light shadow-soft font-semibold",
  ghost: "border border-primary/30 text-primary hover:border-primary hover:bg-primary/5",
  white: "bg-white text-primary hover:bg-sand-100 shadow-soft",
};
const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-sm",
};

export default function Button(props: Props) {
  const { children, variant = "primary", size = "md", className, fullWidth } = props;
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded font-semibold uppercase tracking-wide transition-all duration-200",
    variants[variant], sizes[size], fullWidth && "w-full", className
  );

  if ("to" in props && props.to)
    return <Link to={props.to} className={classes}>{children}</Link>;
  if ("href" in props && props.href)
    return <a href={props.href} className={classes} target="_blank" rel="noreferrer">{children}</a>;
  return (
    <button
      type={(props as ButtonProps).type ?? "button"}
      onClick={(props as ButtonProps).onClick}
      disabled={(props as ButtonProps).disabled}
      className={cn(classes, (props as ButtonProps).disabled && "opacity-60 cursor-not-allowed")}
    >
      {children}
    </button>
  );
}
