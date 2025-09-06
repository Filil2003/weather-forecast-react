export interface Operations {
  forecast: ForecastWeatherOperation;
}

interface ForecastWeatherOperation {
  request: {
    query: {
      q: string;
      days: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
      dt?: string;
      unixdt?: number;
      hour?: number;
      lang?: string;
      alerts?: string;
      aqi?: string;
    };
  };
  response: ForecastWeatherResponse | ApiError;
}

export interface ForecastWeatherResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

interface ApiError {
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
  temp_c: number;
  temp_f: number;
  feelslike_c: number;
  feelslike_f: number;
  is_day: 0 | 1;
  condition: {
    text: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_dir: string;
  humidity: number;
  cloud: number;
}

interface Forecast {
  forecastday: Array<{
    date: string;
    day: {
      avgtemp_c: number;
      avgtemp_f: number;
      maxwind_mph: number;
      maxwind_kph: number;
      avghumidity: number;
      daily_chance_of_rain: number;
      daily_chance_of_snow: number;
      condition: {
        text: string;
        code: number;
      };
    };
    hour: Array<{
      time: string;
      temp_c: number;
      temp_f: number;
      feelslike_c: number;
      feelslike_f: number;
      is_day: 0 | 1;
      wind_mph: number;
      wind_kph: number;
      wind_dir: string;
      chance_of_rain: number;
      condition: {
        text: string;
        code: number;
      };
    }>;
  }>;
}
