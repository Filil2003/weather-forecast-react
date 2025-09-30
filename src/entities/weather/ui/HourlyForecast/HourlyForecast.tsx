import { useRef } from "react";
import { Button } from "#shared/ui/Button";
import { Heading } from "#shared/ui/Heading";
import { Icon } from "#shared/ui/Icon";
import { Section } from "#shared/ui/Section";
import { Text } from "#shared/ui/Text";
import { WeatherIcon } from "../WeatherIcon/WeatherIcon.tsx";
import styles from "./HourlyForecast.module.css";
import { mockHourlyForecast } from "./mock.ts";

export function HourlyForecast() {
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
    <Section heading="Hourly forecast" headingLevel="h2">
      <div className={styles.slider}>
        <Button onClick={handlePrev} shape="round">
          <Icon.Common name="ArrowLeft" title="Scroll left" />
        </Button>
        <ul className={styles.list} ref={listRef}>
          {mockHourlyForecast.map((hour) => (
            <li className={styles.item} key={hour.time}>
              <Text as="p">{hour.time}</Text>
              <WeatherIcon
                code={hour.code}
                isDay={hour.isDay}
                size={"3em"}
                title={hour.condition}
              />
              <Heading as="h3" variant="small">
                {hour.temperature}
              </Heading>
              <Text as="p" className={styles.precipitation} variant="caption">
                <Icon.Common name="Raindrop" size={"1rem"} title="Raindrop" />
                {hour.precipitationChange}
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
