import { checkDependenciesInitError } from '../Error'
import { Coords, Angles } from '../Tools'
import { RAngleProp, RAngle } from './RAngle'
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
  protected declare __dependencies: RPoint[]
  protected declare __prop: RAngleThreePointsProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RPoint type or its length is not 3.
   */
  constructor(dependencies: RPoint[], prop: RAngleThreePointsProp) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1, RPoint.TYPEL1, RPoint.TYPEL1])
    super(dependencies, prop, RAngleThreePoints.TYPEL2)
  }

  /**
   * Calculates the angle formed by three RPoints.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()
    const cResolved = this.__dependencies[2].resolve()

    const theta0 = Angles.theta(Coords.substract(aResolved, bResolved))
    const theta1 = Angles.theta(Coords.substract(cResolved, bResolved))

    let theta = Angles.substract(theta1, theta0)

    if (this.__prop.reflex) theta = Angles.flip(theta)

    return {
      x: bResolved.x,
      y: bResolved.y,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleThreePointsProp, RAngleThreePoints }