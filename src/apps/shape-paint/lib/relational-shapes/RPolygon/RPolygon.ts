import { Coord } from '../Coord'
import { RShape } from '../RShape'

/**
 * The resolved of RPolygon.
 * @prop coords - The coordinates of its vertices. 
 */
interface RPolygonResolved {
  coords: Coord[]
}

/**
 * Represents polygons.
 *
 * @example RPolygonResolved {
 *   coords: [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 30, y: 20 }];
 * }
 * represents a triangle whose vertices are (10, 10), (20, 20) and (30, 20).
 *
 * @hierarchy RShape <- RPolygon
 */
abstract class RPolygon extends RShape {
  public static RES_TYPE = 'RPolygon'

  constructor(dependencies: RShape[], prop: any, relType: string) {
    super(dependencies, prop, RPolygon.RES_TYPE, relType)
  }

  public abstract resolve(): RPolygonResolved
}

export { RPolygonResolved, RPolygon }