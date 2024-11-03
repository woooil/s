import { Coord } from '../Coord'
import { ThetaTravel, ThetaMinimum } from '../Theta'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RArc.
 * @prop coord  - The coordinates of the center.
 * @prop r      - The radius.
 * @prop theta0 - The start direction in ThetaMinimum.
 * @prop theta  - The (directional) central angle in ThetaTravel. 
 */
interface RArcResolved extends RShapeResolved {
  coord: Coord
  r: number
  theta0: ThetaMinimum
  theta: ThetaTravel
}

/**
 * The properties of RArc.
 */
interface RArcProp extends RShapeProp {}

/**
 * The style of RArc.
 */
interface RArcStyle extends RShapeStyle {}

/**
 * Represents circular arcs.
 * @hierarchy RShape <- RArc
 */
abstract class RArc extends RShape {
  /**
   * 'RArc'
   */
  public static TYPEL1 = 'RArc'

  protected declare __prop: RArcProp

  constructor(dependencies: RShape[], prop: RArcProp, style: RArcStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RArc.TYPEL1, typel2])
  }

  /**
   * Resolves this RArc to RArcResolved.
   */
  public abstract resolve(): RArcResolved
}

export { RArcResolved, RArcProp, RArcStyle, RArc }