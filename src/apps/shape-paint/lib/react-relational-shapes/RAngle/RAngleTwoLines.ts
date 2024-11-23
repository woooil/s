import { ReactSVGElement, SVGAttributes } from 'react'
import { RAngleProp, RAngle } from './RAngle'
import { RLine } from '../RLine'

/**
 * The properties of RAngleTwoLinesProp which extends RAngleProp. 
 * @prop reverse1 - Reverses the direction of the first depended RLine if true.
 * @prop reverse2 - Reverses the direction of the second depended RLine if true.
 */
interface RAngleTwoLinesProp extends RAngleProp {
  reverse1?: boolean,
  reverse2?: boolean,
}

/**
 * Represents angles formed by the intersection of two RLines.
 *
 * @example RAngleTwoLines {
 *   dependencies: [RLine1, RLine2];
 *   prop: { reverse1: true };
 * }
 * represents an angle made by the reversed RLine1 and RLine2.
 *
 * @hierarchy RShape <- RAngle <- RAngleTwoLines
 */
class RAngleTwoLines extends RAngle {
  public static REL_TYPE = 'RAngleTwoLines'
  protected declare __dependencies: [RLine, RLine]
  protected declare __prop: RAngleTwoLinesProp

  constructor(dependencies: [RLine, RLine], prop: RAngleTwoLinesProp, style?: SVGAttributes<ReactSVGElement>) {
    super(dependencies, prop, style, RAngleTwoLines.REL_TYPE)
  }

  /**
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
