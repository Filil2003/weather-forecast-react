import type { Operations } from "./types.ts";

export class WeatherApi {
  constructor(
    private apiKey: string,
    private baseUrl = "https://api.weatherapi.com/v1",
  ) {}

  private async request<T extends keyof Operations>(
    endpoint: string,
    query: Operations[T]["request"]["query"],
  ): Promise<Operations[T]["response"]> {
    const params = new URLSearchParams(
      Object.entries({ ...query, key: this.apiKey }).map(([key, value]) => [
        key,
        String(value),
      ]),
    );

    const res = await fetch(`${this.baseUrl}/${endpoint}.json?${params}`);
    return res.json();
  }

  getForecast(query: Operations["forecast"]["request"]["query"]) {
    return this.request("forecast", query);
  }
}
