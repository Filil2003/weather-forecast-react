import { queryOptions } from "@tanstack/react-query";
import { apiClient, type WeatherForecastParams } from "#shared/api";
import { mapWeatherData } from "./mapWeatherData.ts";

export const weatherQueries = {
  forecast: (params: WeatherForecastParams) =>
    queryOptions({
      queryKey: ["weather", params.q], // TODO: Не ищет одинаковые города в разных странах, так как ключ исключительно по городу
      queryFn: async () => {
        const response = await apiClient.getForecast(params);
        console.log(response);
        if ("error" in response) throw new Error(response.error.message);
        return response;
      },
      select: mapWeatherData,
    }),
};
