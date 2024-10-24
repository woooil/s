import { Shape } from '../Shape'
import { PointProp, Point, PointResolved } from './index'

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
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Point[], prop: PointInternalDivisionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === 'Point')
    )
      throw new Error('Dependencies are not type of Point')
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
