import { RPointProp, RPointStyle, RPoint } from './RPoint'

/**
 * The properties of RPointInternalDivison.
 * @prop ratio - The division ratio.
 */
interface RPointInternalDivisionProp extends RPointProp {
  ratio: number
}

/**
 * Represents points as internal divisions of two points.
 * @hierarchy RShape <- RPoint <- RPointInternalDivision
 */
class RPointInternalDivision extends RPoint {
  public static TYPEL2 = 'RPointInternalDivision'
  protected declare __dependencies: [RPoint, RPoint]
  protected declare __prop: RPointInternalDivisionProp

  constructor(dependencies: [RPoint, RPoint], prop: RPointInternalDivisionProp, style?: RPointStyle) {
    super(dependencies, prop, style, RPointInternalDivision.TYPEL2)
  }

  /**
   * Calculates the internal division mathematically.
   */
  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      coord: aResolved.coord.divideInternal(bResolved.coord, this.__prop.ratio)
    }
  }
}

export { RPointInternalDivisionProp, RPointInternalDivision }
