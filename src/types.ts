export const CANCEL_SIGNAL = Symbol('AUDIT_DEBOUNCE_CANCEL_SYMBOL')

export function isNotCancel<T>(value: T | typeof CANCEL_SIGNAL): value is T {
  return value !== CANCEL_SIGNAL
}
