import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RDistanceExtraProp } from '../RShape'

/**
 * The properties of RLineAngleBisectorProp. 
 * @prop reverseL - True if reverse the direction of the first RLine.
 * @prop reverseM - True if reverse the direction of the second RLine.
 */
interface RLineAngleBisectorProp extends RLineProp, RDistanceExtraProp {
  reverseL?: boolean,
  reverseM?: boolean,
}

/**
 * Represents lines as angle bisectors of two lines.
 * @hierarchy RShape <- RLine <- RLineAngleBisector
 */
class RLineAngleBisector extends RLine {
  public static TYPEL2 = 'RLineAngleBisector'
  protected declare __dependencies: [RLine, RLine]
  protected declare __prop: RLineAngleBisectorProp

  constructor(dependencies: [RLine, RLine], prop: RLineAngleBisectorProp, style?: RLineStyle) {
    super(dependencies, prop, style, RLineAngleBisector.TYPEL2)
  }

  /**
   * Calculates the angle bisector of two RLines mathematically.
   * @throws Throws an Error if two RLines are parallel.
   */
  preresolve() {
    const { coord: a, thetaMid: theta } = RLine.intersect(this.__dependencies[0], this.__dependencies[1], this.__prop.reverseL, this.__prop.reverseM)
    
    const b = a.addPolar(new CoordPolar(this.__prop.distance || LARGE_NUMBER, theta))

    return {
      a: a,
      b: b,
      extendA: false,
      extendB: !(this.__prop.distance),
    }
  }
}

export { RLineAngleBisectorProp, RLineAngleBisector }
