import "./styles/index.css";
import { ForecastPage } from "#pages/forecast";
import { QueryProvider } from "./providers/QueryProvider.tsx";

export function App() {
  return (
    <QueryProvider>
      <ForecastPage />
    </QueryProvider>
  );
}
