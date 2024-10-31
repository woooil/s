import { AngleIntersection } from '../Tools'
import { DependeciesInitError } from '../Error'
import { RLine } from '../RLine'
import { RAngleProp, RAngle } from './RAngle'

/**
 * The properties of RAngleTwoLinesProp. Chooses the direction of the angle of the intersection of two RLines.
 */
interface RAngleTwoLinesProp extends RAngleProp {
  direction: AngleIntersection
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
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RLine.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RLine.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RAngleTwoLines.TYPEL2)
  }

  /**
   * Calculates the angle formed by two RLines.
   * @throws Throws an Error if two RLines are parallel.
   */
  resolve() {
    const coord = this.__dependencies[0].intersect(this.__dependencies[1]) // Throws an Error

    const lResolved = this.__dependencies[0].resolve()
    const mResolved = this.__dependencies[1].resolve()

    const alpha1 = lResolved.a.x - lResolved.b.x
    const alpha2 = mResolved.a.x - mResolved.b.x
    const beta1 = lResolved.a.y - lResolved.b.y
    const beta2 = mResolved.a.y - mResolved.b.y

    let theta0 = Math.atan(beta1 / alpha1)
    const theta1 = Math.atan(beta2 / alpha2)
    let theta: number = theta1 - theta0

    if (this.__prop.direction[0] && this.__prop.direction[1]) { }
    else if (this.__prop.direction[0] && !this.__prop.direction[1]) {
      theta += theta > 0 ? -Math.PI : Math.PI
    }
    else if (!this.__prop.direction[0] && !this.__prop.direction[1]) {
      theta0 += Math.PI
    }
    else {
      theta0 += Math.PI
      theta += theta > 0 ? -Math.PI : Math.PI
    }

    return {
      ...coord,
      theta0: theta0,
      theta: theta,
      marker: this.__prop.marker
    }
  }
}

export { RAngleTwoLinesProp, RAngleTwoLines }