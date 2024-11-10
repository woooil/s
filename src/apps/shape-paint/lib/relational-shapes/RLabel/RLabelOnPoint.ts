import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RPoint } from '../RPoint'

/**
 * The properties of RLabelOnPointProp which extends RLabelProp.
 * @prop offset - The polar coordinate relative to the depended RPoint.
 */
interface RLabelOnPointProp extends RLabelProp {
  offset: CoordPolar
}

/**
 * Represents labels on points, typically representing their name.
 *
 * @example RLabelOnPoint {
 *   dependencies: [RPoint1];
 *   prop: { label: 'A', offset: { r: 10, theta: { t: 0 } } };
 * }
 * represents a label written 'A' 10 units away in the direction of 0 rad.
 *
 * @hierarchy RShape <- RLabel <- RLabelOnPoint
 */
class RLabelOnPoint extends RLabel {
  public static REL_TYPE = 'RLabelOnPoint'
  protected declare __dependencies: [RPoint]
  protected declare __prop: RLabelOnPointProp

  constructor(dependencies: [RPoint], prop: RLabelOnPointProp) {
    super(dependencies, prop, RLabelOnPoint.REL_TYPE)
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

export { RLabelOnPointProp, RLabelOnPoint }
