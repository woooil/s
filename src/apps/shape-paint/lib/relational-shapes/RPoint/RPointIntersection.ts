import { RPoint } from './RPoint'
import { RLine } from '../RLine'

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

  constructor(dependencies: [RLine, RLine], _: any) {
    super(dependencies, {}, RPointIntersection.REL_TYPE)
  }

  public resolve() {
    const { coord } = RLine.intersect(this.__dependencies[0], this.__dependencies[1])
    return {
      coord,
    }
  }
}

export { RPointIntersection }
