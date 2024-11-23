import { ReactSVGElement, SVGAttributes } from 'react'
import { LARGE_NUMBER } from '../tools'
import { Coord } from '../Coord'
import { RLineProp, RLine } from './RLine'
import { RShape } from '../RShape'

/**
 * The properties of RLineVertical which extends RLineProp.
 * @prop x - The x coordinate.
 */
interface RLineVerticalProp extends RLineProp {
  x: number
}

/**
 * Represents vertical lines.
 *
 * @example RLineVertical {
 *   prop: { x: 10 }
 * }
 * represents a vertical line whose x coordinate is 10.
 *
 * @hierarchy RShape <- RLine <- RLineVertical
 */
class RLineVertical extends RLine {
  public static REL_TYPE = 'RLineVertical'
  protected declare __prop: RLineVerticalProp

  constructor(_: RShape[], prop: RLineVerticalProp, style?: SVGAttributes<ReactSVGElement>) {
    super([], prop, style, RLineVertical.REL_TYPE)
  }

  protected preresolve() {
    return {
      coord1: new Coord(this.__prop.x, -LARGE_NUMBER),
      coord2: new Coord(this.__prop.x, LARGE_NUMBER),
      extend1: true,
      extend2: true,
    }
  }
}

export { RLineVerticalProp, RLineVertical }
