export type * from "./dto.ts";
export { WeatherApiError } from "./WeatherApiError.ts";

import { WeatherApiClient } from "./WeatherApiClient.ts";

export const weatherApiClient = new WeatherApiClient({
  apiKey: import.meta.env.VITE_WEATHER_API_KEY,
  baseUrl: import.meta.env.VITE_WEATHER_BASE_URL,
});
