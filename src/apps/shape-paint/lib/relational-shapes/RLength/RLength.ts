import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RLength. Defined by two endpoints and which side this RLength should lay.
 * @prop a  - Coord at which this RLength starts.
 * @prop b  - Coord at which this RLength ends.
 * @prop ny - True if this RLength should lay on -y direction when rotated to be aligned to +x direction. False if this RLength should lay on +y direction.
 */
interface RLengthResolved extends RShapeResolved {
  a: Coord,
  b: Coord,
  r: number,
  ny?: boolean,
}

/**
 * The properties of RPoint.
 * @prop ny - True if this RLength should lay on -y direction when rotated to be aligned to +x direction. False if this RLength should lay on +y direction.
 */
interface RLengthProp extends RShapeProp {
  ny?: boolean
}

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
   * Resolves this RLength into RLengthResolved without calculated r.
   */
  protected abstract preresolve(): RLengthResolved

  /**
   * Resolves this RLength into RLengthResolved with calculated r.
   */
  public resolve(): RLengthResolved {
    const preresolved = this.preresolve()
    const length = Coord.distance(preresolved.a, preresolved.b)
    const maxR = 28
    const co = 4
    const r = length > maxR * co ? maxR : length / co
    preresolved.r = r
    return preresolved
  }
}

export { RLengthResolved, RLengthProp, RLengthStyle, RLength }