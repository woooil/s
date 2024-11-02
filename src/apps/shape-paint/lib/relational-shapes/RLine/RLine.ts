import { Coord } from '../Coord'
import { ParallelLinesError } from '../Error'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

/**
 * The mathematical definition of RLine. Defined by two points Line passes through.
 * @prop a        - The first Coord which this RLine passes through.
 * @prop b        - The second Coord which this RLine passes through.
 * @prop extendA  - Whether to extend point A or not.
 * @prop extendB  - Whether to extend point B or not.
 */
interface RLineResolved extends RShapeResolved {
  a: Coord
  b: Coord
  extendA: boolean
  extendB: boolean
}

/**
 * The properties of RLine.
 * @prop cutA - Whether to cut extending point A by another Line.
 * @prop cutB - Whether to cut extending point B by another Line.
 */
interface RLineProp extends RShapeProp {
  cutA?: boolean
  cutB?: boolean
}

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
  protected __dependenciesCut: { a: RLine | undefined; b: RLine | undefined }
  public get dependencies(): RShape[] {
    const d = this.__dependencies
    if (this.__dependenciesCut.a) d.push(this.__dependenciesCut.a)
    if (this.__dependenciesCut.b) d.push(this.__dependenciesCut.b)
    return d
  }
  protected declare __prop: RLineProp

  constructor(dependencies: RShape[], prop: RLineProp, style: RLineStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RLine.TYPEL1, typel2])
    this.__dependenciesCut = { a: undefined, b: undefined }
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
    if (preresolved.extendA && this.__prop.cutA) {
      const pointCutA = this.intersect(this.__dependenciesCut.a)
      preresolved.a = pointCutA
      preresolved.extendA = false
    }
    if (preresolved.extendB && this.__prop.cutB) {
      const pointCutB = this.intersect(this.__dependenciesCut.b)
      preresolved.b = pointCutB
      preresolved.extendB = false
    }
    return preresolved
  }

  /**
   * Cuts this RLine with the given RLine.
   * If this RLine has been already cut, it will change the cutting line.
   * @param rline    - RLine which cut.
   * @param selectA - True if cut extending point A; false if cut extending point B.
   */
  public cut(rline: RLine, selectA: boolean) {
    if (selectA) {
      this.__dependenciesCut.a = rline
      this.__prop.cutA = true
    } else if (!selectA) {
      this.__dependenciesCut.b = rline
      this.__prop.cutB = true
    }
  }

  /**
   * Uncuts this RLine.
   * If this RLine has not been cut, it will have no effect.
   * @param selectA - True if uncut extending point A; false if uncut extending point B.
   */
  public uncut(selectA: boolean) {
    if (selectA) {
      this.__dependenciesCut.a = undefined
      this.__prop.cutA = false
    } else if (!selectA) {
      this.__dependenciesCut.b = undefined
      this.__prop.cutB = false
    }
  }

  /**
   * Returns an intersection with another RLine.
   * @throws Throws an Error if two RLines are parallel.
   */
  public intersect(rline: RLine): Coord {
    const lResolved = this.preresolve()
    const mResolved = rline.preresolve()

    const alpha1 = lResolved.a.x - lResolved.b.x
    const alpha2 = mResolved.a.x - mResolved.b.x
    const alpha3 = mResolved.a.x - lResolved.a.x
    const beta1 = lResolved.a.y - lResolved.b.y
    const beta2 = mResolved.a.y - mResolved.b.y
    const beta3 = mResolved.a.y - lResolved.a.y
    const gamma1 = -alpha1 + alpha2 * (beta1 / (beta2 || 1)) // div by 0 if m || x-axis
    const gamma2 = alpha3 - alpha2 * (beta3 / (beta2 || 1)) // div by 0 if m || x-axis

    let a: Coord

    if (beta2 === 0 && beta1 !== 0) {
      // m || x-axis
      a = new Coord(
        lResolved.a.x + alpha1 * (beta3 / beta1),
        lResolved.a.y + beta3,
      )
    } else if ((beta2 === 0 && beta1 === 0) || gamma1 === 0) {
      // m || l
      throw ParallelLinesError(this.id, rline.id)
    } else {
      a = new Coord(
        lResolved.a.x - alpha1 * (gamma2 / gamma1), // div by 0 if l || m
        lResolved.a.y - beta1 * (gamma2 / gamma1), // div by 0 if l || m
      )
    }

    return a
  }
}

export { RLineResolved, RLineProp, RLineStyle, RLine }
