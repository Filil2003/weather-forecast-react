import type { Props } from "../types";
import styles from "./Input.module.css";

export function Input(props: Props) {
  return <input className={styles.input} {...props} />;
}
