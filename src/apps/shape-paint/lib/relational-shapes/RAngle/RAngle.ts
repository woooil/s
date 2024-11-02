import { NotEqualError } from '../Error'
import { Coord } from '../Coord'
import { sim } from '../tools'
import { Theta, ThetaMinimum } from '../Theta'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RAngle.
 * @prop coord  - The coordinates of the vertex.
 * @prop theta0 - The start direction in ThetaMinimum.
 * @prop theta  - The (directional) angular measure in Theta. 
 * @prop marker - The marker representing this RAngle.
 */
interface RAngleResolved extends RShapeResolved {
  coord: Coord
  theta0: ThetaMinimum
  theta: Theta
  marker?: string
}

/**
 * The properties of RAngle.
 * @prop marker     - The marker representing this RAngle.
 * @prop congruent  - True if this is congruent to another RAngle.
 */
interface RAngleProp extends RShapeProp {
  marker?: string
  dual?: boolean
}

/**
 * The style of RAngle
 */
interface RAngleStyle extends RShapeStyle {}

/**
 * Represents angle markers.
 * @hierarchy RShape <- RLength
 */
abstract class RAngle extends RShape {
  /**
   * 'RAngle'
   */
  public static TYPEL1 = 'RAngle'

  /**
   * The dependencies for the congruent. If exists, indicates the congruent RAngle to this RAngle.
   */
  protected __dependenciesDual: RAngle | undefined
  public get dependencies(): RShape[] {
    if (this.__dependenciesDual) return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RAngleProp

  constructor(dependencies: RShape[], prop: RAngleProp, style: RAngleStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RAngle.TYPEL1, typel2])
  }

  /**
   * Resolves this RAngle to RAngleResolved.
   */
  public abstract resolve(): RAngleResolved

  /**
   * Makes this RAngle congruent to another.
   * @param rangle  - The RAngle congruent to this RAngle.
   * @param marker  - The marker representing the congruent RAngles.
   * @throws Throws an Error if two RAngles are not actually congruent.
   */
  public congruent(rangle: RAngle, marker: string) {
    const theta1 = this.resolve().theta.size
    const theta2 = rangle.resolve().theta.size
    if (sim(theta1, theta2)) {
      this.__dependenciesDual = rangle
      this.__prop.marker = marker
      this.__prop.dual = true
      rangle.__dependenciesDual = this
      rangle.__prop.marker = marker
      rangle.__prop.dual = true
    } else {
      throw NotEqualError(`RAngle ${this.id}`,`RAngle ${rangle.id}`)
    }
  }
}

export { RAngleResolved, RAngleProp, RAngleStyle, RAngle }