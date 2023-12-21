import { auditDebounce } from '../src'

document.querySelector('main')!.innerHTML = `<h1>${auditDebounce().msg}</h1>`
