/* --- Autocomplete API --- */
export interface LocationSearchParams {
  q: string;
}

export type LocationSearchResponse = Array<{
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}>;

/* --- Forecast API --- */
export interface WeatherForecastParams {
  q: string;
  days?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  dt?: string;
  unixdt?: number;
  hour?: number;
  lang?: string;
  alerts?: "yes" | "no";
  aqi?: "yes" | "no";
  tp?: number;
}

export interface WeatherForecastResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  air_quality: {
    co: number;
    no2: number;
    o3: number;
    so2: number;
    pm2_5: number;
    pm10: number;
    "us-epa-index": number;
    "gb-defra-index": number;
  };
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface ForecastDay {
  date: string;
  date_epoch: number;
  day: Day;
  astro: Astro;
  hour: Hour[];
}

interface Day {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: Condition;
  uv: number;
}

interface Astro {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

interface Hour {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

/* --- Common for any endpoint --- */
export interface ApiErrorResponse {
  error: {
    code:
      | 1002 // API key not provided;
      | 1003 // Parameter 'q' not provided;
      | 1005 // API request url is invalid;
      | 1006 // No location found matching parameter 'q';
      | 2006 // API key provided is invalid;
      | 2007 // API key has exceeded calls per month quota;
      | 2008 // API key has been disabled;
      | 2009 // API key does not have access to the resource;
      | 9000 // Json body passed in bulk request is invalid;
      | 9001 // Json body contains too many locations for bulk request;
      | 9999; // Internal application error.
    message: string;
  };
}

export interface WeatherApiOperations {
  searchLocation: {
    endpoint: "search";
    params: LocationSearchParams;
    response: LocationSearchResponse | ApiErrorResponse;
  };
  getForecast: {
    endpoint: "forecast";
    params: WeatherForecastParams;
    response: WeatherForecastResponse | ApiErrorResponse;
  };
}
