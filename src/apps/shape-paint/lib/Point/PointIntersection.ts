import { PointProp, Point } from './index'
import { Line } from '../Line'

/**
 * The properties of PointIntersection.
 */
interface PointIntersectionProp extends PointProp {}

/**
 * Represents points as an intersection of two lines.
 * @hierarchy Shape <- Point <- PointIntersection
 */
class PointIntersection extends Point {
  protected declare __dependencies: Line[]
  protected declare __prop: PointIntersectionProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Line.
   */
  constructor(dependencies: Line[], prop: PointIntersectionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === 'Line')
    )
      throw new Error('Dependencies are not type of Point')
    super(dependencies, prop)
  }

  /**
   * Calculates the intersection of two Lines.
   */
  resolve() {
    return this.__dependencies[0].intersect(this.__dependencies[1])
  }
}

export { PointIntersectionProp, PointIntersection }
