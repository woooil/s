import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShape } from '../RShape'

/**
 * The definition of RLabel.
 * @prop x      - The x coordinate where this RLabel should be.
 * @prop y      - The y coordinate where this RLabel should be.
 * @prop label  - The label string to be displayed.
 */
interface RLabelResolved extends RShapeResolved, Coord {
  label: string
}

/**
 * The properties of RLabel.
 * @prop label  - The label string to be displayed.
 */
interface RLabelProp extends RShapeProp {
  label: string
}

/**
 * Represents text labels, fixed (usually to another RShape) to represent a specific meaning.
 * @hierarchy RShape <- RLabel
 */
abstract class RLabel extends RShape {
  /**
   * 'RLabel'.
   */
  public static TYPE = 'RLabel'

  constructor(dependencies: RShape[], prop: RLabelProp) {
    super(dependencies, prop, RLabel.TYPE)
  }

  /**
   * Resolves this RLabel to RLabelResolved.
   */
  public abstract resolve(): RLabelResolved
}

export { RLabelResolved, RLabelProp, RLabel }
