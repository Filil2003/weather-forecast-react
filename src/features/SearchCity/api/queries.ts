import { queryOptions, skipToken } from "@tanstack/react-query";
import { apiClient, type LocationSearchParams } from "#shared/api/weather-api";

export const queries = {
  search: (params: LocationSearchParams) =>
    queryOptions({
      queryKey: ["location", params.q],
      queryFn: params.q.trim()
        ? async () => {
            const response = await apiClient.searchLocation(params);
            console.log(response);
            if ("error" in response) throw new Error(response.error.message);
            return response;
          }
        : skipToken,
      select: (data) =>
        data.map(({ id, name, country }) => ({ id, name, country })),
    }),
};
