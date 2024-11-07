import { Theta } from '../Theta'
import { RAngleProp, RAngleStyle, RAngle } from './RAngle'
import { RLine } from '../RLine'

/**
 * The properties of RAngleTwoLinesProp. 
 * @prop reverse1 - True if reverse the direction of the first RLine.
 * @prop reverse2 - True if reverse the direction of the second RLine.
 */
interface RAngleTwoLinesProp extends RAngleProp {
  reverse1?: boolean,
  reverse2?: boolean,
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
    const { coord, theta0, theta } = RLine.intersect(this.__dependencies[0], this.__dependencies[1], this.__prop.reverse1, this.__prop.reverse2)

    return {
      coord: coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleTwoLinesProp, RAngleTwoLines }