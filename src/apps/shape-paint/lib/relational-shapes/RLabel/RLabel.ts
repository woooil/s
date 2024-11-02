import { Coord, CoordPolar } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The definition of RLabel.
 * @prop coord    - The coordinates where this RLabel should be.
 * @prop label    - The label string to be displayed.
 * @prop offsite  - The offset off-site from coord if exists.
 */
interface RLabelResolved extends RShapeResolved {
  coord: Coord
  label: string
  offsite?: CoordPolar
}

/**
 * The properties of RLabel.
 * @prop label    - The label string to be displayed.
 * @prop offsite  - The offset off-site from coord if exists.
 */
interface RLabelProp extends RShapeProp {
  label: string
  offsite?: CoordPolar
}

/**
 * The style of RLabel.
 * @prop italic - Uses italic font if true.
 */
interface RLabelStyle extends RShapeStyle {
  italic?: boolean
}

/**
 * Represents text labels, fixed (usually to another RShape) to represent a specific meaning.
 * @hierarchy RShape <- RLabel
 */
abstract class RLabel extends RShape {
  /**
   * 'RLabel'.
   */
  public static TYPEL1 = 'RLabel'

  constructor(dependencies: RShape[], prop: RLabelProp, style: RLabelStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RLabel.TYPEL1, typel2])
  }

  /**
   * Resolves this RLabel to RLabelResolved.
   */
  public abstract resolve(): RLabelResolved
}

export { RLabelResolved, RLabelProp, RLabelStyle, RLabel }
