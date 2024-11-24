import { SVGAttributes } from 'react'
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
abstract class RLabel extends RShape<SVGGElement> {
  public static RES_TYPE = 'RLabel'
  protected __COmponent = Component

  constructor(
    dependencies: RShape<any>[],
    prop: RLabelProp,
    style: SVGAttributes<SVGGElement>,
    relType: string,
  ) {
    super(dependencies, prop, style, RLabel.RES_TYPE, relType)
  }

  public abstract resolve(): RLabelResolved
}

export { RLabelResolved, RLabelProp, RLabel }
