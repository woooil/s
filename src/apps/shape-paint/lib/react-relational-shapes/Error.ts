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
  error.a = a
  error.b = b
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
  error.a = a
  error.b = b
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
  error.a = a
  return error
}

interface NoSuchShapeError extends Error {
  name: 'NoSuchShapeError'
  a: any
  b: any
}

function NoSuchShapeError(a: any, b: any) {
  const error = new Error(
    `There is no such shape ${a} in ${b}.`
  ) as NoSuchShapeError
  error.name = 'NoSuchShapeError'
  error.a = a
  error.b = b
  return error
}

export { ParallelLinesError, NotEqualError, DefaultCaseError, NoSuchShapeError }
