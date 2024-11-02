import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineDirectional.
 * @prop theta - The direction.
 */
interface RLineDirectionalProp extends RLineProp {
  theta: ThetaMinimum
}

/**
 * Represents lines directional.
 * @hierarchy RShape <- RLine <- RLineDirectional
 */
class RLineDirectional extends RLine {
  public static TYPEL2 = 'RLineDirectional'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLineDirectionalProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RPoint type or its length is not 1.
   */
  constructor(dependencies: RPoint[], prop: RLineDirectionalProp, style?: RLineStyle) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1])
    super(dependencies, prop, style, RLineDirectional.TYPEL2)
  }

  /**
   * Returns a directional line.
   */
  preresolve() {
    const resolved = this.__dependencies[0].resolve()
    return {
      a: resolved.coord,
      b: Coord.addPolar(resolved.coord, new CoordPolar(1, this.__prop.theta)),
      extendA: true,
      extendB: true,
    }
  }
}

export { RLineDirectionalProp, RLineDirectional }