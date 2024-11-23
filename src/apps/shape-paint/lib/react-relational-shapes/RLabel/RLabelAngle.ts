import { SVGAttributes } from 'react'
import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RAngle } from '../RAngle'

/**
 * The properties of RLabelAngle which extends RLabelProp.
 * @prop r - The radial offset.
 */
interface RLabelAngleProp extends RLabelProp {
  r: number
}

/**
 * Represents labels on angles, typically representing their angles.
 *
 * @example RLabelAngle {
 *   dependencies: [RAngle1];
 *   prop: { label: 'x', r: 10 };
 * }
 * represents a label written 'x' 10 units away from RAngle1.
 *
 * @hierarchy RShape <- RLabel <- RLabelAngle
 */
class RLabelAngle extends RLabel {
  public static REL_TYPE = 'RLabelAngle'
  protected declare __dependencies: [RAngle]
  protected declare __prop: RLabelAngleProp

  constructor(
    dependencies: [RAngle],
    prop: RLabelAngleProp,
    style?: SVGAttributes<SVGGElement>,
  ) {
    super(dependencies, prop, style, RLabelAngle.REL_TYPE)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = resolved.theta0.add(resolved.theta.half())
    const coord = resolved.coord.addPolar(
      new CoordPolar(28 + (this.__prop.r || 0), theta),
    )

    return {
      coord: coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite,
    }
  }
}

export { RLabelAngleProp, RLabelAngle }
