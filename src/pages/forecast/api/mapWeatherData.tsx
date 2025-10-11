import type { WeatherForecastResponse } from "#shared/api";
import { Icon } from "#shared/ui";

export function mapWeatherData(data: WeatherForecastResponse) {
  const current = {
    condition: data.current.condition.text,
    icon: formatIcon(
      data.current.condition.text,
      data.current.condition.code,
      Boolean(data.current.is_day),
    ),
    temperature: {
      actual: formatTemperature(data.current.temp_c, data.current.temp_f),
      feelsLike: formatTemperature(
        data.current.feelslike_c,
        data.current.feelslike_f,
      ),
    },
    wind: {
      metric: Math.round(data.current.wind_kph),
      imperial: Math.round(data.current.wind_mph),
    },
    pressure: {
      metric: data.current.pressure_mb,
      imperial: data.current.pressure_in,
    },
    precipitation: {
      metric: data.current.precip_mm,
      imperial: data.current.precip_in,
    },
    visibility: {
      metric: data.current.vis_km,
      imperial: data.current.vis_miles,
    },
    humidity: data.current.humidity,
    ultravioletIndex: data.current.uv,
  };

  const currentHour = new Date(data.current.last_updated);
  currentHour.setMinutes(0, 0, 0);

  const hourly = data.forecast.forecastday
    .flatMap((day) => day.hour)
    .filter((hour) => new Date(hour.time).getTime() >= currentHour.getTime())
    .slice(0, 24)
    .map((hour) => ({
      time: hour.time,
      icon: formatIcon(
        hour.condition.text,
        hour.condition.code,
        Boolean(hour.is_day),
      ),
      temperature: formatTemperature(hour.temp_c, hour.temp_f),
      chanceOfRain: hour.chance_of_rain,
      chanceOfSnow: hour.chance_of_snow,
    }));

  const weekly = data.forecast.forecastday.map(({ date, day }) => ({
    date: date,
    condition: day.condition.text,
    icon: formatIcon(day.condition.text, day.condition.code, true),
    temperature: {
      avg: formatTemperature(day.avgtemp_c, day.avgtemp_f),
      min: formatTemperature(day.mintemp_c, day.mintemp_f),
    },
  }));

  return { current, hourly, weekly } as const;
}

function formatTemperature(celsius: number, fahrenheit: number) {
  const format = (value: number, unit: string) => {
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    return `${sign}${Math.abs(Math.floor(value))}${unit}`;
  };

  return {
    celsius: format(celsius, "°C"),
    fahrenheit: format(fahrenheit, "°F"),
  };
}

function formatIcon(text: string, code: number, isDay: boolean) {
  return (
    <Icon.Weather
      name={`${code}-${isDay ? "day" : "night"}`}
      size={"3em"}
      title={text}
    />
  );
}
