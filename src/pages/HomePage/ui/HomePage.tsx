import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { useSettingsStore } from "#entities/settings";
import {
  CurrentWeather,
  HourlyForecast,
  WeeklyForecast,
  weatherQueries,
} from "#entities/weather";
import { SearchCity } from "#features/SearchCity";
import { Settings } from "#features/Settings";
import styles from "./HomePage.module.css";

export function HomePage() {
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
      <header className={styles.header}>
        <SearchCity city={city} onCityChange={setCity} />
        <Settings />
      </header>
      <main className={styles.main}>
        {data && (
          <>
            <CurrentWeather weather={data.current} />
            <HourlyForecast forecast={data.hourly} />
            <WeeklyForecast forecast={data.weekly} />
            <ReactQueryDevtools />
          </>
        )}
      </main>
    </>
  );
}
