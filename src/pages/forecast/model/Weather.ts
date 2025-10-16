import type { JSX } from "react";

export interface Weather {
  condition: string;
  icon: JSX.Element;
  temperature: {
    actual: number;
    feelsLike: number;
  };
  stats: {
    wind: number;
    pressure: number;
    precipitation: number;
    visibility: number;
    humidity: number;
    ultravioletIndex: number;
  };
}
