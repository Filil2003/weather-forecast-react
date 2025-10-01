import { WeatherIcon } from "#entities/weather/ui/WeatherIcon/WeatherIcon.tsx";
import { Heading } from "#shared/ui/Heading";
import { Icon } from "#shared/ui/Icon";
import { Section } from "#shared/ui/Section";
import { Text } from "#shared/ui/Text";
import styles from "./CurrentWeather.module.css";
import { mockCurrentWeather } from "./mock.ts";

export function CurrentWeather() {
  return (
    <Section heading="Current forecast" headingLevel="h2" hideHeading={true}>
      <Heading as="h3" variant="medium">
        {mockCurrentWeather.condition}
      </Heading>
      <div className={styles.condition}>
        <div className={styles.temperature}>
          <Heading as="h3" variant="huge">
            {mockCurrentWeather.temperature}
          </Heading>
          <Heading as="h3" variant="small">
            Feels like {mockCurrentWeather.feelsLike}
          </Heading>
        </div>
        <WeatherIcon
          code={mockCurrentWeather.code}
          isDay={mockCurrentWeather.isDay}
          size={82}
          title={mockCurrentWeather.condition}
        />
      </div>
      <ul className={styles.list}>
        {mockCurrentWeather.details.map(({ name, icon, value }) => (
          <li className={styles.item} key={name}>
            <Text as="p" className={styles.title}>
              <Icon.Common name={icon} size={"1em"} title={name} />
              {name}
            </Text>
            <Text as="p" weight="bold">
              {value}
            </Text>
          </li>
        ))}
      </ul>
    </Section>
  );
}
