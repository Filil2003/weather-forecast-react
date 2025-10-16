import type { ErrorResponse } from "./dto.ts";

export class WeatherApiError extends Error {
  readonly details: ErrorResponse["error"];

  constructor({ message, code }: ErrorResponse["error"], cause?: Error) {
    super(`${code}: ${message}`, { cause });
    this.name = this.constructor.name;
    this.details = { message, code };
  }
}
