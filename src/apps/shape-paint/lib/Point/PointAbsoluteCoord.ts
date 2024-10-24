import { PointProp, Point } from '../Point'
import { Shape } from '../Shape'

/**
 * The properties of PointAbsoluteCoord. Defined by its absolute coordinates.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface PointAbsoluteCoordProp extends PointProp {
  x: number
  y: number
}

/**
 * Represents points as its absolute coordinates in the Cartesian coordinate system.
 * @hierarchy Shape <- Point <- PointAbsoluteCoord
 */
class PointAbsoluteCoord extends Point {
  protected declare __dependencies: Shape[]
  protected declare __prop: PointAbsoluteCoordProp

  constructor(_: Shape[], prop: PointAbsoluteCoordProp) {
    super([], prop)
  }

  /**
   * Returns its coordinates without any modification.
   */
  resolve() {
    return {
      x: this.__prop.x,
      y: this.__prop.y,
    }
  }
}

export { PointAbsoluteCoordProp, PointAbsoluteCoord }
