import { LineExtend, LineProp, Line } from './index'
import { Point } from '../Point'

/**
 * The properties of LineTwoPointsProp. Sets LineExtend explicitly.
 * @prop extend - The extension of LineTwoPoints.
 */
interface LineTwoPointsProp extends LineProp {
  extend: LineExtend
}

/**
 * Represents lines as two points it passes through.
 * @hierarchy Shape <- Line <- LineTwoPoints
 */
class LineTwoPoints extends Line {
  /** 
   * Two points Line passes through.
   */
  declare readonly dependencies: Point[]

  /**
   * The properties of LineTwoPoints.
   * @prop extend - The extension of LineTwoPoints.
   */
  declare readonly prop: LineTwoPointsProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Point[], prop: LineTwoPointsProp) {
    if (dependencies.length !== 2 || !(dependencies.every((i) => i.type === 'Point'))) throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  /**
   * Returns two points Line passes through.
   */
  resolve() {
    const aResolved = this.dependencies[0].resolve()
    const bResolved = this.dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      extend: this.prop.extend,
    }
  }
}

export { LineTwoPointsProp, LineTwoPoints }