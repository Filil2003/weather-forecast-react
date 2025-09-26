import type { ComponentProps } from "react";

interface CustomProps {
  code: number;
  isDay: boolean;
  title: string;
  size?: number | string;
}

type Props = CustomProps & Omit<ComponentProps<"svg">, keyof CustomProps>;

export function WeatherIcon({
  code,
  isDay,
  title,
  size = 24,
  ...props
}: Props) {
  const iconId = `${code}-${isDay ? "day" : "night"}`;

  return (
    <svg height={size} width={size} {...props} role="img">
      <title>{title}</title>
      <use href={`weather-sprite.svg#${iconId}`} />
    </svg>
  );
}
