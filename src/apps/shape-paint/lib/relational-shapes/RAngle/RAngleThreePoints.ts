import { DependeciesInitError } from '../Error'
import { RPoint } from '../RPoint'
import { RAngleProp, RAngle } from './RAngle'

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
    if (
      dependencies.length !== 3 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        3,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RAngleThreePoints.TYPEL2)
  }

  /**
   * Calculates the angle formed by three RPoints.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()
    const cResolved = this.__dependencies[2].resolve()
    
    const theta0 = Math.atan2(aResolved.y - bResolved.y, aResolved.x - bResolved.x)
    const theta1 = Math.atan2(cResolved.y - bResolved.y, cResolved.x - bResolved.x)

    let theta = theta1 - theta0

    if (this.__prop.reflex) theta += Math.PI * 2

    return {
      x: resolvedB.x,
      y: resolvedB.y,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleThreePointsProp, RAngleThreePoints }