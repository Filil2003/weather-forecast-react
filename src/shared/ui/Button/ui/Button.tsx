import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

interface Props extends ComponentProps<"button"> {
  shape?: "round" | "normal";
}

export function Button({
  children,
  className,
  shape = "normal",
  type = "button",
  ...restProps
}: Props) {
  const classNames = clsx(styles.button, styles[shape], className);

  return (
    <button className={classNames} type={type} {...restProps}>
      {children}
    </button>
  );
}
