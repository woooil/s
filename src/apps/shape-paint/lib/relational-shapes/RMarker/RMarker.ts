import { Coord } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RMarker.
 * @prop coord  - The coordinates.
 * @prop theta  - The direction.
 * @prop marker - The marker.
 */
interface RMarkerResolved extends RShapeResolved {
  coord: Coord
  theta: ThetaMinimum
  marker?: string
}

/**
 * The properties of RMarker.
 * @prop marker - The marker.
 */
interface RMarkerProp extends RShapeProp {
  marker?: string
}

/**
 * The style of RMarker.
 */
interface RMarkerStyle extends RShapeStyle {}

/**
 * Represents any markers at a specific position.
 * @hierarchy RShape <- RMarker
 */
abstract class RMarker extends RShape {
  /**
   * 'RMarker'.
   */
  public static TYPEL1 = 'RMarker'

  constructor(dependencies: RShape[], prop: RMarkerProp, style: RMarkerStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RMarker.TYPEL1, typel2])
  }

  /**
   * Resolves this RMarker into RMarkerResolved.
   */
  public abstract resolve(): RMarkerResolved
}

export { RMarkerResolved, RMarkerProp, RMarkerStyle, RMarker }