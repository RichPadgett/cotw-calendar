import { CalendarNode } from '../../models/calendar'

export function buildMonth(): CalendarNode[] {
  return [
    {
      type: 'month-day',

      gregorianDate: '2026-01-01',

      gregorian: {
        day: 1,
        month: 1,
        year: 2026,
      },

      enoch: {
        month: 1,
        day: 1,
      },
    },

    {
      type: 'intercalary',

      gregorianDate: '2026-03-31',

      quarter: 1,

      title: 'Spring Transition',
    },
  ]
}
