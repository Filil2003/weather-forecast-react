import { queryOptions, skipToken } from "@tanstack/react-query";
import { weatherApiClient } from "#shared/api/weather";

type Query = Parameters<typeof weatherApiClient.search>[0];

export const queries = {
  search: (query: Query) =>
    queryOptions({
      queryKey: ["search", query.q],
      queryFn: query.q.trim()
        ? async () => weatherApiClient.search(query)
        : skipToken,
    }),
};
