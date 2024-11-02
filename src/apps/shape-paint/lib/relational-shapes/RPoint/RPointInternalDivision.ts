import { checkDependenciesInitError } from '../Error'
import { Coord } from '../Coord'
import { RPointProp, RPointStyle, RPoint } from './RPoint'

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
  constructor(dependencies: RPoint[], prop: RPointInternalDivisionProp, style?: RPointStyle) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1, RPoint.TYPEL1])
    super(dependencies, prop, style, RPointInternalDivision.TYPEL2)
  }

  /**
   * Calculates the internal division mathematically.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      coord: Coord.add(Coord.scale(aResolved.coord, 1 - this.__prop.r), Coord.scale(bResolved.coord, this.__prop.r)),
    }
  }
}

export { RPointInternalDivisionProp, RPointInternalDivision }
