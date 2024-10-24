import { LineProp, Line } from './Line'
import { Point } from '../Point'

/**
 * The properties of LineTwoPointsProp. Sets LineExtend explicitly.
 * @prop extend - The extension of LineTwoPoints.
 */
interface LineTwoPointsProp extends LineProp {
  extendA?: boolean
  extendB?: boolean
}

/**
 * Represents lines as two points it passes through.
 * @hierarchy Shape <- Line <- LineTwoPoints
 */
class LineTwoPoints extends Line {
  protected declare __dependencies: Point[]
  protected declare __prop: LineTwoPointsProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Point[], prop: LineTwoPointsProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type === 'Point')
    )
      throw new Error('Dependencies are not type of Point')
    super(dependencies, prop)
  }

  /**
   * Returns Line passing through two points.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      extendA: this.__prop.extendA || false,
      extendB: this.__prop.extendB || false,
    }
  }
}

export { LineTwoPointsProp, LineTwoPoints }
