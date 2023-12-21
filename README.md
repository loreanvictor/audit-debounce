<div align="right">

[![npm package minimized gzipped size](https://img.shields.io/bundlephobia/minzip/audit-debounce?style=flat-square&label=%20&color=black)](https://bundlejs.com/?q=audit-debounce)
[![npm](https://img.shields.io/npm/v/audit-debounce?color=black&label=&style=flat-square)](https://www.npmjs.com/package/audit-debounce)
[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/loreanvictor/audit-debounce/coverage.yml?label=&style=flat-square)](https://github.com/loreanvictor/audit-debounce/actions/workflows/coverage.yml)

</div>

# audit-debounce

[RxJS](https://rxjs.dev) operator to debounce and audit simultaenously. When you [`debounce()`](https://rxjs.dev/api/operators/debounce) a particularly active observable, you might have to wait a long
time to get any value from it (if it is constantly emitting values). `auditDebounce()` solves this problem by
debouncing the observable, but also emitting the latest value after a given duration has passed.

```js
import { auditDebounceTime } from 'audit-debounce'

source$.pipe(
  // debounce for 100ms, but also emit the latest value after 1000ms
  auditDebounceTime(100, 1000)
)
```
```js
import { timer } from 'rxjs'
import { auditDebounce } from 'audit-debounce'

source$.pipe(
  // debounce for 100ms, but also emit the latest value after 1000ms
  auditDebounce(
    () => timer(100),
    () => timer(1000)
  )
)
```

<br>

# Contents

- [Contents](#contents)
- [Installation](#installation)
- [Usage](#usage)
- [Contribution](#contribution)

<br>

# Installation

[Node](https://nodejs.org/en/):

```bash
npm i audit-debounce
```

Browser / [Deno](https://deno.land):

```js
import { auditDebounceTime } from 'https://esm.sh/audit-debounce'
```

<br>

# Usage

This package provides the following functions:

```ts
function auditDebounceTime<T>(
  debounceTime: number,
  auditTime: number,
  scheduler?: SchedulerLike
): MonoTypeOperatorFunction<T>
```
```ts
function auditDebounce<T>(
  debounceSelector: (value: T | typeof CANCEL_SIGNAL) => ObservableInput<any>,
  auditSelector: (value: T | typeof CANCEL_SIGNAL) => ObservableInput<any>
): MonoTypeOperatorFunction<T>
```

The operator will debounce incoming values, but also makes sure values are emitted after certain duration
is passed.

```
source$:           --a-b------c-d-e-f------h-i-j-k-l----->
debounceSelector$:   -----x   ---------x   -----------x
auditSelector$:      -------y -------y     -------y
result$:           -------b----------f------------k---l-->
```

<br>

# Contribution

You need [node](https://nodejs.org/en/), [NPM](https://www.npmjs.com) to start and [git](https://git-scm.com) to start.

```bash
# clone the code
git clone git@github.com:loreanvictor/audit-debounce.git
```
```bash
# install stuff
npm i
```

Make sure all checks are successful on your PRs. This includes all tests passing, high code coverage, correct typings and abiding all [the linting rules](https://github.com/loreanvictor/audit-debounce/blob/main/.eslintrc). The code is typed with [TypeScript](https://www.typescriptlang.org), [Jest](https://jestjs.io) is used for testing and coverage reports, [ESLint](https://eslint.org) and [TypeScript ESLint](https://typescript-eslint.io) are used for linting. Subsequently, IDE integrations for TypeScript and ESLint would make your life much easier (for example, [VSCode](https://code.visualstudio.com) supports TypeScript out of the box and has [this nice ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)), but you could also use the following commands:

```bash
# run tests
npm test
```
```bash
# check code coverage
npm run coverage
```
```bash
# run linter
npm run lint
```
```bash
# run type checker
npm run typecheck
```
