import { format, getTime, formatDistanceToNow } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime} from "date-fns-tz";

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fToCanadaTime(time) {
  const easternTimeZone = "America/Toronto";
  const canadianTime = new Intl.DateTimeFormat("en-US", {
    timeZone: easternTimeZone,
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
  }).format(time);
  console.log("converted canada time", canadianTime);
  return canadianTime;

}
