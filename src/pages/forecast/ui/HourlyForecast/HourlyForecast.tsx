import { useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "#shared/model";
import { Button, Heading, Icon, Section, Text } from "#shared/ui";
import type { Hour } from "../../model";
import styles from "./HourlyForecast.module.css";

interface Props {
  data: Hour[];
}

export function HourlyForecast({ data }: Props) {
  const { t, i18n } = useTranslation();
  const temperatureUnit = useSettingsStore((store) => store.temperatureUnit);

  const listRef = useRef<HTMLUListElement | null>(null);

  const scrollList = useCallback(
    (direction: "next" | "prev") => {
      if (!listRef.current) return;

      const scrollAmount = listRef.current.clientWidth;
      const isRTL = i18n.dir(i18n.resolvedLanguage) === "rtl";

      const delta =
        (direction === "next" ? 1 : -1) * scrollAmount * (isRTL ? -1 : 1);

      listRef.current.scrollBy({
        left: delta,
        behavior: "smooth",
      });
    },
    [i18n],
  );

  return (
    <Section heading={t("hourly.title")} headingLevel="h2">
      <div className={styles.slider}>
        <Button onClick={() => scrollList("prev")} shape="round">
          <Icon.Common
            dirSensitive={true}
            name="arrowLeft"
            title={t("hourly.button.prev")}
          />
        </Button>
        <ul className={styles.list} ref={listRef}>
          {data.map((hour) => (
            <li className={styles.item} key={hour.time}>
              <Text as="p">
                {t("hourly.time", {
                  time: new Date(hour.time),
                })}
              </Text>
              {hour.icon}
              <Heading as="h3" variant="small">
                {hour.temperature[temperatureUnit]}
              </Heading>
              <Text as="p" className={styles.precipitation} variant="caption">
                <Icon.Common name="raindrop" size={"1rem"} title="Raindrop" />
                {hour.chanceOfRain}
              </Text>
            </li>
          ))}
        </ul>
        <Button onClick={() => scrollList("next")} shape="round">
          <Icon.Common
            dirSensitive={true}
            name="arrowRight"
            title={t("hourly.button.next")}
          />
        </Button>
      </div>
    </Section>
  );
}
