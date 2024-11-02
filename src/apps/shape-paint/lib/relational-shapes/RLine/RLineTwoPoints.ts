import { checkDependenciesInitError } from '../Error'
import { RLineProp, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineTwoPointsProp.
 * @prop extendA  - The extension of the first Coord.
 * @prop extendB  - The extension of the second Coord.
 */
interface RLineTwoPointsProp extends RLineProp {
  extendA?: boolean
  extendB?: boolean
}

/**
 * Represents lines as two points it passes through.
 * @hierarchy RShape <- RLine <- RLineTwoPoints
 */
class RLineTwoPoints extends RLine {
  public static TYPEL2 = 'RLineTwoPoints'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLineTwoPointsProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RPoint type or its length is not 2.
   */
  constructor(dependencies: RPoint[], prop: RLineTwoPointsProp) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1, RPoint.TYPEL1])
    super(dependencies, prop, RLineTwoPoints.TYPEL2)
  }

  /**
   * Returns RLineResolved passing through two points.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      a: aResolved.coord,
      b: bResolved.coord,
      extendA: this.__prop.extendA || false,
      extendB: this.__prop.extendB || false,
    }
  }
}

export { RLineTwoPointsProp, RLineTwoPoints }
