declare module 'date-fns' {
  export function format(date: Date, format: string): string
  declare function formatDistanceToNowStrict(
    date: Date | string,
    options?: {
      unit?: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year'
      addSuffix?: boolean
    }
  ): string
}
