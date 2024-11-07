import { Coord } from '../Coord'
import { Theta, ThetaMinimum } from '../Theta'
import { ParallelLinesError } from '../Error'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RLine. Defined by two points Line passes through.
 * @prop coord1   - The first Coord which this RLine passes through.
 * @prop coord2   - The second Coord which this RLine passes through.
 * @prop extend1  - Whether to extend coord1 or not.
 * @prop extend2  - Whether to extend coord2 or not.
 */
interface RLineResolved extends RShapeResolved {
  coord1: Coord
  coord2: Coord
  extend1: boolean
  extend2: boolean
}

/**
 * The properties of RLine.
 * @prop cut1 - Whether to cut coord1 by another Line.
 * @prop cut2 - Whether to cut coord2 by another Line.
 */
interface RLineProp extends RShapeProp {
  cut1?: boolean
  cut2?: boolean
}

/**
 * The style of RLine.
 * @prop width  - The width.
 */
interface RLineStyle extends RShapeStyle {
  width?: number
}

/**
 * Represents lines.
 * @hierarchy RShape <- RLine
 */
abstract class RLine extends RShape {
  /**
   * 'RLine'.
   */
  public static TYPEL1 = 'RLine'

  /**
   * The dependencies for the cut.
   * @prop a  - RLine which cuts the extending point A of this RLine. undefined if not cut.
   * @prop b  - RLine which cuts the extending point B of this RLine. undefined if not cut.
   */
  protected __dependenciesCut: { coord1: RLine | undefined; coord2: RLine | undefined }
  public get dependencies(): RShape[] {
    const d = this.__dependencies
    if (this.__dependenciesCut.coord1) d.push(this.__dependenciesCut.coord1)
    if (this.__dependenciesCut.coord2) d.push(this.__dependenciesCut.coord2)
    return d
  }
  protected declare __prop: RLineProp

  constructor(dependencies: RShape[], prop: RLineProp, style: RLineStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RLine.TYPEL1, typel2])
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
   * If this RLine has been already cut, it will change the cutting line.
   * @param rline    - RLine which cut.
   * @param select1 - True if cut coord1; false if cut coord2.
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
   * Uncuts this RLine.
   * If this RLine has not been cut, it will have no effect.
   * @param select1 - True if uncut coord1; false if uncut coord2.
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
   * Returns an intersection with another RLine.
   * @return  coord     - The intersection.
   * @return  theta     - The (directional) angular measure.
   * @return  theta0    - The start direction.
   * @return  thetaMid  - The middle direction.
   * @throws Throws an Error if two RLines are parallel.
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

export { RLineResolved, RLineProp, RLineStyle, RLine }
