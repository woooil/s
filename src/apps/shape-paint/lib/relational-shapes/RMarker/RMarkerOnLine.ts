import { checkDependenciesInitError, NotEqualError } from '../Error'
import { Coord } from '../Coord'
import { Theta, ThetaMinimum } from '../Theta'
import { sim } from '../tools'
import { RMarkerProp, RMarkerStyle, RMarker } from './RMarker'
import { RLine } from '../RLine'

interface RMarkerOnLineProp extends RMarkerProp {
  r?: number
  reverse?: boolean
  dual?: boolean
}

class RMarkerOnLine extends RMarker {
  public static TYPEL2 = 'RMarkerOnLine'
  protected __dependenciesDual: RLine | undefined
  public get dependencies(): RShape[] {
    if (this.__dependenciesDual) return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RMarkerOnLineProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of RLine type or its length is not 1.
   */
  constructor(dependencies: RLine[], prop: RMarkerOnLineProp, style?: RMarkerStyle) {
    checkDependenciesInitError(dependencies, [RLine.TYPEL1])
    super(dependencies, prop, style, RMarkerOnLine.TYPEL2)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const r = this.__prop.r || 0.5
    const coord = Coord.add(Coord.scale(resolved.a, 1 - r), Coord.scale(resolved.b, r))
    const theta = this.__prop.reverse ? Theta.fromCoord(resolved.b, resolved.a) :  Theta.fromCoord(resolved.a, resolved.b)

    return {
      coord,
      theta,
      marker: this.__prop.marker
    }
  }

  public parallel(rmarker: RMarkerOnLine, marker: string) {
    const lResolved = this.__dependencies[0].resolve()
    const mResolved = rmarker.__dependencies[0].resolve()
    const lTheta = Theta.fromCoord(lResolved.a, lResolved.b)
    const mTheta = Theta.fromCoord(mResolved.a, mResolved.b)
    if (sim(lTheta.t, mTheta.t) || sim(lTheta.t, ThetaMinimum.add(mTheta, Theta.nx()).t)) {
      this.__dependenciesDual = rmarker
      this.__prop.marker = marker
      this.__prop.dual = true
      rmarker.__dependenciesDual = this
      rmarker.__prop.marker = marker
      rmarker.__prop.dual = true
    } else {
      throw NotEqualError(`the direction of ${this.id}`, `the direction of ${rmarker.id}`)
    }
  }
}

export { RMarkerOnLineProp, RMarkerOnLine }