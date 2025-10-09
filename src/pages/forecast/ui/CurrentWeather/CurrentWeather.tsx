import { Heading, Icon, Section, Text } from "#shared/ui";
import styles from "./CurrentWeather.module.css";

export interface Props {
  weather: {
    condition: {
      text: string;
      code: string; // TODO: Вместо кода получать сразу иконку?
    };
    temperature: {
      actual: {
        celsius: string;
        fahrenheit: string; // TODO: На значение также плевать? Получать данные для отображения и всё, то есть решать что прокидывать цельсий или фаренгейт в другом месте повыше
      };
      feelsLike: {
        celsius: string;
        fahrenheit: string;
      };
    };
    wind: {
      metric: number; // TODO: По аналогии с температурой
      imperial: number;
    };
    pressure: {
      metric: number;
      imperial: number;
    };
    precipitation: {
      metric: number;
      imperial: number;
    };
    visibility: {
      metric: number;
      imperial: number;
    };
    humidity: number;
    ultravioletIndex: number;
  };
}

export function CurrentWeather({
  weather: { condition, temperature, ...stats },
}: Props) {
  return (
    <Section heading="Current forecast" headingLevel="h2" hideHeading={true}>
      <Heading as="h3" variant="medium">
        {condition.text}
      </Heading>
      <div className={styles.condition}>
        <div className={styles.temperature}>
          <Heading as="h3" variant="huge">
            {temperature.actual.celsius}
          </Heading>
          <Heading as="h3" variant="small">
            Feels like {temperature.feelsLike.celsius}
          </Heading>
        </div>
        <Icon.Weather name={condition.code} size={82} title={condition.text} />
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common name="Wind" size={"1em"} title="Wind" />
            Wind
          </Text>
          <Text as="p" weight="bold">
            {stats.wind.metric}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common name="Humidity" size={"1em"} title="Humidity" />
            Humidity
          </Text>
          <Text as="p" weight="bold">
            {stats.humidity}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common name="Pressure" size={"1em"} title="Pressure" />
            Pressure
          </Text>
          <Text as="p" weight="bold">
            {stats.pressure.metric}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="Precipitation"
              size={"1em"}
              title="Precipitation"
            />
            Precipitation
          </Text>
          <Text as="p" weight="bold">
            {stats.precipitation.metric}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common name="Visibility" size={"1em"} title="Visibility" />
            Visibility
          </Text>
          <Text as="p" weight="bold">
            {stats.visibility.metric}
          </Text>
        </li>
        <li className={styles.item}>
          <Text as="p" className={styles.title}>
            <Icon.Common
              name="UVIndex"
              size={"1em"}
              title="Ultraviolet index"
            />
            UV Index
          </Text>
          <Text as="p" weight="bold">
            {stats.ultravioletIndex}
          </Text>
        </li>
      </ul>
    </Section>
  );
}
