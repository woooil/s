import { checkDependenciesInitError } from '../Error'
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
    checkDependenciesInitError(dependencies, [RLine.TYPEL1, RLine.TYPEL1])
    super(dependencies, prop, RPointIntersection.TYPEL2)
  }

  /**
   * Calculates the intersection of two Lines.
   */
  resolve() {
    const intersect = this.__dependencies[0].intersect(this.__dependencies[1])
    return {
      coord: intersect,
      hide: this.__prop.hide,
    }
  }
}

export { RPointIntersectionProp, RPointIntersection }
