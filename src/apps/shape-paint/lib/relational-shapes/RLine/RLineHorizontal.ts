import { LARGE_NUMBER } from '../tools'
import { Coord } from '../Coord'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RShape } from '../RShape'

/**
 * The properties of RLineHorizontal.
 * @prop y  - The y coordinate.
 */
interface RLineHorizontalProp extends RLineProp {
  y: number
}

/**
 * Represents lines horizontal.
 * @hierarchy RShape <- RLine <- RLineHorizontal
 */
class RLineHorizontal extends RLine {
  public static TYPEL2 = 'RLineHorizontal'
  protected declare __prop: RLineHorizontalProp

  constructor(_: RShape[], prop: RLineHorizontalProp, style?: RLineStyle) {
    super([], prop, style, RLineHorizontal.TYPEL2)
  }

  /**
   * Returns a horizontal line.
   */
  preresolve() {
    return {
      coord1: new Coord(-LARGE_NUMBER, this.__prop.y),
      coord2: new Coord(LARGE_NUMBER, this.__prop.y),
      extend1: true,
      extend2: true,
    }
  }
}

export { RLineHorizontalProp, RLineHorizontal }