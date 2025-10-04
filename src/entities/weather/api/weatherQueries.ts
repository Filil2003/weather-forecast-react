import { queryOptions } from "@tanstack/react-query";
import { apiClient, type WeatherForecastParams } from "#shared/api/weather-api";
import { mapWeatherData } from "./mapWeatherData.ts";

export const weatherQueries = {
  forecast: (params: WeatherForecastParams) =>
    queryOptions({
      queryKey: ["weather", params.q],
      queryFn: async () => {
        const response = await apiClient.getForecast(params);
        console.log(response);
        if ("error" in response) throw new Error(response.error.message);
        return response;
      },
      select: mapWeatherData,
    }),
};
