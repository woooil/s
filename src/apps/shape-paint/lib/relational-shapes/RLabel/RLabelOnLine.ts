import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RLine } from '../RLine'

/**
 * The properties of RLabelOnLine.
 * @prop section  - 0 for the section of the first Coord, 1 for the inside of the two Coords, 2 for the section of the second Coord.
 * @prop r        - The distance from the first/second Coord along the RLine if the section is 0 or 2. The ratio of the internal division if the section is 1.
 * @prop offset   - The polar coordinate of offset.
 */
interface RLabelOnLineProp extends RLabelProp {
  section: number
  r: number
  offset?: CoordPolar
}

/**
 * Represents labels on lines, typically representing their name.
 * @hierarchy RShape <- RLabel <- RLabelOnLine
 */
class RLabelOnLine extends RLabel {
  public static TYPEL2 = 'RLabelOnLine'
  protected declare __dependencies: RLine[]
  protected declare __prop: RLabelOnLineProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLine type or its length is not 1.
   */
  constructor(dependencies: RLine[], prop: RLabelOnLineProp, style?: RLabelStyle) {
    checkDependenciesInitError(dependencies, [RLine.TYPEL1])
    super(dependencies, prop, style, RLabelOnLine.TYPEL2)
  }

  /**
   * Calculates the coord of RLabelOnLine.
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
        coord = Coord.add(Coord.scale(resolved.a, 1 - this.__prop.r), Coord.scale(resolved.b, this.__prop.r))
        break
      case 2:
        coord = Coord.addPolar(resolved.b, new CoordPolar(this.__prop.r, theta))
        break
    }

    return {
      coord: this.__prop.offset ? Coord.addPolar(coord, this.__prop.offset) : coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite
    }
  }
}

export { RLabelOnLineProp, RLabelOnLine }