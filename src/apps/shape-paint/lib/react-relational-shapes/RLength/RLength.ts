import { ReactSVGElement, SVGAttributes } from 'react'
import { Coord } from '../Coord'
import { RShape } from '../RShape'
import Component from './Length'

/**
 * The resolved of RLength. 
 * @prop coord1     - The Coord at which this RLength starts.
 * @prop coord2     - The Coord at which this RLength ends.
 * @prop curvature  - The curvature of this RLength.
 */
interface RLengthResolved {
  coord1: Coord,
  coord2: Coord,
  curvature: number,
}

/**
 * Represents length markers (typically, of segments).
 *
 * @example RLengthResolved {
 *   coord1: { x: 10, y: 10 };
 *   coord2: { x: 70, y: 70 };
 *   curvature: 80;
 * }
 * represents a length marker which connects (10, 10) and (70, 70), and curved with radius of 80.
 *
 * @hierarchy RShape <- RLength
 */
abstract class RLength extends RShape {
  /**
   * 'RLength'.
   */
  public static RES_TYPE = 'RLength'

  constructor(dependencies: RShape[], _: any, style: SVGAttributes<ReactSVGElement>, relType: string) {
    super(dependencies, {}, style, RLength.RES_TYPE, relType)
  }

  public component = () => {
    return Component({ resolved: this.resolve(), style: this.style, key: this.id })
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

export { RLengthResolved, RLength }
