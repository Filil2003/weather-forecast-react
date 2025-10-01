export const mockCurrentWeather = {
  temperature: "+18°",
  feelsLike: "+20°",
  condition: "Clear",
  code: 1000,
  isDay: true,
  details: [
    {
      name: "Wind",
      icon: "Wind",
      value: "10 km/h",
    },
    {
      name: "Humidity",
      icon: "Humidity",
      value: "56%",
    },
    {
      name: "Pressure",
      icon: "Pressure",
      value: "1024 mb",
    },
    {
      name: "Precipitation",
      icon: "Precipitation",
      value: "0 mm",
    },
    {
      name: "Visibility",
      icon: "Visibility",
      value: "10 km",
    },
    {
      name: "UV Index",
      icon: "UVIndex",
      value: "0",
    },
  ] as const,
};
