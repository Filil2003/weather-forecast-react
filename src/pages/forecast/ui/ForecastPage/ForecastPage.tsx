import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WeatherApiError } from "#shared/api/weather";
import { useDocumentTitle } from "#shared/lib/react";
import { DataGuard } from "#shared/ui";
import { Footer } from "#widgets/Footer";
import { Header } from "#widgets/Header";
import { queries } from "../../api/queries.ts";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather.tsx";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast.tsx";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast.tsx";

export function ForecastPage() {
  const { t, i18n } = useTranslation();
  useDocumentTitle(t("document.title"));

  const [city, setCity] = useState("Санкт-Петербург");
  const { data, error, isError, isLoading } = useQuery(
    queries.forecast({
      q: city,
      lang: i18n.language,
    }),
  );

  if (isError) {
    if (error instanceof WeatherApiError) {
      alert(t(`api.${error.details.code}`));
    }
  }

  // TODO: Вынести Header и Footer в layout, чтобы не рендерелись постоянно.
  // TODO: Использовать store или контекст чтобы отделить main от header?

  return (
    <>
      <Header city={city} onCityChange={setCity} />
      <main>
        <DataGuard fallback={"Loading CurrentWeather..."} isLoading={isLoading}>
          <CurrentWeather data={data?.current!} />
        </DataGuard>
        <DataGuard fallback={"Loading HourlyForecast..."} isLoading={isLoading}>
          <HourlyForecast data={data?.hourly!} />
        </DataGuard>
        <DataGuard fallback={"Loading WeeklyForecast..."} isLoading={isLoading}>
          <WeeklyForecast data={data?.weekly!} />
        </DataGuard>
      </main>
      <Footer />
    </>
  );
}
