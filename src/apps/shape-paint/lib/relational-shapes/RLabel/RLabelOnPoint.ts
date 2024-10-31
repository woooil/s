import { CoordPolar, Coords } from '../Tools'
import { RLabelProp, RLabel } from './RLabel'
import { RPoint } from '../RPoint'
import { DependeciesInitError } from '../Error'

/**
 * The properties of RLabelOnPointProp
 * @prop r      - The radial coordinate relative to RPoint.
 * @prop theta  - The angular coordinate relative to RPoint.
 */
interface RLabelOnPointProp extends RLabelProp, CoordPolar {}

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
  constructor(dependencies: RPoint[], prop: RLabelOnPointProp) {
    if (
      dependencies.length !== 1 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        1,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLabelOnPoint.TYPEL2)
  }

  /**
   * Calculate absoulte coordinates.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const offsetCoord = Coords.toCartesian(this.__prop)

    return {
      ...Coords.add(aResolved, offsetCoord),
      label: this.__prop.label,
    }
  }
}

export { RLabelOnPointProp, RLabelOnPoint }
