import { ParallelLinesError, DefaultCaseError } from '../Error'
import { sim } from '../tools'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RPointProp, RPointStyle, RPoint } from './RPoint'
import { RLine } from '../RLine'
import { RCoordOnLineExtraProp } from '../RShape'

/**
 * The properties of RPointOnLine.
 */
interface RPointOnLineProp extends RPointProp, RCoordOnLineExtraProp { }

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
      coord: coord,
      hide: this.__prop.hide,
    }
  }
}

export { RPointOnLineProp, RPointOnLine }