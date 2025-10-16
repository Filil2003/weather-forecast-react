import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

type Theme = "light" | "dark" | "system";
type TemperatureUnit = "celsius" | "fahrenheit";
type MeasurementSystem = "metric" | "imperial";

interface State {
  theme: Theme;
  temperatureUnit: TemperatureUnit;
  measurementSystem: MeasurementSystem;
}

interface Actions {
  setTheme: (theme: Theme) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setMeasurementSystem: (system: MeasurementSystem) => void;
}

type SettingsStore = State & Actions;

const slice: StateCreator<
  SettingsStore,
  [["zustand/devtools", never], ["zustand/persist", unknown]]
> = (setState) => ({
  theme: "system",
  temperatureUnit: "celsius",
  measurementSystem: "metric",
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

export const useSettingsStore = create<SettingsStore>()(
  devtools(persist(slice, { name: "settings" }), { name: "SettingsStore" }),
);

export const getTemperatureUnit = () =>
  useSettingsStore.getState().temperatureUnit;

export const getMeasurementSystem = () =>
  useSettingsStore.getState().measurementSystem;
