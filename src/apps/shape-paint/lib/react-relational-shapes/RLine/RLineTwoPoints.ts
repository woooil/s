import { ReactSVGElement, SVGAttributes } from 'react'
import { RLineProp, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineTwoPointsProp which extends RLineProp.
 * @prop extend1  - Extends backwards over the first Coord if true.
 * @prop extend2  - Extends forwards over the second Coord if true.
 */
interface RLineTwoPointsProp extends RLineProp {
  extend1?: boolean
  extend2?: boolean
}

/**
 * Represents lines as two RPoints it passes through.
 *
 * @example RLineTwoPoints {
 *   dependencies: [RPoint1, RPoint2];
 *   prop: { extend2: true };
 * }
 * represents a ray which starts at RPoint1 and extends over RPoint2.
 *
 * @hierarchy RShape <- RLine <- RLineTwoPoints
 */
class RLineTwoPoints extends RLine {
  public static REL_TYPE = 'RLineTwoPoints'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RLineTwoPointsProp

  constructor(dependencies: [RPoint, RPoint], prop: RLineTwoPointsProp, style?: SVGAttributes<ReactSVGElement>) {
    super(dependencies, prop, style, RLineTwoPoints.REL_TYPE)
  }

  protected preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      coord1: aResolved.coord,
      coord2: bResolved.coord,
      extend1: !!(this.__prop.extend1),
      extend2: !!(this.__prop.extend2),
    }
  }
}

export { RLineTwoPointsProp, RLineTwoPoints }
