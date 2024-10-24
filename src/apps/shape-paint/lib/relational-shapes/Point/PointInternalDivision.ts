import { DependeciesInitError } from '../Error'
import { PointProp, Point } from './Point'

/**
 * The properties of PointInternalDivison.
 * @prop r - The division ratio.
 */
interface PointInternalDivisionProp extends PointProp {
  r: number
}

/**
 * Represents points as internal divisions of two points.
 * @hierarchy Shape <- Point <- PointInternalDivision
 */
class PointInternalDivision extends Point {
  protected declare __dependencies: Point[]
  protected declare __prop: PointInternalDivisionProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Point type or its length is not 2.
   */
  constructor(dependencies: Point[], prop: PointInternalDivisionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === Point.TYPE)
    )
      throw DependeciesInitError(
        2,
        Point.TYPE,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop)
  }

  /**
   * Calculates the internal division mathematically.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      x: aResolved.x * (1 - this.__prop.r) + bResolved.x * this.__prop.r,
      y: aResolved.y * (1 - this.__prop.r) + bResolved.y * this.__prop.r,
    }
  }
}

export { PointInternalDivisionProp, PointInternalDivision }
