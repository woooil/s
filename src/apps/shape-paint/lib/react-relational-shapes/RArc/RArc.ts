import { SVGAttributes } from 'react'
import { Coord } from '../Coord'
import { ThetaTravel, ThetaMinimum } from '../Theta'
import { RShape } from '../RShape'
import Component from './Arc'

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
abstract class RArc extends RShape<SVGPathElement> {
  public static RES_TYPE = 'RArc'
  protected __Component = Component

  constructor(
    dependencies: RShape<any>[],
    _: any,
    style: SVGAttributes<SVGPathElement>,
    relType: string,
  ) {
    super(dependencies, {}, style, RArc.RES_TYPE, relType)
  }

  public abstract resolve(): RArcResolved
}

export { RArcResolved, RArc }
