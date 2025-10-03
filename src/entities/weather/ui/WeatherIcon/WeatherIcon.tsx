import type { ComponentProps } from "react";
import { Icon } from "#shared/ui";

interface Props extends Omit<ComponentProps<typeof Icon.Weather>, "name"> {
  code: number;
  isDay: boolean;
}

export function WeatherIcon({ code, isDay, ...restProps }: Props) {
  const iconId = `${code}-${isDay ? "day" : "night"}`;

  return <Icon.Weather name={iconId} {...restProps} />;
}
