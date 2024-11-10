import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLineProp, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineParallel which extends RLineProp.
 * @prop reverse  - Reverses the direction of the depended RLine if true.
 * @prop extend1  - Extends backwards if true.
 * @prop length   - The length, if provided.
 */
interface RLineParallelProp extends RLineProp {
  reverse?: boolean
  extend1?: boolean
  length?: number
}

/**
 * Represents lines which is parallel to another RLine and passes through a given RPoint.
 *
 * @example RLineParallel {
 *   dependencies: [RPoint1, RLine1];
 *   prop: { reverse: true };
 * }
 * represents a parallel ray to RLine1 which starts from RPoint1 and extending towards the opposite direction to RLine1.
 *
 * @hierarchy RShape <- RLine <- RLineParallel
 */
class RLineParallel extends RLine {
  public static REL_TYPE = 'RLineParallel'
  protected declare __dependencies: [RPoint, RLine]
  protected declare __prop: RLineParallelProp

  constructor(dependencies: [RPoint, RLine], prop: RLineParallelProp) {
    super(dependencies, prop, RLineParallel.REL_TYPE)
  }

  protected preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const lResolved = this.__dependencies[1].resolve()
    const theta = this.__prop.reverse ? Theta.fromCoord(lResolved.coord2, lResolved.coord1) : Theta.fromCoord(lResolved.coord1, lResolved.coord2)
    const coord2 = aResolved.coord.addPolar(new CoordPolar(this.__prop.length || LARGE_NUMBER, theta))

    return {
      coord1: aResolved.coord,
      coord2,
      extend1: !!(this.__prop.extend1),
      extend2: !(this.__prop.length),
    }
  }
}

export { RLineParallelProp, RLineParallel }