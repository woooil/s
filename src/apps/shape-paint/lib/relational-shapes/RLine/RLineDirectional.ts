import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RPoint } from '../RPoint'
import { RDistanceExtraProp } from '../RShape'

/**
 * The properties of RLineDirectional.
 * @prop extend1  - Extends backwards if true.
 * @prop theta - The direction.
 */
interface RLineDirectionalProp extends RLineProp, RDistanceExtraProp {
  extend1?: boolean
  theta: ThetaMinimum
}

/**
 * Represents lines directional.
 * @hierarchy RShape <- RLine <- RLineDirectional
 */
class RLineDirectional extends RLine {
  public static TYPEL2 = 'RLineDirectional'
  protected declare __dependencies: [RPoint]
  protected declare __prop: RLineDirectionalProp

  constructor(dependencies: [RPoint], prop: RLineDirectionalProp, style?: RLineStyle) {
    super(dependencies, prop, style, RLineDirectional.TYPEL2)
  }

  /**
   * Returns a directional line.
   */
  preresolve() {
    const resolved = this.__dependencies[0].resolve()
    const coord2 = resolved.coord.addPolar(new CoordPolar(this.__prop.distance || LARGE_NUMBER, this.__prop.theta))
    return {
      coord1: resolved.coord,
      coord2,
      extend1: !!(this.__prop.extend1),
      extend2: !(this.__prop.distance),
    }
  }
}

export { RLineDirectionalProp, RLineDirectional }