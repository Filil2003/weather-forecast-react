import { createElement } from "react";
import type { ForecastWeatherResponse } from "#shared/api/weather";
import { getMeasurementSystem, getTemperatureUnit } from "#shared/model";
import { Icon } from "#shared/ui";
import type { Day, Hour, Weather } from "../model";

export function fromDto({
  current: currentDto,
  forecast: forecastDto,
}: ForecastWeatherResponse) {
  const temperatureUnit = getTemperatureUnit();
  const measurementSystem = getMeasurementSystem();

  const isCelsius = temperatureUnit === "celsius";
  const isMetricSystem = measurementSystem === "metric";

  const current: Weather = {
    condition: currentDto.condition.text,
    icon: createElement(Icon.Weather, {
      name: `${currentDto.condition.code}-${currentDto.is_day ? "day" : "night"}`,
      title: currentDto.condition.text,
    }),
    temperature: {
      actual: Math.floor(isCelsius ? currentDto.temp_c : currentDto.temp_f),
      feelsLike: Math.floor(
        isCelsius ? currentDto.feelslike_c : currentDto.feelslike_f,
      ),
    },
    stats: {
      wind: isMetricSystem ? currentDto.wind_kph : currentDto.wind_mph,
      pressure: isMetricSystem
        ? currentDto.pressure_mb
        : currentDto.pressure_in,
      precipitation: isMetricSystem
        ? currentDto.precip_mm
        : currentDto.precip_in,
      visibility: isMetricSystem ? currentDto.vis_km : currentDto.vis_miles,
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
        title: hour.condition.text,
      }),
      temperature: isCelsius ? hour.temp_c : hour.temp_f,
      chanceOfRain: hour.chance_of_rain,
      chanceOfSnow: hour.chance_of_snow,
    }));

  const weekly: Day[] = forecastDto.forecastday.map(({ date, day }) => ({
    date: date,
    condition: day.condition.text,
    icon: createElement(Icon.Weather, {
      name: `${day.condition.code}-day`,
      title: day.condition.text,
    }),
    temperature: {
      avg: isCelsius ? day.avgtemp_c : day.avgtemp_f,
      min: isCelsius ? day.mintemp_c : day.mintemp_f,
    },
  }));

  return { current, hourly, weekly };
}
