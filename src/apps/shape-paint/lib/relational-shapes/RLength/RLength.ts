import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RLength. Defined by two endpoints and which side this RLength should lay.
 * @prop coord1     - Coord at which this RLength starts.
 * @prop coord2     - Coord at which this RLength ends.
 * @prop curvature  - The curvature of this RLength.
 * @prop reverse    - True if this RLength should lay on -y direction when rotated to be aligned to +x direction. False if this RLength should lay on +y direction.
 */
interface RLengthResolved extends RShapeResolved {
  coord1: Coord,
  coord2: Coord,
  curvature: number,
  reverse?: boolean,
}

/**
 * The properties of RPoint.
 * @prop reverse - True if this RLength should lay on -y direction when rotated to be aligned to +x direction. False if this RLength should lay on +y direction.
 */
interface RLengthProp extends RShapeProp {
  reverse?: boolean
}

/**
 * The style of RLength.
 */
interface RLengthStyle extends RShapeStyle {}

/**
 * Represents length markers (of segments, typically.)
 * @hierarchy RShape <- RLength
 */
abstract class RLength extends RShape {
  /**
   * 'RLength'.
   */
  public static TYPEL1 = 'RLength'

  constructor(dependencies: RShape[], prop: RLengthProp, style: RLengthStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RLength.TYPEL1, typel2])
  }

  /**
   * Resolves this RLength into RLengthResolved without calculated curvature.
   */
  protected abstract preresolve(): RLengthResolved

  /**
   * Resolves this RLength into RLengthResolved with calculated curvature.
   */
  public resolve(): RLengthResolved {
    const preresolved = this.preresolve()
    const length = preresolved.coord1.distance(preresolved.coord2)
    const maxR = 28
    const co = 4
    const r = length > maxR * co ? maxR : length / co
    preresolved.curvature = r
    return preresolved
  }
}

export { RLengthResolved, RLengthProp, RLengthStyle, RLength }