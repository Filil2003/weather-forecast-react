import "./styles/index.css";
import { ForecastPage } from "#pages/forecast";
import { DisclaimerDialog } from "#widgets/DisclaimerDialog";
import { LanguageProvider } from "./providers/LanguageProvider.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";

export function App() {
  return (
    <QueryProvider>
      <LanguageProvider>
        <DisclaimerDialog />
        <ForecastPage />
      </LanguageProvider>
    </QueryProvider>
  );
}
