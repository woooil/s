import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLineProp, RLine } from './RLine'

/**
 * The properties of RLineAngleBisectorProp. 
 * @prop reverseL - True if reverse the direction of the first RLine.
 * @prop reverseM - True if reverse the direction of the second RLine.
 */
interface RLineAngleBisectorProp extends RLineProp {
  reverseL?: boolean,
  reverseM?: boolean,
}

/**
 * Represents lines as angle bisectors of two lines.
 * @hierarchy RShape <- RLine <- RLineAngleBisector
 */
class RLineAngleBisector extends RLine {
  public static TYPEL2 = 'RLineAngleBisector'
  protected declare __dependencies: RLine[]
  protected declare __prop: RLineAngleBisectorProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLine type or its length is not 2.
   */
  constructor(dependencies: RLine[], prop: RLineAngleBisectorProp) {
    checkDependenciesInitError(dependencies, [RLine.TYPEL1, RLine.TYPEL1])
    super(dependencies, prop, RLineAngleBisector.TYPEL2)
  }

  /**
   * Calculates the angle bisector of two RLines mathematically.
   * @throws Throws an Error if two RLines are parallel.
   */
  preresolve() {
    const a = this.__dependencies[0].intersect(this.__dependencies[1]) // Throws an Error

    const lResolved = this.__dependencies[0].resolve()
    const mResolved = this.__dependencies[1].resolve()

    const { thetaMid: theta } = Theta.intersect({ 
        from: this.__prop.reverseL ? lResolved.b : lResolved.a, 
        to:   this.__prop.reverseL ? lResolved.a : lResolved.b 
      }, { 
        from: this.__prop.reverseM ? mResolved.b : mResolved.a, 
        to:   this.__prop.reverseM ? mResolved.a : mResolved.b 
      })
    
    const b = Coord.addPolar(a, new CoordPolar(1 << 8, theta))

    return {
      a: a,
      b: b,
      extendA: false,
      extendB: true,
    }
  }
}

export { RLineAngleBisectorProp, RLineAngleBisector }
