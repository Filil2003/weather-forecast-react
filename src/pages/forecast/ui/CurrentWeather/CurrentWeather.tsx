import { Trans, useTranslation } from "react-i18next";
import { Heading, Icon, Section, Text } from "#shared/ui";
import type { Weather } from "../../model";
import styles from "./CurrentWeather.module.css";

interface Props {
  weather: Weather;
}

export function CurrentWeather({
  weather: { condition, icon, temperature, ...stats },
}: Props) {
  const { t } = useTranslation();

  return (
    <Section heading={t("current.title")} headingLevel="h2" hideHeading={true}>
      <Heading as="h3" variant="medium">
        {condition}
      </Heading>
      <div className={styles.condition}>
        <div className={styles.temperature}>
          <Heading as="h3" variant="huge">
            {temperature.actual}
          </Heading>
          <Heading as="h3" variant="small">
            {t("current.feelsLike", {
              temperature: temperature.feelsLike,
            })}
          </Heading>
        </div>
        {icon}
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common name="Wind" size={"1em"} title={t("current.wind")} />
            {t("current.wind")}
          </Text>
          <Text as="p" weight="bold">
            {stats.wind}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="Humidity"
              size={"1em"}
              title={t("current.humidity")}
            />
            {t("current.humidity")}
          </Text>
          <Text as="p" weight="bold">
            {stats.humidity}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="Pressure"
              size={"1em"}
              title={t("current.pressure")}
            />
            {t("current.pressure")}
          </Text>
          <Text as="p" weight="bold">
            {stats.pressure}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="Precipitation"
              size={"1em"}
              title={t("current.precipitation")}
            />
            {t("current.precipitation")}
          </Text>
          <Text as="p" weight="bold">
            {stats.precipitation}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="Visibility"
              size={"1em"}
              title={t("current.visibility")}
            />
            {t("current.visibility")}
          </Text>
          <Text as="p" weight="bold">
            {stats.visibility}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="UVIndex"
              size={"1em"}
              title="Ultraviolet index"
            />
            <span>
              <Trans
                components={{
                  abbr: <abbr title={t("current.ultraviolet")} />,
                }}
                i18nKey="current.uv-index"
                t={t}
              />
            </span>
          </Text>
          <Text as="p" weight="bold">
            {stats.ultravioletIndex}
          </Text>
        </li>
      </ul>
    </Section>
  );
}
