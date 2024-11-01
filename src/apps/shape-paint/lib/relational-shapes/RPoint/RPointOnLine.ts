import { DependeciesInitError } from '../Error'
import { RPointProp, RPoint } from './RPoint'
import { RLine } from '../RLine'

/**
 * The properties of RPointOnLine.
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
    if (
      dependencies.length !== 1 ||
      !dependencies.every(i => i.type[0] === RLine.TYPEL1)
    )
      throw DependeciesInitError(
        1,
        RLine.TYPEL2,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RPointOnLine.TYPEL2)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Math.atan2(resolved.b.y - resolved.a.y, resolved.b.x - resolved.a.x)
    const coord = { x: 0, y: 0 }
    switch (this.__prop.section % 3) {
      case 0:
        coord.x = resolved.a.x - this.__prop.r * Math.cos(theta)
        coord.y = resolved.a.y - this.__prop.r * Math.sin(theta)
        break
      case 1:
        coord.x = resolved.a.x * (1 - this.__prop.r) + resolved.b.x * this.__prop.r
        coord.y = resolved.a.y * (1 - this.__prop.r) + resolved.b.y * this.__prop.r
        break
      case 2:
        coord.x = resolved.b.x + this.__prop.r * Math.cos(theta)
        coord.y = resolved.b.y + this.__prop.r * Math.sin(theta)
        break
    }
    return coord
  }
}

export { RPointOnLineProp, RPointOnLine }