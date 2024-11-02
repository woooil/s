import { checkDependenciesInitError } from '../Error'
import { Coord } from '../Coord'
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
  protected declare __dependencies: RPoint[]
  protected declare __prop: RAngleThreePointsProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RPoint type or its length is not 3.
   */
  constructor(dependencies: RPoint[], prop: RAngleThreePointsProp, style?: RAngleStyle) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1, RPoint.TYPEL1, RPoint.TYPEL1])
    super(dependencies, prop, style, RAngleThreePoints.TYPEL2)
  }

  /**
   * Calculates the angle in TRAVLE_RANGE formed by three RPoints.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()
    const cResolved = this.__dependencies[2].resolve()

    const theta0 = Theta.fromCoord(Coord.substract(aResolved.coord, bResolved.coord))
    const theta1 = Theta.fromCoord(Coord.substract(cResolved.coord, bResolved.coord))

    let theta: Theta = ThetaMinimum.substract(theta1, theta0)

    if (this.__prop.reflex) theta = Theta.flip(theta)

    return {
      coord: bResolved.coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleThreePointsProp, RAngleThreePoints }