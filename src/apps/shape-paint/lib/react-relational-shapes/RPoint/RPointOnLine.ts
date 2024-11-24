import { SVGAttributes } from 'react'
import { RPoint, RPointResolvedProp } from './RPoint'
import { RLine, CoordOnLine } from '../RLine'

/**
 * The properties of RPointOnLine.
 * @prop onLine - The CoordOnLine on the depended RLine.
 * @extends RPointResolvedProp
 */
interface RPointOnLineProp extends RPointResolvedProp {
  onLine: CoordOnLine
}

/**
 * Represents points on RLine.
 *
 * @example RPointOnLine {
 *   dependencies: [RLine1];
 *   prop: { type: 'coord1', value: 10 };
 * }
 * represents a point which is distant by 10 from coord1 of RLine1 along RLine1.
 *
 * @hierarchy RShape <- RPoint <- RPointOnLine
 */
class RPointOnLine extends RPoint {
  public static REL_TYPE = 'RPointOnLine'
  protected declare __dependencies: [RLine]
  protected declare __prop: RPointOnLineProp

  constructor(
    dependencies: [RLine],
    prop: RPointOnLineProp,
    style?: SVGAttributes<SVGCircleElement>,
  ) {
    super(dependencies, prop, style, RPointOnLine.REL_TYPE)
  }

  public resolve() {
    return {
      ...this.__prop,
      coord: this.__dependencies[0].coordOnLine(this.__prop.onLine),
    }
  }
}

export { RPointOnLineProp, RPointOnLine }
