import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Language = "ru" | "en-US";
type Theme = "light" | "dark" | "system";
type TemperatureUnit = "celsius" | "fahrenheit";
type MeasurementSystem = "metric" | "imperial";

interface State {
  language: Language;
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  measurementSystem: MeasurementSystem;
}

interface Actions {
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setMeasurementSystem: (system: MeasurementSystem) => void;
}

type UseSettingsStore = State & Actions;

const slice: StateCreator<
  UseSettingsStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (setState) => ({
  language: getSystemLanguage(),
  theme: "system",
  temperatureUnit: "celsius",
  measurementSystem: "metric",
  setLanguage: (language) =>
    void setState({ language }, false, `setLanguage to "${language}"`),
  setTheme: (theme) =>
    void setState({ theme }, false, `setTheme to "${theme}"`),
  setTemperatureUnit: (unit) =>
    void setState(
      { temperatureUnit: unit },
      false,
      `setTemperatureUnit to "${unit}"`,
    ),
  setMeasurementSystem: (system) =>
    void setState(
      { measurementSystem: system },
      false,
      `setMeasurementSystem to "${system}"`,
    ),
});

export const useSettingsStore = create<UseSettingsStore>()(
  devtools(persist(slice, { name: "settings" }), { name: "SettingsStore" }),
);

function getSystemLanguage(): Language {
  const lang = navigator.language.toLowerCase();

  if (lang.startsWith("ru")) return "ru";
  return "en-US";
}
