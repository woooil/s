import { ReactSVGElement, SVGAttributes } from 'react'
import { Coord } from '../Coord'
import { RShape } from '../RShape'
import Component from './Polygon'

/**
 * The resolved of RPolygon.
 * @prop coords - The coordinates of its vertices. 
 */
interface RPolygonResolved {
  coords: Coord[]
}

/**
 * Represents polygons.
 *
 * @example RPolygonResolved {
 *   coords: [{ x: 10, y: 10 }, { x: 20, y: 20 }, { x: 30, y: 20 }];
 * }
 * represents a triangle whose vertices are (10, 10), (20, 20) and (30, 20).
 *
 * @hierarchy RShape <- RPolygon
 */
abstract class RPolygon extends RShape {
  public static RES_TYPE = 'RPolygon'

  constructor(dependencies: RShape[], prop: any, style: SVGAttributes<ReactSVGElement>, relType: string) {
    super(dependencies, prop, style, RPolygon.RES_TYPE, relType)
  }

  public component = () => {
    return Component({ resolved: this.resolve(), style: this.style, key: this.id })
  }

  public abstract resolve(): RPolygonResolved
}

export { RPolygonResolved, RPolygon }
