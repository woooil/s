import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RAngle } from '../RAngle'

/**
 * The properties of RLabelOnAngle which extends RLabelProp.
 * @prop r - The radial offset.
 */
interface RLabelOnAngleProp extends RLabelProp {
  r: number
}

/**
 * Represents labels on angles, typically representing their angles.
 *
 * @example RLabelOnAngle {
 *   dependencies: [RAngle1];
 *   prop: { label: 'x', r: 10 };
 * }
 * represents a label written 'x' 10 units away from RAngle1.
 *
 * @hierarchy RShape <- RLabel <- RLabelOnAngle
 */
class RLabelOnAngle extends RLabel {
  public static REL_TYPE = 'RLabelOnAngle'
  protected declare __dependencies: [RAngle]
  protected declare __prop: RLabelOnAngleProp

  constructor(dependencies: [RAngle], prop: RLabelOnAngleProp) {
    super(dependencies, prop, RLabelOnAngle.REL_TYPE)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = resolved.theta0.add(resolved.theta.half())
    const coord = resolved.coord.addPolar(new CoordPolar(28 + (this.__prop.r || 0), theta))

    return {
      coord: coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite
    }
  }
}

export { RLabelOnAngleProp, RLabelOnAngle }