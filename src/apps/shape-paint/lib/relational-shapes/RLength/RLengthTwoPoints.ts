import { RLength } from './RLength'
import { RPoint } from '../RPoint'

/**
 * Represents length marker by its two endpoints.
 * @hierarchy RShape <- RLength <- RLengthTwoPoints
 */
class RLengthTwoPoints extends RLength {
  public static REL_TYPE = 'RLengthTwoPoints'
  protected declare __dependencies: [RPoint, RPoint]

  constructor(dependencies: [RPoint, RPoint], _: any) {
    super(dependencies, {}, RLengthTwoPoints.REL_TYPE)
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
    }
  }
}

export { RLengthTwoPoints }