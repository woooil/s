import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RPoint. 
 * @prop coord  - The coordinates.
 * @prop hide   - True if this RPoint is invisible.
 */
interface RPointResolved extends RShapeResolved {
  coord: Coord
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
