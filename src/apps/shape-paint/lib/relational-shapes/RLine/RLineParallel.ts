import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLineProp, RLineStyle, RLine } from './RLine'
import { RPoint } from '../RPoint'
import { RDistanceExtraProp } from '../RSHape'

/**
 * The properties of RLineParallel.
 * @prop extendA  - Extends RPoint if true.
 * @prop reverse  - Uses the reversed direction of RLine if true.
 */
interface RLineParallelProp extends RLineProp, RDistanceExtraProp {
  extendA?: boolean
  reverse?: boolean
}

/**
 * Represents lines which is parallel to another line and passes through one point.
 * @hierarchy RShape <- RLine <- RLineParallel
 */
class RLineParallel extends RLine {
  public static TYPEL2 = 'RLineParallel'
  protected declare __dependencies: [RPoint, RLine]
  protected declare __prop: RLineParallelProp

  constructor(dependencies: [RPoint, RLine], prop: RLineParallelProp, style?: RLineStyle) {
    super(dependencies, prop, style, RLineParallel.TYPEL2)
  }

  /**
   * Returns RLineResolved which is parallel to one line and passes thorugh one point.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const lResolved = this.__dependencies[1].resolve()
    const theta = this.__prop.reverse ? Theta.fromCoord(lResolved.b, lResolved.a) : Theta.fromCoord(lResolved.a, lResolved.b)
    const b = aResolved.coord.addPolar(new CoordPolar(this.__prop.distance || LARGE_NUMBER, theta))

    return {
      a: aResolved.coord,
      b,
      extendA: !!(this.__prop.extendA),
      extendB: !(this.__prop.distance),
    }
  }
}

export { RLineParallelProp, RLineParallel }