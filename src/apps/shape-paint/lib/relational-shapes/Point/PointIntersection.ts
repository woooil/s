import { DependeciesInitError } from '../Error'
import { PointProp, Point } from './Point'
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
   * @throws Throws DependenciesInitError if given Dependencies are not of Line type or its length is not 2.
   */
  constructor(dependencies: Line[], prop: PointIntersectionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === Line.TYPE)
    )
      throw DependeciesInitError(
        2,
        Line.TYPE,
        dependencies.map(i => i.id),
      )
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
