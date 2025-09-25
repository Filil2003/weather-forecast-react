import clsx from "clsx";
import { type ComponentProps, createElement } from "react";
import styles from "./Heading.module.css";

type HeadingTags = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type Props<T extends HeadingTags> = ComponentProps<T> & {
  as?: T;
  variant?: "small" | "medium" | "large" | "huge";
};

export function Heading<T extends HeadingTags = "h1">({
  as,
  variant = "medium",
  className,
  children,
  ...restProps
}: Props<T>) {
  const Tag: HeadingTags = as ?? "h1";
  const classNames = clsx(styles[variant], className);

  return createElement(Tag, { ...restProps, className: classNames }, children);
}
