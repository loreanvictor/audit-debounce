import { ObservableInput, MonoTypeOperatorFunction, Subject, merge } from 'rxjs'
import { audit, debounce, tap, filter, map, share } from 'rxjs/operators'

import { CANCEL_SIGNAL } from './types'


export function auditDebounce<T>(
  debounceSelector: (value: T | typeof CANCEL_SIGNAL) => ObservableInput<any>,
  auditSelector: (value: T | typeof CANCEL_SIGNAL) => ObservableInput<any>,
): MonoTypeOperatorFunction<T> {
  return (source) => {
    const sourceShared$ = source.pipe(share())
    const cancelAudit$ = new Subject<typeof CANCEL_SIGNAL>()
    const cancelDebounce$ = new Subject<typeof CANCEL_SIGNAL>()

    const debounceIn$ = merge(sourceShared$, cancelDebounce$).pipe(
      debounce(debounceSelector),
      tap(() => cancelAudit$.next(CANCEL_SIGNAL)),
    )

    const auditIn$ = merge(sourceShared$, cancelAudit$).pipe(
      audit(auditSelector),
      tap(() => cancelDebounce$.next(CANCEL_SIGNAL)),
    )

    return merge(debounceIn$, auditIn$).pipe(
      filter((value) => value !== CANCEL_SIGNAL),
      map(value => value as T),
    )
  }
}
