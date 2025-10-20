import { createElement } from "react";
import type { ForecastWeatherResponse } from "#shared/api/weather";
import { Icon } from "#shared/ui";
import type { Day, Hour, Weather } from "../model";

export function fromDto({
  current: currentDto,
  forecast: forecastDto,
}: ForecastWeatherResponse) {
  const current: Weather = {
    condition: currentDto.condition.text,
    icon: createElement(Icon.Weather, {
      name: `${currentDto.condition.code}-${currentDto.is_day ? "day" : "night"}`,
      size: "5.75em",
      title: currentDto.condition.text,
    }),
    temperature: {
      actual: {
        celsius: Math.floor(currentDto.temp_c),
        fahrenheit: Math.floor(currentDto.temp_f),
      },
      feelsLike: {
        celsius: Math.floor(currentDto.feelslike_c),
        fahrenheit: Math.floor(currentDto.feelslike_f),
      },
    },
    stats: {
      wind: {
        metric: currentDto.wind_kph,
        imperial: currentDto.wind_mph,
      },
      pressure: {
        metric: currentDto.pressure_mb,
        imperial: currentDto.pressure_in,
      },
      precipitation: {
        metric: currentDto.precip_mm,
        imperial: currentDto.precip_in,
      },
      visibility: {
        metric: currentDto.vis_km,
        imperial: currentDto.vis_miles,
      },
      humidity: currentDto.humidity,
      ultravioletIndex: currentDto.uv,
    },
  };

  const hourly: Hour[] = forecastDto.forecastday
    .flatMap(({ hour }) => hour)
    .map((hour) => ({
      time: hour.time,
      icon: createElement(Icon.Weather, {
        name: `${hour.condition.code}-${hour.is_day ? "day" : "night"}`,
        size: "3em",
        title: hour.condition.text,
      }),
      temperature: {
        celsius: Math.floor(hour.temp_c),
        fahrenheit: Math.floor(hour.temp_f),
      },
      chanceOfRain: hour.chance_of_rain,
      chanceOfSnow: hour.chance_of_snow,
    }));

  const weekly: Day[] = forecastDto.forecastday.map(({ date, day }) => ({
    date: date,
    condition: day.condition.text,
    icon: createElement(Icon.Weather, {
      name: `${day.condition.code}-day`,
      size: "2.25em",
      title: day.condition.text,
    }),
    temperature: {
      avg: {
        celsius: Math.floor(day.avgtemp_c),
        fahrenheit: Math.floor(day.avgtemp_f),
      },
      min: {
        celsius: Math.floor(day.mintemp_c),
        fahrenheit: Math.floor(day.mintemp_f),
      },
    },
  }));

  return { current, hourly, weekly };
}
