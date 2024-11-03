import { RLineProp, RLineStyle, RLine } from './RLine'
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
      a: aResolved.coord,
      b: bResolved.coord,
      extendA: this.__prop.extendA || false,
      extendB: this.__prop.extendB || false,
    }
  }
}

export { RLineTwoPointsProp, RLineTwoPoints }
