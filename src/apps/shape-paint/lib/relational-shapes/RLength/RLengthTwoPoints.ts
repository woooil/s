import { DependeciesInitError } from '../Error'
import { RPoint } from '../RPoint'
import { RLengthProp, RLength } from './RLength'

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
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLengthTwoPoints.TYPEL2)
  }

  /**
   * Returns the coordinates of the endpoints.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      r: 0,
      ny: this.__prop.ny,
    }
  }
}

export { RLengthTwoPointsProp, RLengthTwoPoints }