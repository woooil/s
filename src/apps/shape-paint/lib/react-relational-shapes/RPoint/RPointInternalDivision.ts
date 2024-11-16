import { RPoint, RPointResolvedProp } from './RPoint'

/**
 * The properties of RPointInternalDivison.
 * @prop ratio - The division ratio of the two depended RPoints.
 * @extends RPointResolvedProp
 */
interface RPointInternalDivisionProp extends RPointResolvedProp {
  ratio: number
}

/**
 * Represents points as the internal division of two RPoints.
 *
 * @example RPointInternalDivision {
 *   dependencies: [RPoint1, RPoint2];
 *   prop: { ratio: 0.2 };
 * }
 * represents the internal division point of RPoint1 and RPoint2 with the division ratio of 0.2.
 *
 * @hierarchy RShape <- RPoint <- RPointInternalDivision
 */
class RPointInternalDivision extends RPoint {
  public static REL_TYPE = 'RPointInternalDivision'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RPointInternalDivisionProp

  constructor(dependencies: [RPoint, RPoint], prop: RPointInternalDivisionProp) {
    super(dependencies, prop, RPointInternalDivision.REL_TYPE)
  }

  public resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      ...this.__prop,
      coord: aResolved.coord.divideInternal(bResolved.coord, this.__prop.ratio),
    }
  }
}

export { RPointInternalDivisionProp, RPointInternalDivision }
