import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Button.module.css";

interface LinkSpecificProps extends ComponentProps<"a"> {
  type: "link";
}

type Props = (ComponentProps<"button"> | LinkSpecificProps) & {
  shape?: "round" | "normal";
};

function Button(props: Props) {
  const { shape = "normal", className, children, ...restProps } = props;
  const classNames = clsx(styles.button, styles[shape], className);

  if (restProps.type === "link") {
    const { type: _, ...linkProps } = restProps;
    return (
      <a className={classNames} {...linkProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classNames} type="button" {...restProps}>
      {children}
    </button>
  );
}

export { Button };
