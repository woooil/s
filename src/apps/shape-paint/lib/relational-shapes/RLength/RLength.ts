import { Coord } from '../Tools'
import { RShapeResolved, RShapeProp, RShapeTypeL2, RShape } from '../RShape'

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

interface RLengthProp extends RShapeProp {
  ny?: boolean
}

abstract class RLength extends RShape {
  public static TYPEL1 = 'RLength'

  constructor(dependencies: RShape[], prop: RLengthProp, typel2: RShapeTypeL2) {
    super(dependencies, prop, [RLength.TYPEL1, typel2])
  }

  protected abstract preresolve(): RLengthResolved

  public resolve(): RLengthResolved {
    const preresolved = this.preresolve()
    const length = Math.sqrt(Math.pow(preresolved.b.y - preresolved.a.y, 2) + Math.pow(preresolved.b.x - preresolved.a.x, 2))
    const maxR = 28
    const co = 4
    const r = length > maxR * co ? maxR : length / co
    preresolved.r = r
    return preresolved
  }
}

export { RLengthResolved, RLengthProp, RLength }