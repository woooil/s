import { SVGAttributes } from 'react'
import { RPoint, RPointResolvedProp } from './RPoint'
import { RLine } from '../RLine'

/**
 * The properties of RPointIntersection.
 * @extends RPointResolvedProp
 */
interface RPointIntersectionProp extends RPointResolvedProp {}

/**
 * Represents points as an intersection of two RLines.
 *
 * @example RPointIntersection {
 *   dependencies: [RLine1, RLine2];
 * }
 * represents the intersection point of RLine1 and RLine2.
 *
 * @hierarchy RShape <- RPoint <- RPointIntersection
 */
class RPointIntersection extends RPoint {
  public static REL_TYPE = 'RPointIntersection'
  protected declare __dependencies: [RLine, RLine]

  constructor(
    dependencies: [RLine, RLine],
    prop: RPointIntersectionProp,
    style?: SVGAttributes<SVGCircleElement>,
  ) {
    super(dependencies, prop, style, RPointIntersection.REL_TYPE)
  }

  public resolve() {
    const { coord } = RLine.intersect(
      this.__dependencies[0],
      this.__dependencies[1],
    )
    return {
      ...this.__prop,
      coord,
    }
  }
}

export { RPointIntersectionProp, RPointIntersection }
