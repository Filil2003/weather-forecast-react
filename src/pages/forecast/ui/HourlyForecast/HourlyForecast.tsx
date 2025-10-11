import { type JSX, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Button, Heading, Icon, Section, Text } from "#shared/ui";
import styles from "./HourlyForecast.module.css";

interface Props {
  forecast: Array<{
    // id: string; // crypto.randomUUID()
    time: string;
    icon: JSX.Element;
    temperature: {
      celsius: string;
      fahrenheit: string;
    };
    chanceOfRain: number;
    chanceOfSnow: number;
  }>;
}

export function HourlyForecast({ forecast }: Props) {
  const { t } = useTranslation();
  const listRef = useRef<HTMLUListElement | null>(null);

  function handlePrev() {
    if (!listRef.current) return;

    listRef.current.scrollBy({
      left: -listRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  function handleNext() {
    if (!listRef.current) return;

    listRef.current.scrollBy({
      left: listRef.current.clientWidth,
      behavior: "smooth",
    });
  }

  return (
    <Section heading={t("hourly.title")} headingLevel="h2">
      <div className={styles.slider}>
        <Button onClick={handlePrev} shape="round">
          <Icon.Common name="ArrowLeft" title="Scroll left" />
        </Button>
        <ul className={styles.list} ref={listRef}>
          {forecast.map((hour) => (
            <li className={styles.item} key={hour.time}>
              <Text as="p">
                {t("hourly.time", {
                  time: new Date(hour.time),
                })}
              </Text>
              {hour.icon}
              <Heading as="h3" variant="small">
                {hour.temperature.celsius}
              </Heading>
              <Text as="p" className={styles.precipitation} variant="caption">
                <Icon.Common name="Raindrop" size={"1rem"} title="Raindrop" />
                {hour.chanceOfRain}
              </Text>
            </li>
          ))}
        </ul>
        <Button onClick={handleNext} shape="round">
          <Icon.Common name="ArrowRight" title="Scroll right" />
        </Button>
      </div>
    </Section>
  );
}
