import { RLengthProp, RLengthStyle, RLength } from './RLength'
import { RPoint } from '../RPoint'

/**
 * The properties of RLengthTwoPointsProp.
 */
interface RLengthTwoPointsProp extends RLengthProp { }

/**
 * Represents length marker by its two endpoints.
 * @hierarchy RShape <- RLength <- RLengthTwoPoints
 */
class RLengthTwoPoints extends RLength {
  public static TYPEL2 = 'RLengthTwoPoints'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RLengthTwoPointsProp

  constructor(dependencies: [RPoint, RPoint], prop: RLengthTwoPointsProp, style?: RLengthStyle) {
    super(dependencies, prop, style, RLengthTwoPoints.TYPEL2)
  }

  /**
   * Returns the coordinates of the endpoints.
   */
  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      coord1: aResolved.coord,
      coord2: bResolved.coord,
      curvature: 0,
      reverse: this.__prop.reverse,
    }
  }
}

export { RLengthTwoPointsProp, RLengthTwoPoints }