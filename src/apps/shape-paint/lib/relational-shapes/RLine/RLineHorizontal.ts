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
      a: new Coord(0, this.__prop.y),
      b: new Coord(1, this.__prop.y),
      extendA: true,
      extendB: true,
    }
  }
}

export { RLineHorizontalProp, RLineHorizontal }