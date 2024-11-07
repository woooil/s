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
    const theta = Theta.fromCoord(resolved.coord1, resolved.coord2)
    let coord: Coord
    const m = (resolved.coord2.y - resolved.coord1.y) / (resolved.coord2.x - resolved.coord1.x)
    switch (this.__prop.onLine.type) {
      case 'coord1':
        coord = resolved.coord1.addPolar(new CoordPolar(this.__prop.onLine.value, theta))
        break
      case 'coord2':
        coord = resolved.coord2.addPolar(new CoordPolar(this.__prop.onLine.value, theta))
        break
      case 'ratio':
        coord = resolved.coord1.divideInternal(resolved.coord2, this.__prop.onLine.value)
        break
      case 'x':
        if (sim(resolved.coord1.x, resolved.coord2.x))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'y-axis')
        const y = resolved.coord1.y + (this.__prop.onLine.value - resolved.coord2.x) * m
        coord = new Coord(this.__prop.onLine.value, y)
        break
      case 'y':
        if (sim(resolved.coord1.y, resolved.coord2.y))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'x-axis')
        const x = resolved.coord1.x + (this.__prop.onLine.value - resolved.coord1.y) / m
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