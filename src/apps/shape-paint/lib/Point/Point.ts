import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, ShapeDependenciesIndex, Shape } from '../Shape'

/**
 * The mathematical definition of Point. Equal to Coord.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface PointResolved extends ShapeResolved, Coord { }

/**
 * The properties of Point.
 */
interface PointProp extends ShapeProp { }

/**
 * Represents points.
 * @hierarchy Shape <- Point
 */
abstract class Point extends Shape {
  /**
   * Uses 'Point' as ShapeType and 'circle' as svgTag.
   */
  constructor(dependencies: Shape[], prop: PointProp) {
    super(dependencies, prop, 'Point', 'circle')
  }

  /**
   * Sets radius of the circle to be 3, fills it with black.
   */
  public get svgAttr() {
    const resolved = this.resolve()

    return {
      cx: resolved.x,
      cy: resolved.y,
      r: 3,
      fill: 'black',
    }
  }

  /**
   * Resolves Point into PointResolved.
   */
  public abstract resolve(): PointResolved
}

export { PointResolved, PointProp, Point }