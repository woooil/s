interface ParallelLinesError extends Error {
  name: 'ParallelLinesError'
  id1: string
  id2: string
}

function ParallelLinesError(line1: string, line2: string) {
  const error = new Error(
    `RLine ${line1} and RLine ${line2} are parallel.`,
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

export { ParallelLinesError, NotEqualError }
