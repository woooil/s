import { Shape } from '../Shape'
import { Coord } from '../Coord'
import { LineProp, Line } from './index'

/**
 * The properties of LineAngleBisectorProp. Chooses the direction of the angle to bisect.
 * @prop direction - The direction of the angle to bisect. Integers from 0 to 3 represents four possible angles made by two Lines defined as below. Any integer out of this range would be considered as its remainder divided by 4.
 *   @value 0 - The angle by two Lines extending towards +x direction.
 *   @value 1 - The angle by the first Line extending towards +x direction and the second Line extending towards -x direction.
 *   @value 2 - The angle by two Lines extending towards -x direction.
 *   @value 3 - The angle by the first Line extending towards -x direction and the second Line extending towards +x direction.
 */
interface LineAngleBisectorProp extends LineProp {
  direction: number
}

/**
 * Represents lines as angle bisectors of two lines.
 * @hierarchy Shape <- Line <- LineAngleBisector
 */
class LineAngleBisector extends Line {
  protected declare __dependencies: Line[]
  protected declare __prop: LineAngleBisectorProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Line.
   */
  constructor(dependencies: Line[], prop: LineAngleBisectorProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === 'Line')
    )
      throw new Error('Dependencies are not type of Line')
    super(dependencies, prop)
  }

  /**
   * Calculates the angle bisector of two Lines mathematically.
   * @throws Throws an Error if two Lines are parallel.
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

    switch (this.__prop.direction % 4) {
      case 0:
        b.x += c
        b.y += c * tan
        break
      case 1:
        b.x += theta1 > theta2 ? -c * tan : c * tan
        b.y += theta1 > theta2 ? c : -c
        break
      case 2:
        b.x -= c
        b.y -= c * tan
        break
      case 3:
        b.x += theta1 > theta2 ? c * tan : -c * tan
        b.y += theta1 > theta2 ? -c : c
        break
      default:
        break
    }

    return {
      a: a,
      b: b,
      extendA: false,
      extendB: true,
    }
  }
}

export { LineAngleBisectorProp, LineAngleBisector }
