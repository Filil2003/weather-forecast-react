import type { JSX } from "react";

export interface Day {
  date: string;
  condition: string;
  icon: JSX.Element;
  temperature: {
    avg: string;
    min: string;
  };
}
