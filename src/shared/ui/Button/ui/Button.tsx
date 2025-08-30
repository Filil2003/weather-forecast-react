import clsx from "clsx";
import type { Props } from "../types";
import styles from "./Button.module.css";

export function Button({ children, fullWidth, className, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(styles.button, fullWidth && styles.fullWidth, className)}
    >
      {children}
    </button>
  );
}
