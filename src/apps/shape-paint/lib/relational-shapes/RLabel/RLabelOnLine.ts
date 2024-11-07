import { ParallelLinesError, DefaultCaseError } from '../Error'
import { sim } from '../tools'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RLine } from '../RLine'
import { RCoordOnLineExtraProp } from '../RShape'

/**
 * The properties of RLabelOnLine.
 * @prop offset   - The polar coordinate of offset.
 */
interface RLabelOnLineProp extends RLabelProp, RCoordOnLineExtraProp {
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
    const resolved = this.__dependencies[0].resolve()
    const theta = Theta.fromCoord(resolved.a, resolved.b)
    let coord: Coord
    const m = (resolved.b.y - resolved.a.y) / (resolved.b.x - resolved.a.x)
    switch (this.__prop.onLine.type) {
      case 'from1':
        coord = resolved.a.addPolar(new CoordPolar(this.__prop.onLine.value, theta))
        break
      case 'from2':
        coord = resolved.b.addPolar(new CoordPolar(this.__prop.onLine.value, theta))
        break
      case 'ratio':
        coord = resolved.a.divideInternal(resolved.b, this.__prop.onLine.value)
        break
      case 'x':
        if (sim(resolved.a.x, resolved.b.x))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'y-axis')
        const y = resolved.a.y + (this.__prop.onLine.value - resolved.a.x) * m
        coord = new Coord(this.__prop.onLine.value, y)
        break
      case 'y':
        if (sim(resolved.a.y, resolved.b.y))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'x-axis')
        const x = resolved.a.x + (this.__prop.onLine.value - resolved.a.y) / m
        coord = new Coord(x, this.__prop.onLine.value)
        break
      default:
        throw DefaultCaseError(this.__prop.onLine.type)
    }

    return {
      coord: this.__prop.offset ? coord.addPolar(this.__prop.offset) : coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite
    }
  }
}

export { RLabelOnLineProp, RLabelOnLine }