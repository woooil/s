import { Coord } from '../Coord'
import { ThetaTravel, ThetaMinimum } from '../Theta'
import { RShapeRelType, RShape } from '../RShape'

/**
 * The resolved of RArc.
 * @prop coord  - The Coord of the center.
 * @prop r      - The radius.
 * @prop theta0 - The start orientation in ThetaMinimum.
 * @prop theta  - The (directional) central angle in ThetaTravel. 
 */
interface RArcResolved {
  coord: Coord
  r: number
  theta0: ThetaMinimum
  theta: ThetaTravel
}

/**
 * Represents circular arcs.
 *
 * @example RArcResolved {
 *   coord: { x: 40, y: 40 };
 *   r: 10;
 *   theta0: { t: Math.PI / 2 };
 *   theta: { t: Math.PI };
 * }
 * represents a half circle which is centered at (40, 40), starts at (40, 30) and rotates PI rad with radius of 10.
 *
 * @hierarchy RShape <- RArc
 */
abstract class RArc extends RShape {
  public static RES_TYPE = 'RArc'

  constructor(dependencies: RShape[], _: any, relType: RShapeRelType) {
    super(dependencies, {}, RArc.RES_TYPE, relType)
  }

  public abstract resolve(): RArcResolved
}

export { RArcResolved, RArc }