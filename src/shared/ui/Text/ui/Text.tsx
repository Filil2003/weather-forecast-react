import clsx from "clsx";
import { type ComponentProps, createElement } from "react";
import styles from "./Text.module.css";

type AllowedTags = "p" | "span" | "label";

type Props<T extends AllowedTags> = ComponentProps<T> & {
  as?: T;
  variant?: "text" | "caption";
  weight?: "regular" | "medium" | "bold";
};

export function Text<T extends AllowedTags = "span">({
  as,
  variant = "text",
  weight = "regular",
  className,
  children,
  ...restProps
}: Props<T>) {
  const Tag: AllowedTags = as ?? "span";
  const classNames = clsx(styles[variant], styles[weight], className);

  return createElement(Tag, { ...restProps, className: classNames }, children);
}
