import { ReactSVGElement, SVGAttributes } from 'react'
import { LARGE_NUMBER } from '../tools'
import { CoordPolar } from '../Coord'
import { Theta } from '../Theta'
import { RLineProp, RLine } from './RLine'
import { RPoint } from '../RPoint'

/**
 * The properties of RLinePerpendicular which extends RLineProp.
 * @prop reverse  - PI / 2 rad behind of the depended RLine if true; PI / 2 rad ahead if false.
 * @prop extend1  - Extends backwards if true.
 * @prop length   - The length, if provided.
 */
interface RLinePerpendicularProp extends RLineProp {
  reverse?: boolean
  extend1?: boolean
  length?: number
}


/**
 * Represents lines which is perpendicular to another RLine and passes through a given RPoint.
 *
 * @example RLinePerpendicular {
 *   dependencies: [RPoint1, RLine1];
 *   prop: { reverse: true };
 * }
 * represents a ray which starts at RPoint1 and is -PI / 2 rad behind of RLine1. 
 *
 * @hierarchy RShape <- RLine <- RLinePerpendicular
 */
class RLinePerpendicular extends RLine {
  public static REL_TYPE = 'RLinePerpendicular'
  protected declare __dependencies: [RPoint, RLine]
  protected declare __prop: RLinePerpendicularProp

  constructor(dependencies: [RPoint, RLine], prop: RLinePerpendicularProp, style?: SVGAttributes<ReactSVGElement>) {
    super(dependencies, prop, style, RLinePerpendicular.REL_TYPE)
  }

  protected preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const lResolved = this.__dependencies[1].resolve()
    const theta = this.__prop.reverse ? Theta.fromCoord(lResolved.coord2, lResolved.coord1) : Theta.fromCoord(lResolved.coord1, lResolved.coord2)
    const phi = theta.add(Theta.py())
    const coord2 = aResolved.coord.addPolar(new CoordPolar(this.__prop.length || LARGE_NUMBER, phi))

    return {
      coord1: aResolved.coord,
      coord2,
      extend1: !!(this.__prop.extend1),
      extend2: !(this.__prop.length),
    }
  }
}

export { RLinePerpendicularProp, RLinePerpendicular }
