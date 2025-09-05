import type { ComponentProps } from "react";

export interface Props extends ComponentProps<"svg"> {
  code: number;
  isDay: 0 | 1;
  title: string;
  size?: number;
}

export function WeatherIcon({
  code,
  isDay,
  title,
  size = 24,
  ...props
}: Props) {
  return (
    <svg height={size} width={size} {...props} role="img">
      <title>{title}</title>
      <use href={`weather-sprite.svg#${code}-${isDay}`} />
    </svg>
  );
}
