import type { JSX } from "react";

export interface Hour {
  time: string;
  icon: JSX.Element;
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  chanceOfRain: number;
  chanceOfSnow: number;
}
