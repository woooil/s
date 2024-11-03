import { Coord, CoordPolar } from '../Coord'
import { Theta, ThetaMinimum, ThetaTravel } from '../Theta'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RAngle } from '../RAngle'

/**
 * The properties of RLabelOnAngle.
 * @prop r   - The radial offset.
 */
interface RLabelOnAngleProp extends RLabelProp {
  r: number
}

/**
 * Represents labels on angles, typically representing their angles.
 * @hierarchy RShape <- RLabel <- RLabelOnAngle
 */
class RLabelOnAngle extends RLabel {
  public static TYPEL2 = 'RLabelOnAngle'
  protected declare __dependencies: [RAngle]
  protected declare __prop: RLabelOnAngleProp

  constructor(dependencies: [RAngle], prop: RLabelOnAngleProp, style?: RLabelStyle) {
    super(dependencies, prop, style, RLabelOnAngle.TYPEL2)
  }

  /**
   * Calculates the coordinates.
   */
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