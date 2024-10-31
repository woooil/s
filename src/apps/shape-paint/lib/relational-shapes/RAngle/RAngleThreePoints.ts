import { Coords } from '../Tools'
import { DependeciesInitError } from '../Error'
import { RPoint } from '../RPoint'
import { RAngleProp, RAngle } from './RAngle'

interface RAngleThreePointsProp extends RAngleProp {
  large: boolean
}

class RAngleThreePoints extends RAngle {
  public static TYPEL2 = 'RAngleThreePoints'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RAngleThreePointsProp

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

  resolve() {
    const resolvedA = this.__dependencies[0].resolve()
    const resolvedB = this.__dependencies[1].resolve()
    const resolvedC = this.__dependencies[2].resolve()
    
    const theta0 = Math.atan2(resolvedA.y - resolvedB.y, resolvedA.x - resolvedB.x)
    const theta1 = Math.atan2(resolvedC.y - resolvedB.y, resolvedC.x - resolvedB.x)

    let theta = theta1 - theta0

    if (this.__prop.large) theta += Math.PI * 2

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