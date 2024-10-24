import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, Shape } from '../Shape'

/**
 * The definition of Line.
 * @prop x      - The x coordinate where this Label should be.
 * @prop y      - The y coordinate where this Label should be.
 * @prop label  - The label string to be displayed.
 */
interface LabelResolved extends ShapeResolved, Coord {
  label: string
}

/**
 * The properties of Label.
 * @prop label  - The label string to be displayed.
 */
interface LabelProp extends ShapeProp {
  label: string
}

/**
 * Represents text labels, fixed (usually to another Shape) to represent a specific meaning.
 * @hierarchy Shape <- Label
 */
abstract class Label extends Shape {
  /**
   * 'Label'.
   */
  public static TYPE = 'Label'

  constructor(dependencies: Shape[], prop: LabelProp) {
    super(dependencies, prop, Label.TYPE)
  }

  /**
   * Resolves this Label to LabelResolved.
   */
  public abstract resolve(): LabelResolved
}

export { LabelResolved, LabelProp, Label }
