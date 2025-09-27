import clsx from "clsx";
import type { PropsWithChildren } from "react";
import { Heading } from "../../Heading";
import styles from "./Section.module.css";

interface Props extends PropsWithChildren {
  heading: string;
  headingLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  hideHeading?: boolean;
}

export function Section({
  headingLevel,
  heading,
  hideHeading = false,
  children,
}: Props) {
  const classNames = clsx({ [styles.visuallyHidden]: hideHeading });

  return (
    <section className={styles.section}>
      <Heading as={headingLevel} className={classNames} variant="medium">
        {heading}
      </Heading>
      {children}
    </section>
  );
}
