import { useRef } from "react";
import { Button, Heading, Icon, Section, Text } from "#shared/ui";
import styles from "./HourlyForecast.module.css";

interface Props {
  forecast: Array<{
    time: string;
    condition: {
      text: string;
      code: string; // TODO: Вместо кода получать сразу иконку?
    };
    temperature: {
      celsius: string;
      fahrenheit: string;
    };
    chanceOfRain: number;
    chanceOfSnow: number;
  }>;
}

export function HourlyForecast({ forecast }: Props) {
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
          {forecast.map((hour) => (
            <li className={styles.item} key={hour.time}>
              <Text as="p">{hour.time}</Text>
              <Icon.Weather
                name={hour.condition.code}
                size={"3em"}
                title={hour.condition.text}
              />
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
