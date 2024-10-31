import { DependeciesInitError } from '../Error'
import { RPointProp, RPoint } from './RPoint'
import { RLine } from '../RLine'

/**
 * The properties of RPointIntersection.
 */
interface RPointIntersectionProp extends RPointProp {}

/**
 * Represents points as an intersection of two lines.
 * @hierarchy RShape <- RPoint <- RPointIntersection
 */
class RPointIntersection extends RPoint {
  public static TYPEL2 = 'RPointIntersection'
  protected declare __dependencies: RLine[]
  protected declare __prop: RPointIntersectionProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Line type or its length is not 2.
   */
  constructor(dependencies: RLine[], prop: RPointIntersectionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RLine.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RLine.TYPEL2,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RPointIntersection.TYPEL2)
  }

  /**
   * Calculates the intersection of two Lines.
   */
  resolve() {
    return this.__dependencies[0].intersect(this.__dependencies[1])
  }
}

export { RPointIntersectionProp, RPointIntersection }
