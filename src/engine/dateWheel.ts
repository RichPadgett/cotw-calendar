import { EnochSeason } from "../models/calendar";
import {
  ENOCH_DAYS_PER_YEAR,
  ENOCH_INTERCALARY_DAYS,
  ENOCH_WHEEL_DEGREES_PER_DAY,
} from "./enochConstants";

export function getWheelAngle(dayOfYear: number): number {
  if (dayOfYear < 1 || dayOfYear > ENOCH_DAYS_PER_YEAR) {
    throw new Error(`Invalid wheel dayOfYear: ${dayOfYear}`);
  }

  return (dayOfYear - 1) * ENOCH_WHEEL_DEGREES_PER_DAY;
}


export function getWheelGate(
  dayOfYear: number
): EnochSeason | undefined {
  switch (dayOfYear) {
    case 364:
    case 1:
      return "spring";

    case 91:
      return "summer";

    case 182:
      return "fall";

    case 273:
      return "winter";

    default:
      return undefined;
  }
}
