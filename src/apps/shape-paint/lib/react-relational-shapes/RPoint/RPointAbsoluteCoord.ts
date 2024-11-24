import { SVGAttributes } from 'react'
import { Coord } from '../Coord'
import { RPoint, RPointResolvedProp } from './RPoint'

/**
 * The properties of RPointAbsoluteCoord. This extends RPointResolvedProp.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 * @extends RPointResolvedProp
 */
interface RPointAbsoluteCoordProp extends RPointResolvedProp {
  x: number
  y: number
}

/**
 * Represents points as its absolute coordinates in the Cartesian coordinate system.
 *
 * @example RPointAbsoluteCoord {
 *   prop: { x: 10, y: 10 };
 * }
 * represents a point at (10, 10).
 *
 * @hierarchy RShape <- RPoint <- RPointAbsoluteCoord
 */
class RPointAbsoluteCoord extends RPoint {
  public static REL_TYPE = 'RPointAbsoluteCoord'
  protected declare __prop: RPointAbsoluteCoordProp

  constructor(
    _: any,
    prop: RPointAbsoluteCoordProp,
    style?: SVGAttributes<SVGCircleElement>,
  ) {
    super([], prop, style, RPointAbsoluteCoord.REL_TYPE)
  }

  public resolve() {
    return {
      ...this.__prop,
      coord: new Coord(this.__prop.x, this.__prop.y),
    }
  }

  public move(coord: Coord) {
    this.__prop.x = coord.x
    this.__prop.y = coord.y
  }
}

export { RPointAbsoluteCoordProp, RPointAbsoluteCoord }
