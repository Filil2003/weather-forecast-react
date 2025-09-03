import { WeatherApi } from "./client.ts";

export const weatherApi = new WeatherApi(import.meta.env.VITE_WEATHER_API_KEY);
