import { ReactSVGElement, SVGAttributes } from 'react'
import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RLineProp, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLineOriented which extends RLineProp.
 * @prop theta    - The orientation.
 * @prop extend1  - Extends backwards if true.
 * @prop length   - The length, if provided. 
 */
interface RLineOrientedProp extends RLineProp {
  theta: ThetaMinimum
  extend1?: boolean
  length?: number
}

/**
 * Represents rays whose orient and one passing point are given.
 *
 * @example RLineOriented {
 *   dependencies: [RPoint1];
 *   prop: { theta: { t: 1 }, extend1: true };
 * }
 * represents a line which passes through RPoint1 and extends towards the orientation of 1 rad.
 *
 * @hierarchy RShape <- RLine <- RLineOriented
 */
class RLineOriented extends RLine {
  public static REL_TYPE = 'RLineOriented'
  protected declare __dependencies: [RPoint]
  protected declare __prop: RLineOrientedProp

  constructor(dependencies: [RPoint], prop: RLineOrientedProp, style?: SVGAttributes<ReactSVGElement>) {
    super(dependencies, prop, style, RLineOriented.REL_TYPE)
  }

  protected preresolve() {
    const resolved = this.__dependencies[0].resolve()
    const coord2 = resolved.coord.addPolar(new CoordPolar(this.__prop.length || LARGE_NUMBER, this.__prop.theta))
    return {
      coord1: resolved.coord,
      coord2,
      extend1: !!(this.__prop.extend1),
      extend2: !(this.__prop.length),
    }
  }
}

export { RLineOrientedProp, RLineOriented }
