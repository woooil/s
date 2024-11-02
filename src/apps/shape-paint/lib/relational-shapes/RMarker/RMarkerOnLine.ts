import { checkDependenciesInitError } from '../Error'
import { Coord } from '../Coord'
import { Theta } from '../Theta'
import { RMarkerProp, RMarkerStyle, RMarker } from './RMarker'
import { RLine } from '../RLine'

interface RMarkerOnLineProp extends RMarkerProp {
  r?: number
  reverse?: boolean
}

class RMarkerOnLine extends RMarker {
  public static TYPEL2 = 'RMarkerOnLine'
  protected declare __dependencies: RLine[]
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
}

export { RMarkerOnLineProp, RMarkerOnLine }