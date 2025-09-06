import { WeatherApi } from "./client.ts";

export type { ForecastWeatherResponse } from "./types.ts";

export const weatherApi = new WeatherApi(import.meta.env.VITE_WEATHER_API_KEY);
