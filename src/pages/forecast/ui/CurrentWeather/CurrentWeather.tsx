import { useTranslation } from "react-i18next";
import { useSettingsStore } from "#shared/model";
import { Heading, Icon, Section } from "#shared/ui";
import type { Weather } from "../../model";
import styles from "./CurrentWeather.module.css";

interface Props {
  weather: Weather;
}

export function CurrentWeather({
  weather: { condition, icon, temperature, stats },
}: Props) {
  const { t } = useTranslation();
  const { measurementSystem, temperatureUnit } = useSettingsStore();

  return (
    <Section heading={t("current.title")} headingLevel="h2" hideHeading={true}>
      <Heading as="h3" variant="medium">
        {condition}
      </Heading>
      <div className={styles.condition}>
        <div className={styles.temperature}>
          <Heading as="h3" variant="huge">
            {t(`current.temperature.actual.${temperatureUnit}`, {
              value: temperature.actual,
            })}
          </Heading>
          <Heading as="h3" variant="small">
            {t(`current.temperature.feelsLike.${temperatureUnit}`, {
              value: temperature.feelsLike,
            })}
          </Heading>
        </div>
        {icon}
      </div>
      {/* --- Stats --- */}
      <dl className={styles.list}>
        {Object.entries(stats).map(([key, value]) => (
          <div className={styles.item} key={key}>
            <dt>
              <Icon.Common aria-hidden="true" name={key} size="1em" />
              {t(`current.stats.${key}.title`)}
            </dt>
            <dd>
              {t(`current.stats.${key}.unit.${measurementSystem}`, {
                value,
                defaultValue: t(`current.stats.${key}.unit`, { value }),
              })}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
