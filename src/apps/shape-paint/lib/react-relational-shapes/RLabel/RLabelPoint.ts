import { SVGAttributes } from 'react'
import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RPoint } from '../RPoint'

/**
 * The properties of RLabelPointProp which extends RLabelProp.
 * @prop offset - The polar coordinate relative to the depended RPoint.
 */
interface RLabelPointProp extends RLabelProp {
  offset: CoordPolar
}

/**
 * Represents labels on points, typically representing their name.
 *
 * @example RLabelPoint {
 *   dependencies: [RPoint1];
 *   prop: { label: 'A', offset: { r: 10, theta: { t: 0 } } };
 * }
 * represents a label written 'A' 10 units away in the direction of 0 rad.
 *
 * @hierarchy RShape <- RLabel <- RLabelPoint
 */
class RLabelPoint extends RLabel {
  public static REL_TYPE = 'RLabelPoint'
  protected declare __dependencies: [RPoint]
  protected declare __prop: RLabelPointProp

  constructor(
    dependencies: [RPoint],
    prop: RLabelPointProp,
    style?: SVGAttributes<SVGGElement>,
  ) {
    super(dependencies, prop, style, RLabelPoint.REL_TYPE)
  }

  resolve() {
    const aResolved = this.__dependencies[0].resolve()

    return {
      coord: aResolved.coord.addPolar(this.__prop.offset),
      label: this.__prop.label,
      offsite: this.__prop.offsite,
    }
  }
}

export { RLabelPointProp, RLabelPoint }
