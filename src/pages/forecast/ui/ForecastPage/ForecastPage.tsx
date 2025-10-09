import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSettingsStore } from "#shared/model";
import { Header } from "#widgets/Header";
import { weatherQueries } from "../../api/weatherQueries.ts";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather.tsx";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast.tsx";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast.tsx";

export function ForecastPage() {
  const [city, setCity] = useState("Санкт-Петербург");
  const preferredLanguage = useSettingsStore((state) => state.language);

  const { data } = useQuery(
    weatherQueries.forecast({
      q: city,
      days: 3,
      lang: preferredLanguage,
    }),
  );

  return (
    <>
      <Header city={city} onCityChange={setCity} />
      <main>
        {data && (
          <>
            <CurrentWeather weather={data.current} />
            <HourlyForecast forecast={data.hourly} />
            <WeeklyForecast forecast={data.weekly} />
          </>
        )}
      </main>
    </>
  );
}
