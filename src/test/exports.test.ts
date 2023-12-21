import { auditDebounce, auditDebounceTime, CANCEL_SIGNAL } from '../index'


test('everything is exported.', () => {
  expect(auditDebounce).toBeDefined()
  expect(auditDebounceTime).toBeDefined()
  expect(CANCEL_SIGNAL).toBeDefined()
})
