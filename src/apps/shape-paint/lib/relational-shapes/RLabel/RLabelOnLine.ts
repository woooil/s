import { ParallelLinesError, DefaultCaseError } from '../Error'
import { sim } from '../tools'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RLine, CoordOnLine } from '../RLine'

/**
 * The properties of RLabelOnLine.
 * @prop offset   - The polar coordinate of offset.
 */
interface RLabelOnLineProp extends RLabelProp {
  onLine: CoordOnLine
  offset?: CoordPolar
}

/**
 * Represents labels on lines, typically representing their name.
 * @hierarchy RShape <- RLabel <- RLabelOnLine
 */
class RLabelOnLine extends RLabel {
  public static TYPEL2 = 'RLabelOnLine'
  protected declare __dependencies: [RLine]
  protected declare __prop: RLabelOnLineProp

  constructor(dependencies: [RLine], prop: RLabelOnLineProp, style?: RLabelStyle) {
    super(dependencies, prop, style, RLabelOnLine.TYPEL2)
  }

  /**
   * Calculates the coord of RLabelOnLine.
   */
  resolve() {
    const coord = this.__dependencies[0].coordOnLine(this.__prop.onLine)

    return {
      coord: this.__prop.offset ? coord.addPolar(this.__prop.offset) : coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite
    }
  }
}

export { RLabelOnLineProp, RLabelOnLine }