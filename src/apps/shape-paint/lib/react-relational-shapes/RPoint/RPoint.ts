import { Coord } from '../Coord'
import { RShape } from '../RShape'
import Component from './Point'

/**
 * The resolved properties of RPoint.
 * @prop hide - Makes this RPoint invisible if true.
 */
interface RPointResolvedProp {
  hide?: boolean
}

/**
 * The resolved of RPoint. 
 * @prop coord - The coordinates.
 * @extends RPointResolvedProp
 */
interface RPointResolved extends RPointResolvedProp {
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

  public component = () => {
    return Component({ resolved: this.resolve(), key: this.id })
  }

  public abstract resolve(): RPointResolved
}

export { RPointResolvedProp, RPointResolved, RPoint }
