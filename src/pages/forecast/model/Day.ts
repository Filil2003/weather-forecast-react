import type { JSX } from "react";

export interface Day {
  date: string;
  condition: string;
  icon: JSX.Element;
  temperature: {
    avg: {
      celsius: number;
      fahrenheit: number;
    };
    min: {
      celsius: number;
      fahrenheit: number;
    };
  };
}
