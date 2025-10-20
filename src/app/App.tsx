import "./styles/index.css";
import { ForecastPage } from "#pages/forecast";
import { DisclaimerDialog } from "#widgets/DisclaimerDialog";
import { LanguageProvider } from "./providers/LanguageProvider.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

export function App() {
  return (
    <QueryProvider>
      <LanguageProvider>
        <ThemeProvider>
          <DisclaimerDialog />
          <ForecastPage />
        </ThemeProvider>
      </LanguageProvider>
    </QueryProvider>
  );
}
