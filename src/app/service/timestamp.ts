export interface TimestampObj {
  tz: string;
  current: string;
  fullDate: string;
  fullDateTime: string;
  iso8601: string;
}
export interface Timestamp {
  current: TimestampObj;
  utc: TimestampObj;
}
