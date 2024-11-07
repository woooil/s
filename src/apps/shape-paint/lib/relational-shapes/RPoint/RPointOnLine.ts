import { ParallelLinesError, DefaultCaseError } from '../Error'
import { sim } from '../tools'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RPointProp, RPointStyle, RPoint } from './RPoint'
import { RLine, CoordOnLine } from '../RLine'

/**
 * The properties of RPointOnLine.
 */
interface RPointOnLineProp extends RPointProp { 
  onLine: CoordOnLine
}

/**
 * Represents points on a line.
 * @hierarchy RShape <- RPoint <- RPointOnLine
 */
class RPointOnLine extends RPoint {
  public static TYPEL2 = 'RPointOnLine'
  protected declare __dependencies: [RLine]
  protected declare __prop: RPointOnLineProp

  constructor(dependencies: [RLine], prop: RPointOnLineProp, style?: RPointStyle) {
    super(dependencies, prop, style, RPointOnLine.TYPEL2)
  }

  /**
   * Calculates the distance from the RLine.
   */
  resolve() {
    return {
      coord: this.__dependencies[0].coordOnLine(this.__prop.onLine),
      hide: this.__prop.hide,
    }
  }
}

export { RPointOnLineProp, RPointOnLine }