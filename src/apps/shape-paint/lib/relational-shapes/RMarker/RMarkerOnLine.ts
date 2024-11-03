import { NotEqualError } from '../Error'
import { Theta, ThetaMinimum } from '../Theta'
import { sim } from '../tools'
import { RMarkerProp, RMarkerStyle, RMarker } from './RMarker'
import { RLine } from '../RLine'
import { RShape } from '../RShape'

/**
 * The properties of RMarkerOnLine.
 * @prop r  - The ratio of the internal division which this RMarkerOnLine makes. Uses 0.5 if not provided.
 * @prop reverse  - Reverses the direction of this RMarkerOnLine if true.
 */
interface RMarkerOnLineProp extends RMarkerProp {
  r?: number
  reverse?: boolean
}

/**
 * Represents markers on lines.
 * @hierarchy RShape <- RMarker <- RMarkerOnLine
 */
class RMarkerOnLine extends RMarker {
  public static TYPEL2 = 'RMarkerOnLine'

  /**
   * The dependencies for the dual. If exists, indicates the dual RMarkerOnLine to this RMarker.
   */
  protected __dependenciesDual: RMarkerOnLine | undefined
  public get dependencies(): RShape[] {
    if (this.__dependenciesDual) return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RMarkerOnLineProp

  constructor(dependencies: [RLine], prop: RMarkerOnLineProp, style?: RMarkerStyle) {
    super(dependencies, prop, style, RMarkerOnLine.TYPEL2)
  }

  /**
   * Calculates the coord and the direction.
   */
  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const r = this.__prop.r || 0.5
    const coord = resolved.a.divideInternal(resolved.b, r)
    const theta = this.__prop.reverse ? Theta.fromCoord(resolved.b, resolved.a) :  Theta.fromCoord(resolved.a, resolved.b)

    return {
      coord,
      theta,
      marker: this.__prop.marker
    }
  }

  /**
   * Makes this RMarkerOnLine represents a parallel line to another which is represented by another RMarkerOnLine.
   * @param rmarker - The RMarkerOnLine parallel to this RMarkerOnLine.
   * @param marker  - The marker.
   * @throws Throws an Error if the lines two RMarkerOnLine represents are not actually parallel.
   */
  public parallel(rmarker: RMarkerOnLine, marker: string) {
    const lResolved = this.__dependencies[0].resolve()
    const mResolved = rmarker.__dependencies[0].resolve()
    const lTheta = Theta.fromCoord(lResolved.a, lResolved.b)
    const mTheta = Theta.fromCoord(mResolved.a, mResolved.b)
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