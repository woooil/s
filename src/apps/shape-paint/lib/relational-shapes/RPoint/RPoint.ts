import { Coord } from '../Coord'
import { RShape } from '../RShape'

/**
 * The resolved of RPoint. 
 * @prop coord - The coordinates.
 */
interface RPointResolved {
  coord: Coord
}

/**
 * Represents points.
 *
 * @example RPointResolved {
 *   coord: { x: 10, y: 10 }
 * }
 * represents a point at (10, 10).
 *
 * @hierarchy RShape <- RPoint
 */
abstract class RPoint extends RShape {
  public static RES_TYPE = 'RPoint'

  constructor(dependencies: RShape[], prop: any, relType: string) {
    super(dependencies, prop, RPoint.RES_TYPE, relType)
  }

  public abstract resolve(): RPointResolved
}

export { RPointResolved, RPoint }
