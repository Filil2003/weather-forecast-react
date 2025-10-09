import type {
  ApiErrorResponse,
  LocationSearchParams,
  WeatherApiOperations,
  WeatherForecastParams,
} from "./types.ts";

export class WeatherApiClient {
  constructor(
    private apiKey: string,
    private baseUrl: string,
  ) {}

  private async request<O extends keyof WeatherApiOperations>(
    endpoint: WeatherApiOperations[O]["endpoint"],
    params: WeatherApiOperations[O]["params"],
  ): Promise<WeatherApiOperations[O]["response"]> {
    const url = new URL(`${this.baseUrl}/${endpoint}.json`);

    url.searchParams.append("key", String(this.apiKey));

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });

    const response = await fetch(url.toString());
    const data = await response.json();

    if ("error" in data) return data as ApiErrorResponse;

    return data as WeatherApiOperations[O]["response"];
  }

  public searchLocation(params: LocationSearchParams) {
    return this.request<"searchLocation">("search", params);
  }

  public getForecast(params: WeatherForecastParams) {
    return this.request<"getForecast">("forecast", params);
  }
}
