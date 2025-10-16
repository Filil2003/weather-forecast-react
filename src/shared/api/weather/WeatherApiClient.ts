import { HttpClient } from "../../lib/http";
import type {
  ErrorResponse,
  ForecastWeatherQuery,
  ForecastWeatherResponse,
  SearchOrAutocompleteQuery,
  SearchOrAutocompleteResponse,
} from "./dto.ts";
import { WeatherApiError } from "./WeatherApiError.ts";

interface Config {
  apiKey: string;
  baseUrl: string;
}

export class WeatherApiClient {
  private readonly apiKey: string;
  private httpClient: HttpClient;

  constructor({ apiKey, baseUrl }: Config) {
    this.apiKey = apiKey;
    this.httpClient = new HttpClient({ baseUrl });
  }

  async getForecast(query: Omit<ForecastWeatherQuery, "days" | "key">) {
    const response = await this.httpClient.get("/v1/forecast.json", {
      query: {
        ...query,
        days: 3,
        key: this.apiKey,
      },
    });

    return this.handleResponse<ForecastWeatherResponse>(response);
  }

  async search(query: Omit<SearchOrAutocompleteQuery, "key">) {
    const response = await this.httpClient.get("/v1/search.json", {
      query: {
        ...query,
        key: this.apiKey,
      },
    });

    return this.handleResponse<SearchOrAutocompleteResponse>(response);
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const body: ErrorResponse = await response.json();
      throw new WeatherApiError(body.error);
    }

    return response.json();
  }
}
