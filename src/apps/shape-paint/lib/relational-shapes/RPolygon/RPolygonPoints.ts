import { Coord } from '../Coord'
import { RPolygonProp, RPolygonStyle, RPolygon } from './RPolygon'
import { RPoint } from '../RPoint'

/**
 * The properties of RPolygonPoints.
 */
interface RPolygonPointsProp extends RPolygonProp {}

/**
 * Represents polygons by its vertices.
 * @hierarchy RShape <- RPolygon <- RPolygonPoints
 */
class RPolygonPoints extends RPolygon {
  public static TYPEL2 = 'RPolygonPoints'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RPolygonPointsProp

  constructor(dependencies: RPoint[], prop: RPolygonPointsProp, style?: RPolygonStyle) {
    super(dependencies, prop, style, RPolygonPoints.TYPEL2)
  }

  /**
   * Resolves each vertex.
   */
  resolve() {
    const coords = this.__dependencies.map(i => i.resolve().coord)
    return {
      coords
    }
  }
}

export { RPolygonPointsProp, RPolygonPoints }