function qualifiedLngFor(lng: string): string {
  switch (lng) {
    case "ru":
      return "ru";
    case "en":
      return "en-US";
    case "ar":
      return "ar-EG";
    default:
      return lng;
  }
}

/**
 * Formats a datetime.
 *
 * @param value - The datetime to format.
 * @param lng - The language to format the number in.
 * @param options - passed to Intl.DateTimeFormat.
 * @returns The formatted datetime.
 */
export function datetime(
  value: Date | number,
  lng: string | undefined,
  options?: Intl.DateTimeFormatOptions,
): string {
  return new Intl.DateTimeFormat(qualifiedLngFor(lng!), options).format(value);
}

/**
 * Formats a number.
 *
 * @param value - The number to format.
 * @param lng - The language to format the number in.
 * @param options - passed to Intl.NumberFormat.
 * @returns The formatted number.
 */
export function number(
  value: number,
  lng: string | undefined,
  options?: Intl.NumberFormatOptions,
): string {
  return new Intl.NumberFormat(qualifiedLngFor(lng!), options).format(value);
}
