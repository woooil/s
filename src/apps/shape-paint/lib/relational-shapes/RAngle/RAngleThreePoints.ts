import { Theta } from '../Theta'
import { RAngleProp, RAngle } from './RAngle'
import { RPoint } from '../RPoint'

/**
 * The properties of RAngleThreePointsProp which extends RAngleProp. 
 * @prop reflex - Chooses the angle larger that PI if true.
 */
interface RAngleThreePointsProp extends RAngleProp {
  reflex: boolean
}

/**
 * Represents angles formed by three points. The second point is its vertex.
 *
 * @example RAngleThreePoints {
 *   dependencies: [RPoint1, RPoint2, RPoint3];
 *   prop: { reflex: false };
 * }
 * represents an angle less than PI which is made by connecting RPoint1, RPoint2 and RPoint3 in the order.
 *
 * @hierarchy RShape <- RAngle <- RAngleThreePoints
 */
class RAngleThreePoints extends RAngle {
  public static REL_TYPE = 'RAngleThreePoints'
  protected declare __dependencies: [RPoint, RPoint, RPoint]
  protected declare __prop: RAngleThreePointsProp

  constructor(dependencies: [RPoint, RPoint, RPoint], prop: RAngleThreePointsProp) {
    super(dependencies, prop, RAngleThreePoints.REL_TYPE)
  }

  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()
    const cResolved = this.__dependencies[2].resolve()

    const theta0 = Theta.fromCoord(aResolved.coord.substract(bResolved.coord))
    const theta1 = Theta.fromCoord(cResolved.coord.substract(bResolved.coord))

    let theta: Theta = theta1.substract(theta0)

    if (this.__prop.reflex) theta = theta.flip()

    return {
      coord: bResolved.coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleThreePointsProp, RAngleThreePoints }