import { SVGAttributes } from 'react'
import { LARGE_NUMBER } from '../tools'
import { Coord } from '../Coord'
import { RLineProp, RLine } from './RLine'

/**
 * The properties of RLineHorizontal which extends RLineProp.
 * @prop y - The y coordinate.
 */
interface RLineHorizontalProp extends RLineProp {
  y: number
}

/**
 * Represents horizontal lines.
 *
 * @example RLineHorizontal {
 *   prop: { y: 10 };
 * }
 * represents a horizontal line whose y coordinate is 10.
 *
 * @hierarchy RShape <- RLine <- RLineHorizontal
 */
class RLineHorizontal extends RLine {
  public static REL_TYPE = 'RLineHorizontal'
  protected declare __prop: RLineHorizontalProp

  constructor(
    _: any,
    prop: RLineHorizontalProp,
    style?: SVGAttributes<SVGLineElement>,
  ) {
    super([], prop, style, RLineHorizontal.REL_TYPE)
  }

  protected preresolve() {
    return {
      coord1: new Coord(-LARGE_NUMBER, this.__prop.y),
      coord2: new Coord(LARGE_NUMBER, this.__prop.y),
      extend1: true,
      extend2: true,
    }
  }
}

export { RLineHorizontalProp, RLineHorizontal }
