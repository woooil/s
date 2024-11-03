import { RPointProp, RPointStyle, RPoint } from './RPoint'
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
  protected declare __dependencies: [RLine, RLine]
  protected declare __prop: RPointIntersectionProp

  constructor(dependencies: [RLine, RLine], prop: RPointIntersectionProp, style?: RPointStyle) {
    super(dependencies, prop, style, RPointIntersection.TYPEL2)
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
