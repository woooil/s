import { Coord, CoordPolar } from '../Coord'
import { RShape } from '../RShape'
import Component from './Label'

/**
 * The resolved of RLabel.
 * @prop coord    - The Coord where this RLabel should be.
 * @prop label    - The text to be displayed.
 * @prop offsite  - The offset off-site from coord, if provided.
 */
interface RLabelResolved {
  coord: Coord
  label: string
  offsite?: CoordPolar
}

/**
 * The properties of RLabel.
 * @prop label    - The text to be displayed.
 * @prop offsite  - The offset off-site from coord, if exists.
 */
interface RLabelProp {
  label: string
  offsite?: CoordPolar
}

/**
 * Represents text labels, (usually fixed to another RShape) to represent a specific meaning.
 *
 * @example RLabelResolved {
 *   coord: { x: 10, y: 20 };
 *   label: 'A';
 * }
 * represents a label written 'A' fixed at (10, 10).
 *
 * @hierarchy RShape <- RLabel
 */
abstract class RLabel extends RShape {
  public static RES_TYPE = 'RLabel'

  constructor(dependencies: RShape[], prop: RLabelProp, relType: string) {
    super(dependencies, prop, RLabel.RES_TYPE, relType)
  }

  public component = () => {
    return Component({ resolved: this.resolve(), key: this.id })
  }

  public abstract resolve(): RLabelResolved
}

export { RLabelResolved, RLabelProp, RLabel }
