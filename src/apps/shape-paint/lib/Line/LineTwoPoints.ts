import { Shape } from '../Shape'
import { LineProp, Line } from './index'

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
  /**
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Shape[], prop: LineTwoPointsProp) {
    if (dependencies[0].type !== 'Point' || dependencies[1].type !== 'Point') throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  /**
   * Returns Line passing through two points.
   */
  preresolve() {
    const aResolved = this.dependencies[0].resolve()
    const bResolved = this.dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      extendA: this.prop.extendA || false,
      extendB: this.prop.extendB || false,
    }
  }
}

export { LineTwoPointsProp, LineTwoPoints }