import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { WeatherApiError } from "#shared/api/weather";
import { useDocumentTitle } from "#shared/lib/react";
import { Footer } from "#widgets/Footer";
import { Header } from "#widgets/Header";
import { fromDto } from "../../api/fromDto.ts";
import { queries } from "../../api/queries.ts";
import { CurrentWeather } from "../CurrentWeather/CurrentWeather.tsx";
import { HourlyForecast } from "../HourlyForecast/HourlyForecast.tsx";
import { WeeklyForecast } from "../WeeklyForecast/WeeklyForecast.tsx";

export function ForecastPage() {
  const [city, setCity] = useState("Санкт-Петербург");
  const { t, i18n } = useTranslation();
  const { data, error, isError } = useQuery(
    queries.forecast({
      q: city,
      lang: i18n.language,
    }),
  );

  useDocumentTitle(t("meta.title"));

  if (isError) {
    if (error instanceof WeatherApiError) {
      alert(t(`api.${error.details.code}`));
    }
  }

  if (!data) return <div>Loading...</div>;

  const { current, hourly, weekly } = fromDto(data);

  return (
    <>
      <Header city={city} onCityChange={setCity} />
      <main>
        {data && (
          <>
            <CurrentWeather weather={current} />
            <HourlyForecast forecast={hourly} />
            <WeeklyForecast forecast={weekly} />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
