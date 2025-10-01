import "./styles/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  CurrentWeather,
  HourlyForecast,
  WeeklyForecast,
} from "#entities/weather";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CurrentWeather />
      <HourlyForecast />
      <WeeklyForecast />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
