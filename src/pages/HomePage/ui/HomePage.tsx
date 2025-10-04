import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CurrentWeather,
  HourlyForecast,
  WeeklyForecast,
  weatherQueries,
} from "#entities/weather";

export function HomePage() {
  const { data } = useQuery(
    weatherQueries.forecast({
      q: "Санкт-Петербург",
      days: 3,
    }),
  );

  if (data) {
    return (
      <main>
        <CurrentWeather weather={data.current} />
        <HourlyForecast forecast={data.hourly} />
        <WeeklyForecast forecast={data.weekly} />
        <ReactQueryDevtools />
      </main>
    );
  }
}
