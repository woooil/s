import { SVGAttributes } from 'react'
import { NotEqualError } from '../Error'
import { Coord } from '../Coord'
import { sim } from '../tools'
import { Theta, ThetaMinimum } from '../Theta'
import { RShape } from '../RShape'
import Component from './Angle'

/**
 * The resolved of RAngle.
 * @prop coord  - The coordinates of the vertex.
 * @prop theta0 - The start orientation.
 * @prop theta  - The (directional) angular measure.
 * @prop marker - The marker representing this RAngle.
 */
interface RAngleResolved {
  coord: Coord
  theta0: ThetaMinimum
  theta: Theta
  marker?: string
}

/**
 * The properties of RAngle.
 * @prop marker - The marker representing this RAngle.
 * @prop dual   - Congurent to another RAngle if true.
 */
interface RAngleProp {
  marker?: string
  dual?: boolean
}

/**
 * Represents angle markers.
 *
 * @example RAngleResolved {
 *   coord: { x: 10, 10 };
 *   theta0: { t: 0 };
 *   theta: { t: Math.PI / 2};
 * }
 * represents a right angle at (10, 10) which starts at 0 rad and ends at PI / 2 rad.
 *
 * @hierarchy RShape <- RAngle
 */
abstract class RAngle extends RShape<SVGGeometryElement> {
  public static RES_TYPE = 'RAngle'
  protected __Component = Component

  /**
   * The dependencies for the congruent. If exists, this indicates the congruent RAngle to this RAngle.
   */
  protected __dependenciesDual: RAngle | undefined
  public get dependencies(): RShape<any>[] {
    if (this.__dependenciesDual)
      return [...this.__dependencies, this.__dependenciesDual]
    return this.__dependencies
  }
  protected declare __prop: RAngleProp

  constructor(
    dependencies: RShape<any>[],
    prop: RAngleProp,
    style: SVGAttributes<SVGGeometryElement>,
    relType: string,
  ) {
    super(dependencies, prop, style, RAngle.RES_TYPE, relType)
  }

  public abstract resolve(): RAngleResolved

  /**
   * Makes this RAngle right.
   * @throws Throws a NotEqualError if this RAngle does not have size of pi radian.
   */
  public right() {
    const theta = this.resolve().theta.size
    if (sim(theta, Math.PI / 2)) {
      this.__prop.marker = 'right'
    } else {
      throw NotEqualError(`RAngle ${this.id}`, `pi rad`)
    }
  }

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
      throw NotEqualError(`RAngle ${this.id}`, `RAngle ${rangle.id}`)
    }
  }
}

export { RAngleResolved, RAngleProp, RAngle }
