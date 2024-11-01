import { Coord } from '../Tools'
import { NotEqualError } from '../Error'
import { RShapeResolved, RShapeProp, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RAngle.
 * @prop x      - The x coordinate of the vertex.
 * @prop y      - The y coordniate of the vertex.
 * @prop theta0 - The start direction.
 * @prop theta  - The (directional) angular measure. 
 * @prop marker - The marker representing this RAngle.
 */
interface RAngleResolved extends RShapeResolved, Coord {
  theta0: number
  theta: number
  marker: string
}

/**
 * The properties of RAngle.
 * @prop marker     - The marker representing this RAngle.
 * @prop congruent  - True if this is congruent to another RAngle.
 */
interface RAngleProp extends RShapeProp {
  marker?: string
  congruent?: boolean
}

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
  protected __dependenciesCongruent: RAngle | undefined
  public get dependencies(): RShape[] {
    if (this.__dependenciesCongruent) return [...this.__dependencies, this.__dependenciesCongruent]
    return this.__dependencies
  }
  protected declare __prop: RAngleProp

  constructor(dependencies: RShape[], prop: RAngleProp, typel2: RShapeTypeL2) {
    super(dependencies, prop, [RAngle.TYPEL1, typel2])
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
    const sim = (a: number, b: number) => {
      const err = 1E-5
      return Math.abs(a - b) < err
    }
    const theta1 = Math.abs(this.resolve().theta)
    const theta2 = Math.abs(rangle.resolve().theta)
    if (sim(theta1, theta2)) {
      this.__dependenciesCongruent = rangle
      this.__prop.marker = marker
      this.__prop.congruent = true
      rangle.__dependenciesCongruent = this
      rangle.__prop.marker = marker
      rangle.__prop.congruent = true
    } else {
      throw NotEqualError(`RAngle ${this.id}`,`RAngle ${rangle.id}`)
    }
  }
}

export { RAngleResolved, RAngleProp, RAngle }