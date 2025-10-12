import clsx from "clsx";
import type { ComponentProps } from "react";
import styles from "./Icon.module.css";

type SpriteIcons = {
  common:
    | "ArrowDown"
    | "ArrowLeft"
    | "ArrowRight"
    | "Cross"
    | "Settings"
    | "History"
    | "Humidity"
    | "Location"
    | "Precipitation"
    | "Pressure"
    | "Raindrop"
    | "Search"
    | "Snowflake"
    | "SnowWithRain"
    | "UVIndex"
    | "Visibility"
    | "Wind";
  flags: "RU" | "US";
  weather: string;
};

type Sprites = keyof SpriteIcons;

interface Props<T extends Sprites> extends ComponentProps<"svg"> {
  title: string;
  sprite: T;
  name: SpriteIcons[T];
  size?: number | string;
  dirSensitive?: boolean;
}

function IconComponent<T extends Sprites>({
  title,
  sprite,
  name,
  size = 24,
  dirSensitive = false,
  className,
  ...restProps
}: Props<T>) {
  const classNames = clsx(className, {
    [styles.dirSensitive]: dirSensitive,
  });

  return (
    <svg className={classNames} height={size} width={size} {...restProps}>
      <title>{title}</title>
      <use href={`icons/${sprite}.svg#${name}`} />
    </svg>
  );
}

export const Icon = Object.assign(IconComponent, {
  Common: (props: Omit<Props<"common">, "sprite">) => (
    <IconComponent sprite="common" {...props} />
  ),
  Flags: (props: Omit<Props<"flags">, "sprite">) => (
    <IconComponent sprite="flags" {...props} />
  ),
  Weather: (props: Omit<Props<"weather">, "sprite">) => (
    <IconComponent sprite="weather" {...props} />
  ),
});
