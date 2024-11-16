import { CoordPolar } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RArc } from '../RArc'

/**
 * The properties of RLabelArc which extends RLabelProp.
 * @prop offset - The polar coordinate relative to the center of the mass of RArc.
 */
interface RLabelArcProp extends RLabelProp {
  offset?: CoordPolar
}

/**
 * Represents labels on arcs.
 *
 * @example RLabelArc {
 *   dependencies: [RArc1];
 *   prop: { label: 'A' };
 * }
 * represents a label written 'A' fixed on the center of the mass of RArc1.
 *
 * @hierarchy RShape <- RLabel <- RLabelArc
 */
class RLabelArc extends RLabel {
  public static REL_TYPE = 'RLabelArc'
  protected declare __dependencies: [RArc]
  protected declare __prop: RLabelArcProp

  constructor(dependencies: [RArc], prop: RLabelArcProp) {
    super(dependencies, prop, RLabelArc.REL_TYPE)
  }

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

export { RLabelArcProp, RLabelArc }
