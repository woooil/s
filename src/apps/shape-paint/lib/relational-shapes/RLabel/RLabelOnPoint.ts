import { checkDependenciesInitError } from '../Error'
import { Coord, CoordPolar } from '../Coord'
import { RLabelProp, RLabelStyle, RLabel } from './RLabel'
import { RPoint } from '../RPoint'

/**
 * The properties of RLabelOnPointProp.
 * @prop offset - The polar coordinate relative to RPoint.
 */
interface RLabelOnPointProp extends RLabelProp {
  offset: CoordPolar
}

/**
 * Represents labels on points, typically representing their name.
 * @hierarchy RShape <- RLabel <- RLabelOnPoint
 */
class RLabelOnPoint extends RLabel {
  public static TYPEL2 = 'RLabelOnPoint'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLabelOnPointProp

  /**
   * @throws Throws DependenciesInitError if given Dependencies are not of Point type or its length is not 1.
   */
  constructor(dependencies: RPoint[], prop: RLabelOnPointProp, style?: RLabelStyle) {
    checkDependenciesInitError(dependencies, [RPoint.TYPEL1])
    super(dependencies, prop, style, RLabelOnPoint.TYPEL2)
  }

  /**
   * Calculate absoulte coordinates.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()

    return {
      coord: Coord.addPolar(aResolved.coord, this.__prop.offset),
      label: this.__prop.label,
    }
  }
}

export { RLabelOnPointProp, RLabelOnPoint }
