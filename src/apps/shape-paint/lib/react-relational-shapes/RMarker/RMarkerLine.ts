import { SVGAttributes } from 'react'
import { NotEqualError } from '../Error'
import { Theta } from '../Theta'
import { sim } from '../tools'
import { RMarkerProp, RMarker } from './RMarker'
import { RLine, CoordOnLine } from '../RLine'
import { RShape } from '../RShape'

/**
 * The properties of RMarkerLine which extends RMarkerProp.
 * @prop onLine   - The CoordOnLine on the depended RLine.
 * @prop reverse  - Reverses the direction of the depended RLine if true.
 */
interface RMarkerLineProp extends RMarkerProp {
  onLine: CoordOnLine
  reverse?: boolean
}

/**
 * Represents markers on RLine.
 *
 * @example RMarkerLine {
 *   dependencies: [RLine1];
 *   prop: { marker: '|', onLine: { type: 'coord1', value: 10 } };
 * }
 * represents a marker '|' which is distant by 10 from coord1 of RLine1 and oriented along RLine1.
 *
 * @hierarchy RShape <- RMarker <- RMarkerLine
 */
class RMarkerLine extends RMarker {
  public static REL_TYPE = 'RMarkerLine'

  /**
   * The dependencies for the dual. If exists, this indicates the dual RMarkerLine to this RMarker.
   */
  protected __dependenciesDual: RMarkerLine | undefined
  protected declare __dependencies: [RLine]
  public get dependencies(): RShape<any>[] {
    if (this.__dependenciesDual)
      return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RMarkerLineProp

  constructor(
    dependencies: [RLine],
    prop: RMarkerLineProp,
    style?: SVGAttributes<SVGGElement>,
  ) {
    super(dependencies, prop, style, RMarkerLine.REL_TYPE)
  }

  public resolve() {
    const coord = this.__dependencies[0].coordOnLine(this.__prop.onLine)
    const resolved = this.__dependencies[0].resolve()
    const theta = this.__prop.reverse
      ? Theta.fromCoord(resolved.coord2, resolved.coord1)
      : Theta.fromCoord(resolved.coord1, resolved.coord2)

    return {
      coord,
      theta,
      marker: this.__prop.marker,
    }
  }

  /**
   * Makes this RMarkerLine represents parallelism associated with another RMarkerLine.
   * @param rmarker - The RMarkerLine associated with this RMarkerLine.
   * @param marker  - The marker to represent the parallelism.
   * @throws Throws a NotEqualError if the two lines RMarkerLine represents are not parallel.
   */
  public parallel(rmarker: RMarkerLine, marker: string) {
    const lResolved = this.__dependencies[0].resolve()
    const mResolved = rmarker.__dependencies[0].resolve()
    const lTheta = Theta.fromCoord(lResolved.coord1, lResolved.coord2)
    const mTheta = Theta.fromCoord(mResolved.coord1, mResolved.coord2)
    if (sim(lTheta.t, mTheta.t) || sim(lTheta.t, mTheta.add(Theta.nx()).t)) {
      this.__dependenciesDual = rmarker
      this.__prop.marker = marker
      rmarker.__dependenciesDual = this
      rmarker.__prop.marker = marker
    } else {
      throw NotEqualError(
        `the direction of ${this.id}`,
        `the direction of ${rmarker.id}`,
      )
    }
  }
}

export { RMarkerLineProp, RMarkerLine }
