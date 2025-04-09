import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

export const ORIGINAL_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const SUMMARY_FORMAT = "MMMM DD, YYYY";
export const SHORT_TIME = "HH:mm";

export const customFormat = (timestamp: number, newFormat: string) =>
  dayjs.unix(timestamp).format(newFormat);
