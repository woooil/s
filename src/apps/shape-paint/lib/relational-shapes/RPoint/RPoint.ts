import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShape } from '../RShape'

/**
 * The mathematical definition of RPoint. Equal to Coord.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface RPointResolved extends RShapeResolved, Coord {}

/**
 * The properties of RPoint.
 */
interface RPointProp extends RShapeProp {}

/**
 * Represents points.
 * @hierarchy RShape <- RPoint
 */
abstract class RPoint extends RShape {
  /**
   * 'RPoint'.
   */
  public static TYPE = 'RPoint'

  constructor(dependencies: RShape[], prop: RPointProp) {
    super(dependencies, prop, RPoint.TYPE)
  }

  /**
   * Resolves this RPoint into PointResolved.
   */
  public abstract resolve(): RPointResolved
}

export { RPointResolved, RPointProp, RPoint }
