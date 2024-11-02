import { checkDependenciesInitError } from '../Error'
import { RLengthProp, RLength } from './RLength'
import { RPoint } from '../RPoint'

/**
 * The properties of RLengthTwoPointsProp.
 */
interface RLengthTwoPointsProp extends RLengthProp { }

/**
 * Represents length marker by its two endpoints.
 * @hierarchy RShape <- RLength<- RLengthTwoPoints
 */
class RLengthTwoPoints extends RLength {
  public static TYPEL2 = 'RLengthTwoPoints'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLengthTwoPointsProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Point type or its length is not 2.
   */
  constructor(dependencies: RPoint[], prop: RLengthTwoPointsProp) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1, RPoint.TYPEL1])
    super(dependencies, prop, RLengthTwoPoints.TYPEL2)
  }

  /**
   * Returns the coordinates of the endpoints.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      a: aResolved.coord,
      b: bResolved.coord,
      r: 0,
      ny: this.__prop.ny,
    }
  }
}

export { RLengthTwoPointsProp, RLengthTwoPoints }