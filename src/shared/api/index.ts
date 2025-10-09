export type * from "./types.ts";

import { WeatherApiClient } from "./client.ts";

export const apiClient = new WeatherApiClient(
  import.meta.env.VITE_WEATHER_API_KEY,
  import.meta.env.VITE_WEATHER_BASE_URL,
);
