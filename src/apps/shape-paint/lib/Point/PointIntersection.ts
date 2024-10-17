import { PointProp, Point } from './index'
import { Line } from '../Line'

interface PointIntersectionProp extends PointProp { }

class PointIntersection extends Point {
  declare readonly dependencies: Line[]

  declare readonly prop: PointIntersectionProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Line.
   */
  constructor(dependencies: Line[], prop: PointIntersectionProp) {
    if (dependencies.length !== 2 || !(dependencies.every((i) => i.type === 'Line'))) throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  resolve() {
    return this.dependencies[0].intersect(this.dependencies[1])
  }
}

export { PointIntersectionProp, PointIntersection }