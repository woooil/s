import { checkDependenciesInitError } from '../Error'
import { Coords } from '../Tools'
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
    const theta = Coords.theta2(resolved.a, resolved.b)
    const coord = Coords.addPolar(Coords.avg(resolved.a, resolved.b), {
      r: resolved.ny ? resolved.r : -resolved.r,
      theta: theta - Math.PI / 2
    })
    return {
      ...coord,
      label: this.__prop.label
    }
  }
}

export { RLabelOnLengthProp, RLabelOnLength }