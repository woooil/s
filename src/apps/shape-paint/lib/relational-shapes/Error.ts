interface DependeciesInitError extends Error {
  name: 'DependenciesInitError'
  length: string | number
  type: string
}

function DependeciesInitError(
  length: string | number,
  type: string,
  dependencies: string[],
) {
  const error = new Error(
    `The given Dependencies is not of ${type} type or its length is not ${length}: ${dependencies.toString()}`,
  ) as DependeciesInitError
  error.name = 'DependenciesInitError'
  return error
}

interface ParallelLinesError extends Error {
  name: 'ParallelLinesError'
  id1: string
  id2: string
}

function ParallelLinesError(line1: string, line2: string) {
  const error = new Error(
    `Line ${line1} and Line ${line2} are parallel.`,
  ) as ParallelLinesError
  error.name = 'ParallelLinesError'
  return error
}

export { DependeciesInitError, ParallelLinesError }
