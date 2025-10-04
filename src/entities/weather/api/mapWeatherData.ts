import type { WeatherForecastResponse } from "#shared/api/weather-api";
import type { Props as CurrentWeather } from "../ui/CurrentWeather/CurrentWeather";

export function mapWeatherData(data: WeatherForecastResponse) {
  const current: CurrentWeather["weather"] = {
    condition: {
      text: data.current.condition.text,
      code: `${1000}-${data.current.is_day ? "day" : "night"}`, // TODO: Replace after adding all icons
    },
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

  const currentTime = new Date(data.current.last_updated).getTime();

  const hourly = data.forecast.forecastday
    .flatMap((day) => day.hour)
    .filter((hour) => new Date(hour.time).getTime() >= currentTime)
    .slice(0, 24)
    .map((hour, index) => {
      const date = new Date(hour.time);
      const isRussian = navigator.language.startsWith("ru");

      const formattedTime =
        index === 0
          ? isRussian
            ? "Сейчас"
            : "Now"
          : new Intl.DateTimeFormat(navigator.language, {
              hour: "numeric",
              minute: isRussian ? "2-digit" : undefined, // 10:00 для ru
              hour12: !isRussian, // AM/PM для не-ru
            }).format(date);

      return {
        time: formattedTime,
        condition: {
          text: hour.condition.text,
          code: `${1000}-${hour.is_day ? "day" : "night"}`,
        },
        temperature: formatTemperature(hour.temp_c, hour.temp_f),
        chanceOfRain: hour.chance_of_rain,
        chanceOfSnow: hour.chance_of_snow,
      };
    });

  const weekly = data.forecast.forecastday.map(({ date, day }) => ({
    date: date,
    condition: {
      text: day.condition.text,
      code: `${1000}-day`, // TODO: Replace after adding all icons
    },
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
