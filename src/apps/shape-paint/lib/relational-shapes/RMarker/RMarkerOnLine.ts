import { NotEqualError } from '../Error'
import { Theta } from '../Theta'
import { sim } from '../tools'
import { RMarkerProp, RMarker } from './RMarker'
import { RLine, CoordOnLine } from '../RLine'
import { RShape } from '../RShape'

/**
 * The properties of RMarkerOnLine which extends RMarkerProp.
 * @prop onLine   - The CoordOnLine on the depended RLine.
 * @prop reverse  - Reverses the direction of the depended RLine if true.
 */
interface RMarkerOnLineProp extends RMarkerProp {
  onLine: CoordOnLine
  reverse?: boolean
}

/**
 * Represents markers on RLine.
 *
 * @example RMarkerOnLine {
 *   dependencies: [RLine1];
 *   prop: { marker: '|', onLine: { type: 'coord1', value: 10 } };
 * }
 * represents a marker '|' which is distant by 10 from coord1 of RLine1 and oriented along RLine1.
 *
 * @hierarchy RShape <- RMarker <- RMarkerOnLine
 */
class RMarkerOnLine extends RMarker {
  public static REL_TYPE = 'RMarkerOnLine'

  /**
   * The dependencies for the dual. If exists, this indicates the dual RMarkerOnLine to this RMarker.
   */
  protected __dependenciesDual: RMarkerOnLine | undefined
  protected declare __dependencies: [RLine]
  public get dependencies(): RShape[] {
    if (this.__dependenciesDual) return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RMarkerOnLineProp

  constructor(dependencies: [RLine], prop: RMarkerOnLineProp) {
    super(dependencies, prop, RMarkerOnLine.REL_TYPE)
  }

  public resolve() {
    const coord = this.__dependencies[0].coordOnLine(this.__prop.onLine)
    const resolved = this.__dependencies[0].resolve()
    const theta = this.__prop.reverse ? Theta.fromCoord(resolved.coord2, resolved.coord1) :  Theta.fromCoord(resolved.coord1, resolved.coord2)

    return {
      coord,
      theta,
      marker: this.__prop.marker
    }
  }

  /**
   * Makes this RMarkerOnLine represents parallelism associated with another RMarkerOnLine.
   * @param rmarker - The RMarkerOnLine associated with this RMarkerOnLine.
   * @param marker  - The marker to represent the parallelism.
   * @throws Throws a NotEqualError if the two lines RMarkerOnLine represents are not parallel.
   */
  public parallel(rmarker: RMarkerOnLine, marker: string) {
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
      throw NotEqualError(`the direction of ${this.id}`, `the direction of ${rmarker.id}`)
    }
  }
}

export { RMarkerOnLineProp, RMarkerOnLine }