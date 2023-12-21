import { SchedulerLike, timer } from 'rxjs'

import { auditDebounce } from './audit-debounce'


export function auditDebounceTime<T>(
  debounceTime: number,
  auditTime: number,
  scheduler?: SchedulerLike,
) {
  return auditDebounce<T>(
    () => timer(debounceTime, scheduler),
    () => timer(auditTime, scheduler),
  )
}
