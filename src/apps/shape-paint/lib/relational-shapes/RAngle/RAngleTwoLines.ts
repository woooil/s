import { checkDependenciesInitError } from '../Error'
import { Theta } from '../Theta'
import { RAngleProp, RAngle } from './RAngle'
import { RLine } from '../RLine'

/**
 * The properties of RAngleTwoLinesProp. 
 * @prop reverseL - True if reverse the direction of the first RLine.
 * @prop reverseM - True if reverse the direction of the second RLine.
 */
interface RAngleTwoLinesProp extends RAngleProp {
  reverseL?: boolean,
  reverseM?: boolean,
}

/**
 * Represents angles formed by the intersection of two RLines.
 * @hierarchy RShape <- RAngle <- RAngleTwoLines
 */
class RAngleTwoLines extends RAngle {
  public static TYPEL2 = 'RAngleTwoLines'
  protected declare __dependencies: RLine[]
  protected declare __prop: RAngleTwoLinesProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLine type or its length is not 2.
   */
  constructor(dependencies: RLine[], prop: RAngleTwoLinesProp) {
    checkDependenciesInitError(dependencies, [RLine.TYPEL1, RLine.TYPEL1])
    super(dependencies, prop, RAngleTwoLines.TYPEL2)
  }

  /**
   * Calculates the angle in MINIMUM_RANGE formed by two RLines.
   * @throws Throws an Error if two RLines are parallel.
   */
  resolve() {
    const coord = this.__dependencies[0].intersect(this.__dependencies[1]) // Throws an Error

    const lResolved = this.__dependencies[0].resolve()
    const mResolved = this.__dependencies[1].resolve()

    const { theta0, theta } = Theta.intersect({ 
        from: this.__prop.reverseL ? lResolved.b : lResolved.a, 
        to:   this.__prop.reverseL ? lResolved.a : lResolved.b 
      }, { 
        from: this.__prop.reverseM ? mResolved.b : mResolved.a, 
        to:   this.__prop.reverseM ? mResolved.a : mResolved.b 
      })

    return {
      coord: coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleTwoLinesProp, RAngleTwoLines }