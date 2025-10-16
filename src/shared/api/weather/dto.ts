/* --- Autocomplete API --- */
export interface SearchOrAutocompleteQuery {
  /**
   * Authentication to the WeatherAPI.com API is provided by passing your API key as request parameter through an API.
   */
  key: string;
  /**
   * Pass US Zipcode, UK Postcode, Canada Postal code, IP address, Latitude/Longitude (decimal degree) or city name.
   */
  q: string;
}

export type SearchOrAutocompleteResponse = Array<{
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}>;

/* --- Forecast API --- */
export interface ForecastWeatherQuery {
  /**
   * Authentication to the WeatherAPI.com API is provided by passing your API key as request parameter through an API.
   */
  key: string;
  /**
   * Pass US Zipcode, UK Postcode, Canada Postal code, IP address, Latitude/Longitude (decimal degree) or city name.
   */
  q: string;
  /**
   * Number of days of weather forecast. Value ranges from 1 to 14
   */
  days: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
  /**
   * Date should be between today and next 14 day in yyyy-MM-dd format. e.g. '2015-01-01'
   */
  dt?: string;
  /**
   * Please either pass 'dt' or 'unixdt' and not both in same request. unixdt should be between today and next 14 day in Unix format. e.g. 1490227200
   */
  unixdt?: number;
  /**
   * Must be in 24 hour. For example 5 pm should be hour=17, 6 am as hour=6
   */
  hour?: number;
  /**
   * Returns 'condition:text' field in API in the desired language.
   */
  lang?: string;
  /**
   * Enable/Disable Air Quality data in forecast API output.
   */
  aqi?: "yes" | "no";
  /**
   * Get 15 min interval or 24 hour average data for Forecast and History API.
   */
  tp?: number;
}

export interface ForecastWeatherResponse {
  location: LocationDto;
  current: CurrentDto;
  forecast: ForecastDto;
}

interface LocationDto {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface CurrentDto {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: ConditionDto;
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
  air_quality: AirQualityDto;
}

interface ConditionDto {
  text: string;
  icon: string;
  code: number;
}

interface AirQualityDto {
  co: number;
  no2: number;
  o3: number;
  so2: number;
  pm2_5: number;
  pm10: number;
  "us-epa-index": number;
  "gb-defra-index": number;
}

export interface ForecastDto {
  forecastday: ForecastDayDto[];
}

interface ForecastDayDto {
  date: string;
  date_epoch: number;
  day: DayDto;
  astro: AstroDto;
  hour: HourDto[];
}

interface DayDto {
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
  daily_will_it_rain: 0 | 1;
  daily_chance_of_rain: number;
  daily_will_it_snow: 0 | 1;
  daily_chance_of_snow: number;
  condition: ConditionDto;
  uv: number;
}

interface AstroDto {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
}

interface HourDto {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: 0 | 1;
  condition: ConditionDto;
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
  will_it_rain: 0 | 1;
  chance_of_rain: number;
  will_it_snow: 0 | 1;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

/* --- Common for any endpoint --- */
export interface ErrorResponse {
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
