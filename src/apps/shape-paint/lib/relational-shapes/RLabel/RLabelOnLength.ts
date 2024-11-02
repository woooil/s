import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabel } from './RLabel'
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
  protected declare __dependencies: RLength[]
  protected declare __prop: RLabelOnLengthProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLength type or its length is not 1.
   */
  constructor(dependencies: RLength[], prop: RLabelOnLengthProp) {
    checkDependenciesInitError(dependencies, [RLength.TYPEL1])
    super(dependencies, prop, RLabelOnLength.TYPEL2)
  }

  /**
   * Calculates the midpoint of RLength and give some offsets.
   */
  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Theta.fromCoord(resolved.a, resolved.b)
    const coord = Coord.addPolar(Coord.avg(resolved.a, resolved.b), new CoordPolar(
      resolved.ny ? resolved.r : -resolved.r,
      new Theta(theta.t - Math.PI / 2)
    ))
    return {
      coord: coord,
      label: this.__prop.label
    }
  }
}

export { RLabelOnLengthProp, RLabelOnLength }