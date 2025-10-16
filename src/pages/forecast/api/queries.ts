import { queryOptions } from "@tanstack/react-query";
import { weatherApiClient } from "#shared/api/weather";

type Query = Parameters<typeof weatherApiClient.getForecast>[0];

export const queries = {
  forecast: (query: Query) =>
    queryOptions({
      queryKey: ["weather", query.q], // TODO: Не ищет одинаковые города в разных странах, так как ключ исключительно по городу
      queryFn: async () => weatherApiClient.getForecast(query),
    }),
};
