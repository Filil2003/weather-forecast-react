import type { JSX } from "react";

export interface Weather {
  condition: string;
  icon: JSX.Element;
  temperature: {
    actual: {
      celsius: number;
      fahrenheit: number;
    };
    feelsLike: {
      celsius: number;
      fahrenheit: number;
    };
  };
  stats: {
    wind: {
      metric: number;
      imperial: number;
    };
    pressure: {
      metric: number;
      imperial: number;
    };
    precipitation: {
      metric: number;
      imperial: number;
    };
    visibility: {
      metric: number;
      imperial: number;
    };
    humidity: number;
    ultravioletIndex: number;
  };
}
