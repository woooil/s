import { ParallelLinesError, DefaultCaseError } from '../Error'
import { sim } from '../tools'
import { Coord, CoordPolar } from '../Coord'
import { Theta, ThetaMinimum } from '../Theta'
import { RShape } from '../RShape'

/**
 * The resolved of RLine.
 * RLine is a line if both extend1 and extend2 are true; a segment if both are false; a ray if only one of them is true.
 * @prop coord1   - The first Coord at which this RLine starts.
 * @prop coord2   - The second Coord at which this RLine ends.
 * @prop extend1  - Extends this RLine backwards over coord1 if true.
 * @prop extend2  - Extends this RLine forwards over coord2 if true.
 */
interface RLineResolved {
  coord1: Coord
  coord2: Coord
  extend1: boolean
  extend2: boolean
}

/**
 * The properties of RLine.
 * @prop cut1 - Cuts coord1 by another RLine if true.
 * @prop cut2 - Cuts coord2 by another RLine if true.
 */
interface RLineProp {
  cut1?: boolean
  cut2?: boolean
}

/**
 * The type to determine a specific Coord on RLine.
 * @prop type   - How to use the value: value is a (signed) distance from coord1 if 'coord1'; value is a (signed) distance from coord2 if 'coord2'; value is a ratio of internal division if 'ratio'; value is the x coordinate if 'x'; value is the y coordinate if 'y'
 * @prop value  - The value which determines the Coord on RLine.
 *
 * @example {
 *   type: 'coord1';
 *   value: 10;
 * }
 * represents a Coord which is on RLine, distant by 10 from its coord1 along RLine. 
 */
type CoordOnLine = {
  type: 'coord1' | 'coord2' | 'ratio' | 'x' | 'y'
  value: number
}

/**
 * Represents directional lines including segments and rays.
 *
 * @example RLineResolved {
 *   coord1: { x: 10, y: 20 };
 *   coord2: { x: 30, y: 40 };
 *   extend1: false;
 *   extend2: true;
 * }
 * represents a line which starts at (10, 20) and extends infinitely through (30, 40).
 *
 * @hierarchy RShape <- RLine
 */
abstract class RLine extends RShape {
  public static RES_TYPE = 'RLine'

  /**
   * The dependencies for the cut.
   * @prop coord1 - RLine which cuts coord1, if exists.
   * @prop coord2 - RLine which cuts coord2, if exists.
   */
  protected __dependenciesCut: { coord1: RLine | undefined; coord2: RLine | undefined }
  public get dependencies(): RShape[] {
    const d = this.__dependencies
    if (this.__dependenciesCut.coord1) d.push(this.__dependenciesCut.coord1)
    if (this.__dependenciesCut.coord2) d.push(this.__dependenciesCut.coord2)
    return d
  }
  protected declare __prop: RLineProp

  constructor(dependencies: RShape[], prop: RLineProp, relType: string) {
    super(dependencies, prop, RLine.RES_TYPE, relType)
    this.__dependenciesCut = { coord1: undefined, coord2: undefined }
  }

  /**
   * Resolves this RLine to RLineResolved without the cut.
   */
  protected abstract preresolve(): RLineResolved

  /**
   * Resolves this RLine to RLineResolved with the cut.
   */
  public resolve(): RLineResolved {
    const preresolved = this.preresolve()
    if (preresolved.extend1 && this.__prop.cut1) {
      const { coord: pointCutA } = RLine.intersect(this, this.__dependenciesCut.coord1)
      preresolved.coord1 = pointCutA
      preresolved.extend1 = false
    }
    if (preresolved.extend2 && this.__prop.cut2) {
      const { coord: pointCutB } = RLine.intersect(this, this.__dependenciesCut.coord2)
      preresolved.coord2 = pointCutB
      preresolved.extend2 = false
    }
    return preresolved
  }

  /**
   * Cuts this RLine with the given RLine.
   * @param rline   - RLine which cuts this RLine.
   * @param select1 - Cuts coord1 if true; cuts coord2 if false.
   */
  public cut(rline: RLine, select1: boolean) {
    if (select1) {
      this.__dependenciesCut.coord1 = rline
      this.__prop.cut1 = true
    } else {
      this.__dependenciesCut.coord2 = rline
      this.__prop.cut2 = true
    }
  }

  /**
   * Uncuts this RLine. If this RLine has not been cut, it will have no effect.
   * @param select1 - Uncuts coord1 if true; uncuts coord if false.
   */
  public uncut(select1: boolean) {
    if (select1) {
      this.__dependenciesCut.coord1 = undefined
      this.__prop.cut1 = false
    } else {
      this.__dependenciesCut.coord2 = undefined
      this.__prop.cut2 = false
    }
  }

