import clsx from "clsx";
import { Icon, Section, Text } from "#shared/ui";
import styles from "./WeeklyForecast.module.css";

interface Props {
  forecast: Array<{
    date: string;
    condition: {
      text: string;
      code: string; // TODO: Вместо кода получать сразу иконку?
    };
    temperature: {
      avg: {
        celsius: string;
        fahrenheit: string;
      };
      min: {
        celsius: string;
        fahrenheit: string;
      };
    };
  }>;
}

export function WeeklyForecast({ forecast }: Props) {
  return (
    <Section heading="Weekly forecast" headingLevel="h2">
      <ul className={styles.list}>
        {forecast.map((day, index) => (
          <li
            className={clsx(styles.item, { [styles.weekend]: index % 2 === 0 })}
            key={day.date}
          >
            <div>
              <Text as="p" className={styles.date} variant="caption">
                {day.date}
              </Text>
              <Text as="p" className={styles.day} weight="bold">
                {day.date}
              </Text>
            </div>
            <Icon.Weather
              name={day.condition.code}
              size={"2.25em"}
              title={day.condition.text}
            />
            <Text className={styles.condition}>{day.condition.text}</Text>
            <Text as="p" className={styles.temperature}>
              <Text weight="bold">{day.temperature.avg.celsius}</Text>
              {day.temperature.min.celsius}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
