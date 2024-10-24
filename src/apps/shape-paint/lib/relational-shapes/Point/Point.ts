import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, Shape } from '../Shape'

/**
 * The mathematical definition of Point. Equal to Coord.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface PointResolved extends ShapeResolved, Coord {}

/**
 * The properties of Point.
 */
interface PointProp extends ShapeProp {}

/**
 * Represents points.
 * @hierarchy Shape <- Point
 */
abstract class Point extends Shape {
  /**
   * 'Point'.
   */
  public static TYPE = 'Point'

  constructor(dependencies: Shape[], prop: PointProp) {
    super(dependencies, prop, Point.TYPE)
  }

  /**
   * Resolves this Point into PointResolved.
   */
  public abstract resolve(): PointResolved
}

export { PointResolved, PointProp, Point }
