import { CoordPolar } from '../Coord'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RArc } from '../RArc'

/**
 * The properties of RLabelOnArc.
 * @prop offset - The polar coordinate relative to the center of the mass of RArc.
 */
interface RLabelOnArcProp extends RLabelProp {
  offset?: CoordPolar
}

/**
 * Represents labels on arcs.
 * @hierarchy RShape <- RLabel <- RLabelOnArc
 */
class RLabelOnArc extends RLabel {
  public static TYPEL2 = 'RLabelOnArc'
  protected declare __dependencies: [RArc]
  protected declare __prop: RLabelOnArcProp

  constructor(dependencies: [RArc], prop: RLabelOnArcProp, style?: RLabelStyle) {
    super(dependencies, prop, style, RLabelOnArc.TYPEL2)
  }

  /**
   * Calculates the center of the mass and adds with the offset.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const theta = aResolved.theta.size
    const r = 4 * aResolved.r * Math.pow(Math.sin(theta / 2), 3) / 3 / (theta - Math.sin(theta))
    const coord = aResolved.coord.addPolar(new CoordPolar(r, aResolved.theta.half().add(aResolved.theta0)))

    return {
      coord: this.__prop.offset ? coord.addPolar(this.__prop.offset) : coord,
      label: this.__prop.label,
      offsite: this.__prop.offsite,
    }
  }
}

export { RLabelOnArcProp, RLabelOnArc }
