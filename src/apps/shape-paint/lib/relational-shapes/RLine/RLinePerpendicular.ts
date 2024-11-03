import { CoordPolar } from '../Coord'
import { Theta, ThetaMinimum } from '../Theta'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLinePerpendicular.
 * @prop extendA  - Extends RPoint if true.
 * @prop reverse  - Uses -y direction when RLine is rotated to be aligned to +x direction if true. Uses +y direction if false.
 */
interface RLinePerpendicularProp extends RLineProp {
  extendA?: boolean
  reverse?: boolean
}


/**
 * Represents lines which is perpendicular to another line and passes through a point.
 * @hierarchy RShape <- RLine <- RLinePerpendicular
 */
class RLinePerpendicular extends RLine {
  public static TYPEL2 = 'RLinePerpendicular'
  protected declare __dependencies: [RPoint, RLine]
  protected declare __prop: RLinePerpendicularProp

  constructor(dependencies: [RPoint, RLine], prop: RLinePerpendicularProp, style?: RLineStyle) {
    super(dependencies, prop, style, RLinePerpendicular.TYPEL2)
  }

  /**
   * Returns a perpendicular line passing through a given point.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const lResolved = this.__dependencies[1].resolve()
    const theta = this.__prop.reverse ? Theta.fromCoord(lResolved.b, lResolved.a) : Theta.fromCoord(lResolved.a, lResolved.b)
    const phi = theta.add(Theta.py())
    const b = aResolved.coord.addPolar(new CoordPolar(10, phi))

    return {
      a: aResolved.coord,
      b: b,
      extendA: this.__prop.extendA || false,
      extendB: true,
    }
  }
}

export { RLinePerpendicularProp, RLinePerpendicular }