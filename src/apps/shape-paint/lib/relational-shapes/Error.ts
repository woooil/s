interface ParallelLinesError extends Error {
  name: 'ParallelLinesError'
  a: any
  b: any
}

function ParallelLinesError(a: any, b: any) {
  const error = new Error(
    `${a} and ${b} are parallel.`,
  ) as ParallelLinesError
  error.name = 'ParallelLinesError'
  return error
}

interface NotEqualError extends Error {
  name: 'NotEqualError'
  a: any
  b: any
}

function NotEqualError(a: any, b: any) {
  const error = new Error(
    `${a} and ${b} are not equal.`,
  ) as NotEqualError
  error.name = 'NotEqualError'
  return error
}

interface DefaultCaseError extends Error {
  name: 'DefaultCaseError'
  a: any
}

function DefaultCaseError(a: any) {
  const error = new Error(
    `${a} does not match any cases.`,
  ) as DefaultCaseError
  error.name = 'DefaultCaseError'
  return error
}

export { ParallelLinesError, NotEqualError, DefaultCaseError }
