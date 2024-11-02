import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RPointProp, RPoint } from './RPoint'
import { RLine } from '../RLine'

/**
 * The properties of RPointOnLine.
 * @prop section  - 0 for the section of the first Coord, 1 for the inside of the two Coords, 2 for the section of the second Coord.
 * @prop r        - The distance from the first/second Coord along the RLine if the section is 0 or 2. The ratio of the internal division if the section is 1.
 */
interface RPointOnLineProp extends RPointProp {
  section: number
  r: number
}

/**
 * Represents points on a line.
 * @hierarchy RShape <- RPoint <- RPointOnLine
 */
class RPointOnLine extends RPoint {
  public static TYPEL2 = 'RPointOnLine'
  protected declare __dependencies: RLine[]
  protected declare __prop: RPointOnLineProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Line type or its length is not 1.
   */
  constructor(dependencies: RLine[], prop: RPointOnLineProp) {
    checkDependenciesInitError(dependencies, [RLine.TYPEL1])
    super(dependencies, prop, RPointOnLine.TYPEL2)
  }

  /**
   * Calculates the distance from the RLine.
   */
  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Theta.fromCoord(resolved.a, resolved.b)
    let coord: Coord
    switch (this.__prop.section % 3) {
      case 0:
        coord = Coord.addPolar(resolved.a, new CoordPolar(this.__prop.r, theta))
        break
      case 1:
        coord = new Coord(
          resolved.a.x * (1 - this.__prop.r) + resolved.b.x * this.__prop.r,
          resolved.a.y * (1 - this.__prop.r) + resolved.b.y * this.__prop.r
        )
        break
      case 2:
        coord = Coord.addPolar(resolved.b, new CoordPolar(this.__prop.r, theta))
        break
    }
    return {
      coord: coord,
      hide: this.__prop.hide,
    }
  }
}

export { RPointOnLineProp, RPointOnLine }