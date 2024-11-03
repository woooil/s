import { Theta, ThetaMinimum } from '../Theta'
import { RAngleProp, RAngleStyle, RAngle } from './RAngle'
import { RPoint } from '../RPoint'

/**
 * The properties of RAngleThreePointsProp. 
 * @prop reflex - True if to choose the angle larger than PI.
 */
interface RAngleThreePointsProp extends RAngleProp {
  reflex: boolean
}

/**
 * Represents angles formed by three points. The second point is its vertex.
 * @hierarchy RShape <- RAngle <- RAngleThreePoints
 */
class RAngleThreePoints extends RAngle {
  public static TYPEL2 = 'RAngleThreePoints'
  protected declare __dependencies: [RPoint, RPoint, RPoint]
  protected declare __prop: RAngleThreePointsProp

  constructor(dependencies: [RPoint, RPoint, RPoint], prop: RAngleThreePointsProp, style?: RAngleStyle) {
    super(dependencies, prop, style, RAngleThreePoints.TYPEL2)
  }

  /**
   * Calculates the ThetaTravel formed by three RPoints.
   */
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