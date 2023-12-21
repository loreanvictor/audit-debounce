import { ObservableInput, MonoTypeOperatorFunction, Subject, merge } from 'rxjs'
import { audit, debounce, tap, filter, share } from 'rxjs/operators'

import { CANCEL_SIGNAL, isNotCancel } from './types'


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
      filter(isNotCancel),
      tap(() => cancelAudit$.next(CANCEL_SIGNAL)),
    )

    const auditIn$ = merge(sourceShared$, cancelAudit$).pipe(
      audit(auditSelector),
      filter(isNotCancel),
      tap(() => cancelDebounce$.next(CANCEL_SIGNAL)),
    )

    return merge(debounceIn$, auditIn$)
  }
}
