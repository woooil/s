import { PointProp, Point } from '../Point'

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
  constructor(prop: PointAbsoluteCoordProp) {
    super([], prop)
  }

  /**
   * Returns its coordinates without any modification.
   */
  resolve() {
    return {
      x: this.prop.x,
      y: this.prop.y
    }
  }
}

export { PointAbsoluteCoordProp, PointAbsoluteCoord }