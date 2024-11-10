import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RLine, CoordOnLine } from '../RLine'

/**
 * The properties of RLabelOnLine which extends RLabelProp.
 * @prop onLine - The CoordOnLine on the dependend RLine.
 * @prop offset - The polar coordinate of offset.
 */
interface RLabelOnLineProp extends RLabelProp {
  onLine: CoordOnLine
  offset?: CoordPolar
}

/**
 * Represents labels on lines, typically representing their name.
 *
 * @example RLabelOnLine {
 *   dependencies: [RLine1];
 *   prop: { label: 'l', onLine: { type: 'ratio', value: 0.5 } };
 * }
 * represents a label written 'l' at the midpoint of RLine1.
 *
 * @hierarchy RShape <- RLabel <- RLabelOnLine
 */
class RLabelOnLine extends RLabel {
  public static REL_TYPE = 'RLabelOnLine'
  protected declare __dependencies: [RLine]
  protected declare __prop: RLabelOnLineProp

  constructor(dependencies: [RLine], prop: RLabelOnLineProp) {
    super(dependencies, prop, RLabelOnLine.REL_TYPE)
  }

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