import { DependeciesInitError } from '../Error'
import { RPointProp, RPoint } from './RPoint'

/**
 * The properties of RPointInternalDivison.
 * @prop r - The division ratio.
 */
interface RPointInternalDivisionProp extends RPointProp {
  r: number
}

/**
 * Represents points as internal divisions of two points.
 * @hierarchy RShape <- RPoint <- RPointInternalDivision
 */
class RPointInternalDivision extends RPoint {
  public static TYPEL2 = 'RPointInternalDivision'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RPointInternalDivisionProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Point type or its length is not 2.
   */
  constructor(dependencies: RPoint[], prop: RPointInternalDivisionProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RPointInternalDivision.TYPEL2)
  }

  /**
   * Calculates the internal division mathematically.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      x: aResolved.x * (1 - this.__prop.r) + bResolved.x * this.__prop.r,
      y: aResolved.y * (1 - this.__prop.r) + bResolved.y * this.__prop.r,
      hide: this.__prop.hide,
    }
  }
}

export { RPointInternalDivisionProp, RPointInternalDivision }
