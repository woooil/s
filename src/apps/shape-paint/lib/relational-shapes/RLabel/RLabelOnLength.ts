import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RLength } from '../RLength'

/**
 * The properties of RLableOnLength.
 */
interface RLabelOnLengthProp extends RLabelProp {}

/**
 * Represents labels on length markers, typically representing their length.
 * @hierarchy RShape <- RLabel <- RLabelOnLength
 */
class RLabelOnLength extends RLabel {
  public static TYPEL2 = 'RLabelOnLength'
  protected declare __dependencies: [RLength]
  protected declare __prop: RLabelOnLengthProp

  constructor(dependencies: [RLength], prop: RLabelOnLengthProp, style?: RLabelStyle) {
    super(dependencies, prop, style, RLabelOnLength.TYPEL2)
  }

  /**
   * Calculates the midpoint of RLength and give some offsets.
   */
  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Theta.fromCoord(resolved.a, resolved.b)
    const coord = Coord.addPolar(Coord.avg(resolved.a, resolved.b), new CoordPolar(
      resolved.r,
      Theta.add(theta, resolved.reverse ? Theta.ny() : Theta.py())
    ))
    return {
      coord: coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite
    }
  }
}

export { RLabelOnLengthProp, RLabelOnLength }