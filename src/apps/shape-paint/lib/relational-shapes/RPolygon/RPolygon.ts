import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RPolygon. Defined by its vertices.
 * @prop coords - The coordinates of its vertices. 
 */
interface RPolygonResolved extends RShapeResolved {
  coords: Coord[]
}

/**
 * The properties of RPolygon.
 */
interface RPolygonProp extends RShapeProp {}

/**
 * The style of RPolygon.
 * @prop width  - The width.
 */
interface RPolygonStyle extends RShapeStyle {
  width?: number
}

/**
 * Represents polygons.
 * @hierarchy RShape <- RPolygon
 */
abstract class RPolygon extends RShape {
  /**
   * 'RPolygon'.
   */
  public static TYPEL1 = 'RPolygon'

  constructor(dependencies: RShape[], prop: RPolygonProp, style: RPolygonStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RPolygon.TYPEL1, typel2])
  }

  /**
   * Resolves this RPolygon into RPolygonResolved.
   */
  public abstract resolve(): RPolygonResolved
}

export { RPolygonResolved, RPolygonProp, RPolygonStyle, RPolygon }