import { SVGAttributes } from 'react'
import { RPolygon } from './RPolygon'
import { RPoint } from '../RPoint'

/**
 * Represents polygons by its vertex RPoints.
 *
 * @example RPolygonPoints {
 *   dependencies: [RPoint1, RPoint2, RPoint3];
 * }
 * represents a triangle whose vertices are RPoint1, RPoint2 and RPoint3.
 *
 * @hierarchy RShape <- RPolygon <- RPolygonPoints
 */
class RPolygonPoints extends RPolygon {
  public static REL_TYPE = 'RPolygonPoints'
  protected declare __dependencies: RPoint[]

  constructor(
    dependencies: RPoint[],
    _: any,
    style?: SVGAttributes<SVGPolygonElement>,
  ) {
    super(dependencies, {}, style, RPolygonPoints.REL_TYPE)
  }

  public resolve() {
    const coords = this.__dependencies.map(i => i.resolve().coord)
    return {
      coords,
    }
  }
}

export { RPolygonPoints }
