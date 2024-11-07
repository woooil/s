import { RLineProp, RLineStyle, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineTwoPointsProp.
 * @prop extend1  - The extension of the first Coord.
 * @prop extend2  - The extension of the second Coord.
 */
interface RLineTwoPointsProp extends RLineProp {
  extend1?: boolean
  extend2?: boolean
}

/**
 * Represents lines as two points it passes through.
 * @hierarchy RShape <- RLine <- RLineTwoPoints
 */
class RLineTwoPoints extends RLine {
  public static TYPEL2 = 'RLineTwoPoints'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RLineTwoPointsProp

  constructor(dependencies: [RPoint, RPoint], prop: RLineTwoPointsProp, style?: RLineStyle) {
    super(dependencies, prop, style, RLineTwoPoints.TYPEL2)
  }

  /**
   * Returns RLineResolved passing through two points.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      coord1: aResolved.coord,
      coord2: bResolved.coord,
      extend1: !!(this.__prop.extend1),
      extend2: !!(this.__prop.extend2),
    }
  }
}

export { RLineTwoPointsProp, RLineTwoPoints }
