import type { JSX } from "react";

export interface Hour {
  time: string;
  icon: JSX.Element;
  temperature: number;
  chanceOfRain: number;
  chanceOfSnow: number;
}
