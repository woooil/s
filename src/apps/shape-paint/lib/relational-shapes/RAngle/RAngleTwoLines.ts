import { Theta } from '../Theta'
import { RAngleProp, RAngleStyle, RAngle } from './RAngle'
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
  protected declare __dependencies: [RLine, RLine]
  protected declare __prop: RAngleTwoLinesProp

  constructor(dependencies: [RLine, RLine], prop: RAngleTwoLinesProp, style?: RAngleStyle) {
    super(dependencies, prop, style, RAngleTwoLines.TYPEL2)
  }

  /**
   * Calculates the angle in MINIMUM_RANGE formed by two RLines.
   * @throws Throws an Error if two RLines are parallel.
   */
  resolve() {
    const { coord, theta0, theta } = RLine.intersect(this.__dependencies[0], this.__dependencies[1], this.__prop.reverseL, this.__prop.reverseM)

    return {
      coord: coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleTwoLinesProp, RAngleTwoLines }