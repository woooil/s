import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RPoint. 
 * @prop coord  - The coordinates.
 * @prop hide   - True if this RPoint is invisible.
 */
interface RPointResolved extends RShapeResolved {
  coord: Coord
}

/**
 * The properties of RPoint.
 */
interface RPointProp extends RShapeProp { }

interface RPointStyle extends RShapeStyle {
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

  constructor(dependencies: RShape[], prop: RPointProp, style: RPointStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RPoint.TYPEL1, typel2])
  }

  /**
   * Resolves this RPoint into PointResolved.
   */
  public abstract resolve(): RPointResolved
}

export { RPointResolved, RPointProp, RPointStyle, RPoint }
