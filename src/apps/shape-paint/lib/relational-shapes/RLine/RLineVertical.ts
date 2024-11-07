import { LARGE_NUMBER } from '../tools'
import { Coord } from '../Coord'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RShape } from '../RShape'

/**
 * The properties of RLineVertical.
 * @prop x  - The x coordinate.
 */
interface RLineVerticalProp extends RLineProp {
  x: number
}

/**
 * Represents lines vertical.
 * @hierarchy RShape <- RLine <- RLineVertical
 */
class RLineVertical extends RLine {
  public static TYPEL2 = 'RLineVertical'
  protected declare __prop: RLineVerticalProp

  constructor(_: RShape[], prop: RLineVerticalProp, style?: RLineStyle) {
    super([], prop, style, RLineVertical.TYPEL2)
  }

  /**
   * Returns a vertical line.
   */
  preresolve() {
    return {
      coord1: new Coord(this.__prop.x, -LARGE_NUMBER),
      coord2: new Coord(this.__prop.x, LARGE_NUMBER),
      extend1: true,
      extend2: true,
    }
  }
}

export { RLineVerticalProp, RLineVertical }