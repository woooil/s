import { Coord, AngleIntersection } from '../Tools'
import { DependeciesInitError } from '../Error'
import { RLineProp, RLine } from './RLine'

/**
 * The properties of RLineAngleBisectorProp. Chooses the direction of the angle to bisect.
 */
interface RLineAngleBisectorProp extends RLineProp {
  direction: AngleIntersection
}

/**
 * Represents lines as angle bisectors of two lines.
 * @hierarchy RShape <- RLine <- RLineAngleBisector
 */
class RLineAngleBisector extends RLine {
  public static TYPEL2 = 'RLineAngleBisector'
  protected declare __dependencies: RLine[]
  protected declare __prop: RLineAngleBisectorProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLine type or its length is not 2.
   */
  constructor(dependencies: RLine[], prop: RLineAngleBisectorProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RLine.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RLine.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLineAngleBisector.TYPEL2)
  }

  /**
   * Calculates the angle bisector of two RLines mathematically.
   * @throws Throws an Error if two RLines are parallel.
   */
  preresolve() {
    const a = this.__dependencies[0].intersect(this.__dependencies[1]) // Throws an Error

    const lResolved = this.__dependencies[0].resolve()
    const mResolved = this.__dependencies[1].resolve()

    const alpha1 = lResolved.a.x - lResolved.b.x
    const alpha2 = mResolved.a.x - mResolved.b.x
    const beta1 = lResolved.a.y - lResolved.b.y
    const beta2 = mResolved.a.y - mResolved.b.y

    const theta1 = Math.atan(beta1 / alpha1)
    const theta2 = Math.atan(beta2 / alpha2)
    const theta = (theta1 + theta2) / 2
    const tan = Math.tan(theta)

    let b: Coord = {
      x: a.x,
      y: a.y,
    }

    const c = 1 << 8

    if (this.__prop.direction[0] && this.__prop.direction[1]) {
      b.x += c
      b.y += c * tan
    }
    else if (this.__prop.direction[0] && !this.__prop.direction[1]) {
      b.x += theta1 > theta2 ? -c * tan : c * tan
      b.y += theta1 > theta2 ? c : -c
    }
    else if (!this.__prop.direction[0] && !this.__prop.direction[1]) {
      b.x -= c
      b.y -= c * tan
    }
    else {
      b.x += theta1 > theta2 ? c * tan : -c * tan
      b.y += theta1 > theta2 ? -c : c
    }

    return {
      a: a,
      b: b,
      extendA: false,
      extendB: true,
    }
  }
}

export { RLineAngleBisectorProp, RLineAngleBisector }
