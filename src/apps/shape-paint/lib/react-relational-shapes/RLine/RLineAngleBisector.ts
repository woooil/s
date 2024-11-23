import { SVGAttributes } from 'react'
import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { RLineProp, RLine } from './RLine'

/**
 * The properties of RLineAngleBisectorProp which extends RLineProp.
 * @prop reverse1 - Reverses the direction of the first depended RLine if true.
 * @prop reverse2 - Reverses the direction of the second depended RLine if true.
 * @prop length   - The length, if provided.
 */
interface RLineAngleBisectorProp extends RLineProp {
  reverse1?: boolean
  reverse2?: boolean
  length?: number
}

/**
 * Represents lines as the angle bisector of two RLines.
 *
 * This is a ray unless length is provided, which makes it a segment.
 *
 * @example RLineAngleBisector {
 *   dependencies: [RLine1, RLine2];
 *   prop: { reverse1: true, length: 10 };
 * }
 * represents an angle bisector segment of the reversed RLine1 and RLine2 with length of 10.
 *
 * @hierarchy RShape <- RLine <- RLineAngleBisector
 */
class RLineAngleBisector extends RLine {
  public static REL_TYPE = 'RLineAngleBisector'
  protected declare __dependencies: [RLine, RLine]
  protected declare __prop: RLineAngleBisectorProp

  constructor(
    dependencies: [RLine, RLine],
    prop: RLineAngleBisectorProp,
    style?: SVGAttributes<SVGLineElement>,
  ) {
    super(dependencies, prop, style, RLineAngleBisector.REL_TYPE)
  }

  /**
   * @throws Throws a ParallelLinesError if two RLines are parallel.
   */
  protected preresolve() {
    const { coord: coord1, thetaMid: theta } = RLine.intersect(
      this.__dependencies[0],
      this.__dependencies[1],
      this.__prop.reverse1,
      this.__prop.reverse2,
    ) // Throws an Error

    const coord2 = coord1.addPolar(
      new CoordPolar(this.__prop.length || LARGE_NUMBER, theta),
    )

    return {
      coord1,
      coord2,
      extend1: false,
      extend2: !this.__prop.length,
    }
  }
}

export { RLineAngleBisectorProp, RLineAngleBisector }
