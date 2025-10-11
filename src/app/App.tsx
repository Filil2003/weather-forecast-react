import "./styles/index.css";
import { ForecastPage } from "#pages/forecast";
import { LanguageProvider } from "./providers/LanguageProvider.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";

export function App() {
  return (
    <QueryProvider>
      <LanguageProvider>
        <ForecastPage />
      </LanguageProvider>
    </QueryProvider>
  );
}
