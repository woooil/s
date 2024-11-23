import { ReactSVGElement, SVGAttributes } from 'react'
import { Coord } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RShape } from '../RShape'
import Component from './Marker'

/**
 * The resolved of RMarker.
 * @prop coord  - The coordinates.
 * @prop theta  - The orientation.
 * @prop marker - The marker.
 */
interface RMarkerResolved {
  coord: Coord
  theta: ThetaMinimum
  marker: string
}

/**
 * The properties of RMarker.
 * @prop marker - The marker.
 */
interface RMarkerProp {
  marker: string
}

/**
 * Represents any markers at a specific position.
 *
 * @example RMarkerResolved {
 *   coord: { x: 10, y: 10 };
 *   theta: { t: 1 };
 *   marker: '|';
 * }
 * represnet a marker '|' which is located at (10, 10) and rotated by 1 rad about +x axis.
 *
 * @hierarchy RShape <- RMarker
 */
abstract class RMarker extends RShape {
  public static RES_TYPE = 'RMarker'

  constructor(dependencies: RShape[], prop: RMarkerProp, style: SVGAttributes<ReactSVGElement>, relType: string) {
    super(dependencies, prop, style, RMarker.RES_TYPE, relType)
  }

  public component = () => {
    return Component({ resolved: this.resolve(), style: this.style, key: this.id })
  }

  public abstract resolve(): RMarkerResolved
}

export { RMarkerResolved, RMarkerProp, RMarker }
