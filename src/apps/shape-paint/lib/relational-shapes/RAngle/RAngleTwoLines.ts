import { DependeciesInitError } from '../Error'
import { RLine } from '../RLine'
import { RAngleProp, RAngle } from './RAngle'

interface RAngleTwoLinesProp extends RAngleProp {
  marker: string
  direction: number
}

class RAngleTwoLines extends RAngle {
  protected declare __dependencies: RLine[]
  protected declare __prop: RAngleTwoLinesProp

  constructor(dependencies: RLine[], prop: RAngleTwoLinesProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === RLine.TYPE)
    )
      throw DependeciesInitError(
        2,
        RLine.TYPE,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop)
  }

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

    switch (this.__prop.direction % 4) {
      case 0:
        break
      case 1:
        theta += theta > 0 ? -Math.PI : Math.PI
        break
      case 2:
        theta0 += Math.PI
        break
      case 3:
        theta0 += Math.PI
        theta += theta > 0 ? -Math.PI : Math.PI
        break
      default:
        break
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