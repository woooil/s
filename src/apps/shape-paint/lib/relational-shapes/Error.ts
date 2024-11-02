import { RShape, RShapeTypeL1 } from './RShape'

interface DependeciesInitError extends Error {
  name: 'DependenciesInitError'
}

function DependeciesInitError(
  dependencies: string[],
) {
  const error = new Error(
    `The given Dependencies are not compatible: ${dependencies.toString()}`,
  ) as DependeciesInitError
  error.name = 'DependenciesInitError'
  return error
}

function checkDependenciesInitError(dependencies: RShape[], types: RShapeTypeL1[] ) {
    if (
      dependencies.length !== types.length ||
      !dependencies.every((i, idx) => i.type[0] === types[idx])
    )
      throw DependeciesInitError(dependencies.map(i => i.id))
}

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

export { DependeciesInitError, ParallelLinesError, NotEqualError }
export { checkDependenciesInitError }
