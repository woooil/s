import { Coord, CoordPolar } from '../Coord'
import { Theta, ThetaMinimum, ThetaTravel } from '../Theta'
import { RArcProp, RArcStyle, RArc } from './RArc'
import { RPoint } from '../RPoint'

/**
 * The properties of RArcOnTwoPoints.
 * @prop theta  - The (directional) central angle.
 */
interface RArcOnTwoPointsProp extends RArcProp {
  theta: ThetaTravel
}

/**
 * Represents arcs whose two passing points and central angle are give.
 * @hierarchy RShape <- RArc <- RArcOnTwoPoints
 */
class RArcOnTwoPoints extends RArc {
  public static TYPEL2 = 'RArcOnTwoPoint'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RArcOnTwoPointsProp

  constructor(dependencies: [RPoint, RPoint], prop: RArcOnTwoPointsProp, style?: RArcStyle) {
    super(dependencies, prop, style, RArcOnTwoPoints.TYPEL2)
  }

  resolve() {
    const aCoord = this.__dependencies[0].resolve().coord
    const bCoord = this.__dependencies[1].resolve().coord
    const d = Coord.distance(aCoord, bCoord)
    const r = d / (2 * Math.sin(this.__prop.theta.size / 2))
    const phi = Theta.fromCoord(aCoord, bCoord)
    const h = Math.sqrt(r * r - d * d / 4)
    const mCoord = Coord.avg(aCoord, bCoord)
    const flag = this.__prop.theta.t > 0 !== this.__prop.theta.size < Math.PI ?  -1 : 1
    const coord = Coord.addPolar(mCoord, new CoordPolar(flag * h, Theta.add(phi, Theta.py())))
    const theta0 = Theta.fromCoord(coord, aCoord)

    return {
      coord,
      r,
      theta: this.__prop.theta,
      theta0,
    }
  }
}

export { RArcOnTwoPointsProp, RArcOnTwoPoints }