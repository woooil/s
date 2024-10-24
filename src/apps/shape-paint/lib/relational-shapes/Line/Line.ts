import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, Shape } from '../Shape'

/**
 * The mathematical definition of Line. Defined by two points Line passes through.
 * @prop a        - One Coord which this Line passes through.
 * @prop b        - Another Coord which this Line passes through.
 * @prop extendA  - Whether to extend point A or not.
 * @prop extendB  - Whether to extend point B or not.
 */
interface LineResolved extends ShapeResolved {
  a: Coord
  b: Coord
  extendA: boolean
  extendB: boolean
}

/**
 * The properties of Line.
 * @prop cutA - Whether to cut extending point A by another Line.
 * @prop cutB - Whether to cut extending point B by another Line.
 */
interface LineProp extends ShapeProp {
  cutA?: boolean
  cutB?: boolean
}

/**
 * Represents lines.
 * @hierarchy Shape <- Line
 */
abstract class Line extends Shape {
  /**
   * 'Line'.
   */
  public static TYPE: string = 'Line'

  /**
   * The dependencies for the cut.
   * @prop a  - Line which cuts the extending point A of this Line. undefined if not cut.
   * @prop b  - Line which cuts the extending point B of this Line. undefined if not cut.
   */
  protected __dependenciesCut: { a: Line | undefined; b: Line | undefined }
  public get dependencies(): Shape[] {
    const d = this.__dependencies
    if (this.__dependenciesCut.a) d.push(this.__dependenciesCut.a)
    if (this.__dependenciesCut.b) d.push(this.__dependenciesCut.b)
    return d
  }
  protected declare __prop: LineProp

  constructor(dependencies: Shape[], prop: LineProp) {
    super(dependencies, prop, 'Line')
    this.__dependenciesCut = { a: undefined, b: undefined }
  }

  /**
   * Resolves this Line to LineResolved without the cut.
   */
  protected abstract preresolve(): LineResolved

  /**
   * Resolves this Line to LineResolved with the cut.
   */
  public resolve(): LineResolved {
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
   * Cuts this Line with the given Line.
   * If this Line has been already cut, it will change the cutting line.
   * @param line    - Line which cut.
   * @param selectA - True if cut extending point A; false if cut extending point B.
   */
  public cut(line: Line, selectA: boolean) {
    if (selectA) {
      this.__dependenciesCut.a = line
      this.__prop.cutA = true
    } else if (!selectA) {
      this.__dependenciesCut.b = line
      this.__prop.cutB = true
    }
  }

  /**
   * Uncuts this Line.
   * If this Line has not been cut, it will have no effect.
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
   * Returns an intersection with another Line.
   * @throws Throws an Error if two Lines are parallel.
   */
  public intersect(line: Line) {
    const lResolved = this.preresolve()
    const mResolved = line.preresolve()

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
      a = {
        x: lResolved.a.x + alpha1 * (beta3 / beta1),
        y: lResolved.a.y + beta3,
      }
    } else if ((beta2 === 0 && beta1 === 0) || gamma1 === 0) {
      // m || l
      throw new Error('Parallel lines given')
    } else {
      a = {
        x: lResolved.a.x - alpha1 * (gamma2 / gamma1), // div by 0 if l || m
        y: lResolved.a.y - beta1 * (gamma2 / gamma1), // div by 0 if l || m
      }
    }

    return a
  }
}

export { LineResolved, LineProp, Line }
