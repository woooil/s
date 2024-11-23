import { SVGAttributes } from 'react'
import { CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabel } from './RLabel'
import { RLength } from '../RLength'

/**
 * The properties of RLableLength which extends RLabelProp.
 */
interface RLabelLengthProp extends RLabelProp {}

/**
 * Represents labels on length markers.
 *
 * @example RLabelLength {
 *   dependencies: [RLength1];
 *   prop: { label: '10 cm' };
 * }
 * represents a label written '10 cm' at the middle of RLength1.
 *
 *
 * @hierarchy RShape <- RLabel <- RLabelLength
 */
class RLabelLength extends RLabel {
  public static REL_TYPE = 'RLabelLength'
  protected declare __dependencies: [RLength]
  protected declare __prop: RLabelLengthProp

  constructor(
    dependencies: [RLength],
    prop: RLabelLengthProp,
    style?: SVGAttributes<SVGGElement>,
  ) {
    super(dependencies, prop, style, RLabelLength.REL_TYPE)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Theta.fromCoord(resolved.coord1, resolved.coord2)
    const coord = resolved.coord1
      .avg(resolved.coord2)
      .addPolar(new CoordPolar(resolved.curvature, theta.add(Theta.py())))
    return {
      coord: coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite,
    }
  }
}

export { RLabelLengthProp, RLabelLength }
