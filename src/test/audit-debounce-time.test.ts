import sleep from 'sleep-promise'

import { Subject } from 'rxjs'
import { auditDebounceTime } from '..'


describe(auditDebounceTime, () => {
  test('it emits values after debounce.', async () => {
    const src = new Subject<number>()
    const cb = jest.fn()

    src.pipe(auditDebounceTime(2, 10)).subscribe(cb)

    src.next(1)
    await sleep(1)
    src.next(2)
    await sleep(1)
    src.next(3)
    await sleep(1)

    expect(cb).not.toHaveBeenCalled()

    await sleep(1)

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(3)

    await sleep(20)

    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('it emits values after audit.', async () => {
    const src = new Subject<number>()
    const cb = jest.fn()

    src.pipe(auditDebounceTime(3, 4)).subscribe(cb)

    src.next(1)
    await sleep(1)
    src.next(2)
    await sleep(1)
    src.next(3)
    await sleep(2)

    expect(cb).toHaveBeenCalledTimes(1)
    expect(cb).toHaveBeenCalledWith(3)

    await sleep(10)

    expect(cb).toHaveBeenCalledTimes(1)
  })

  test('it emits an audited and debounced value when appropriate.', async () => {
    const src = new Subject<number>()
    const cb = jest.fn()

    src.pipe(auditDebounceTime(2, 4)).subscribe(cb)

    src.next(1)
    await sleep(1)
    src.next(2)
    await sleep(1)
    src.next(3)
    await sleep(1)
    src.next(4)
    await sleep(1)
    src.next(5)
    await sleep(3)

    expect(cb).toHaveBeenCalledTimes(2)
    expect([3, 4]).toContain(cb.mock.calls[0][0])
    expect(cb).toHaveBeenCalledWith(5)
  })
})
