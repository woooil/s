import { Coord } from '../Coord'
import { RPointProp, RPointStyle, RPoint } from './RPoint'
import { RShape } from '../RShape'

/**
 * The properties of RPointAbsoluteCoord. Defined by its absolute coordinates.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface RPointAbsoluteCoordProp extends RPointProp {
  x: number
  y: number
}

/**
 * Represents points as its absolute coordinates in the Cartesian coordinate system.
 * @hierarchy RShape <- RPoint <- RPointAbsoluteCoord
 */
class RPointAbsoluteCoord extends RPoint {
  public static TYPEL2 = 'RPointAbsoluteCoord'
  protected declare __dependencies: RShape[]
  protected declare __prop: RPointAbsoluteCoordProp

  constructor(_: RShape[], prop: RPointAbsoluteCoordProp, style?: RPointStyle) {
    super([], prop, style, RPointAbsoluteCoord.TYPEL2)
  }

  /**
   * Returns its coordinates without any modification.
   */
  resolve() {
    return {
      coord: new Coord(this.__prop.x, this.__prop.y),
    }
  }
}

export { RPointAbsoluteCoordProp, RPointAbsoluteCoord }
