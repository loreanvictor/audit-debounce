import { Observable } from 'rxjs'

import { auditDebounce } from '../audit-debounce'


describe(auditDebounce, () => {
  test('it only makes one subscription to the source.', () => {
    const cb = jest.fn()
    const src$ = new Observable(cb)
    const adb$ = src$.pipe(auditDebounce(() => new Observable(), () => new Observable()))

    expect(cb).not.toHaveBeenCalled()

    adb$.subscribe()

    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('it cleans up subscriptions to the source.', () => {
    const cb = jest.fn()
    const src$ = new Observable(() => cb)
    const adb$ = src$.pipe(auditDebounce(() => new Observable(), () => new Observable()))

    const sub = adb$.subscribe()

    expect(cb).not.toHaveBeenCalled()

    sub.unsubscribe()

    expect(cb).toHaveBeenCalledTimes(1)
  })
})
