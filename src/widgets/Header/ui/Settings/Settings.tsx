import { useState } from "react";
import { useSettingsStore } from "#shared/model";
import { Button, Icon } from "#shared/ui";
import { LocaleSwitcher } from "./LocaleSwitcher.tsx";
import styles from "./Settings.module.css";

export function Settings() {
  const [isVisible, setIsVisible] = useState(false);

  const {
    theme,
    temperatureUnit,
    measurementSystem,
    setTheme,
    setTemperatureUnit,
    setMeasurementSystem,
  } = useSettingsStore();

  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <div className={styles.container}>
      <Button onClick={handleClick} shape="round">
        <Icon.Common name="Settings" title="Settings" />
      </Button>

      {isVisible && (
        <div className={styles.settings}>
          <h3>Настройки</h3>

          {/* Язык */}
          <div>
            <label htmlFor="language">Язык:</label>
            <LocaleSwitcher />
          </div>

          {/* Тема */}
          <div>
            <label htmlFor="theme">Тема:</label>
            <select
              onChange={(e) =>
                setTheme(e.target.value as "light" | "dark" | "system")
              }
              value={theme}
            >
              <option value="light">Светлая</option>
              <option value="dark">Тёмная</option>
              <option value="system">Системная</option>
            </select>
          </div>

          {/* Единицы температуры */}
          <div>
            <label htmlFor="temperature">Температура:</label>
            <select
              onChange={(e) =>
                setTemperatureUnit(e.target.value as "celsius" | "fahrenheit")
              }
              value={temperatureUnit}
            >
              <option value="celsius">°C</option>
              <option value="fahrenheit">°F</option>
            </select>
          </div>

          {/* Система измерений */}
          <div>
            <label htmlFor="measurement">Система измерений:</label>
            <select
              onChange={(e) =>
                setMeasurementSystem(e.target.value as "metric" | "imperial")
              }
              value={measurementSystem}
            >
              <option value="metric">Метрическая</option>
              <option value="imperial">Имперская</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