  /**
   * Calculates a Coord on this RLine.
   * @params onLine - The CoordOnLine on this RLine.
   */
  public coordOnLine(onLine: CoordOnLine): Coord {
    const resolved = this.resolve()
    const theta = Theta.fromCoord(resolved.coord1, resolved.coord2)
    let coord: Coord
    const m = (resolved.coord2.y - resolved.coord1.y) / (resolved.coord2.x - resolved.coord1.x)
    switch (onLine.type) {
      case 'coord1':
        coord = resolved.coord1.addPolar(new CoordPolar(onLine.value, theta))
        break
      case 'coord2':
        coord = resolved.coord2.addPolar(new CoordPolar(onLine.value, theta))
        break
      case 'ratio':
        coord = resolved.coord1.divideInternal(resolved.coord2, onLine.value)
        break
      case 'x':
        if (sim(resolved.coord1.x, resolved.coord2.x))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'y-axis')
        const y = resolved.coord1.y + (onLine.value - resolved.coord1.x) * m
        coord = new Coord(onLine.value, y)
        break
      case 'y':
        if (sim(resolved.coord1.y, resolved.coord2.y))
          throw ParallelLinesError(`RLine ${this.__dependencies[0].id}`, 'x-axis')
        const x = resolved.coord1.x + (onLine.value - resolved.coord1.y) / m
        coord = new Coord(x, onLine.value)
        break
      default:
        throw DefaultCaseError(onLine.type)
    }

    return coord
  }

  /**
   * Calculates the intersection with another RLine.
   * @return  coord     - The intersection.
   * @return  theta     - The (directional) angular measure.
   * @return  theta0    - The start orientation.
   * @return  thetaMid  - The middle orientation.
   * @throws  Throws a ParallelLinesError if two RLines are parallel.
   */
  public static intersect(lineL: RLine, lineM: RLine, reverseL?: boolean, reverseM?: boolean): { coord: Coord, theta0: ThetaMinimum, theta: ThetaMinimum, thetaMid: ThetaMinimum } {
    const lResolved = lineL.preresolve()
    const mResolved = lineM.preresolve()

    const alpha1 = lResolved.coord1.x - lResolved.coord2.x
    const alpha2 = mResolved.coord1.x - mResolved.coord2.x
    const alpha3 = mResolved.coord1.x - lResolved.coord1.x
    const beta1 = lResolved.coord1.y - lResolved.coord2.y
    const beta2 = mResolved.coord1.y - mResolved.coord2.y
    const beta3 = mResolved.coord1.y - lResolved.coord1.y
    const gamma1 = -alpha1 + alpha2 * (beta1 / (beta2 || 1)) // div by 0 if m || x-axis
    const gamma2 = alpha3 - alpha2 * (beta3 / (beta2 || 1)) // div by 0 if m || x-axis

    let a: Coord

    if (beta2 === 0 && beta1 !== 0) {
      // m || x-axis
      a = new Coord(
        lResolved.coord1.x + alpha1 * (beta3 / beta1),
        lResolved.coord1.y + beta3,
      )
    } else if ((beta2 === 0 && beta1 === 0) || gamma1 === 0) {
      // m || l
      throw ParallelLinesError(`RLine ${lineL.id}`, `RLine ${lineM.id}`)
    } else {
      a = new Coord(
        lResolved.coord1.x - alpha1 * (gamma2 / gamma1), // div by 0 if l || m
        lResolved.coord1.y - beta1 * (gamma2 / gamma1), // div by 0 if l || m
      )
    }

    const theta1 = reverseL ? Theta.fromCoord(lResolved.coord2, lResolved.coord1) : Theta.fromCoord(lResolved.coord1, lResolved.coord2)
    const theta2 = reverseM ? Theta.fromCoord(mResolved.coord2, mResolved.coord1) : Theta.fromCoord(mResolved.coord1, mResolved.coord2)
    const thetaSub = theta2.substract(theta1)
    let theta = new ThetaMinimum(thetaSub.t)
    let thetaMid = new ThetaMinimum((theta1.t + theta2.t) / 2)
    if (thetaSub.size > Math.PI) {
      thetaMid = thetaMid.substract(Theta.pi())
      theta = theta.substract(Theta.pi())
    }
    return { 
      coord: a,
      theta: theta,
      theta0: theta1,
      thetaMid: thetaMid
    }
  }
}

export { RLineResolved, RLineProp, RLine, CoordOnLine }
