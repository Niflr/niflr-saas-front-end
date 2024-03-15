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

export function fToTimeZone(date) {
  const timeZone = 'America/Toronto';
  return date ? utcToZonedTime(zonedTimeToUtc(new Date(date), timeZone), timeZone) : '';
}
