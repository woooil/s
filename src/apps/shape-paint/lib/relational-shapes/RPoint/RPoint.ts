import { Coord } from '../Tools'
import { RShapeResolved, RShapeProp, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RPoint. Equal to Coord.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface RPointResolved extends RShapeResolved, Coord {
  hide?: boolean
}

/**
 * The properties of RPoint.
 */
interface RPointProp extends RShapeProp {
  hide?: boolean
}

/**
 * Represents points.
 * @hierarchy RShape <- RPoint
 */
abstract class RPoint extends RShape {
  /**
   * 'RPoint'.
   */
  public static TYPEL1 = 'RPoint'

  constructor(dependencies: RShape[], prop: RPointProp, typel2: RShapeTypeL2) {
    super(dependencies, prop, [RPoint.TYPEL1, typel2])
  }

  /**
   * Resolves this RPoint into PointResolved.
   */
  public abstract resolve(): RPointResolved
}

export { RPointResolved, RPointProp, RPoint }
