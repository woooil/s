import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, ShapeDependenciesIndex, Shape } from '../Shape'

/**
 * The mathematical definition of Line. Defined by two points Line passes through.
 * @prop a        - One Coord which Line passes through.
 * @prop b        - Another Coord which Line passes through.
 * @prop extendA  - Whether to extend point A or not.
 * @prop extendB  - Whether to extend point B or not.
 */
interface LineResolved extends ShapeResolved {
  a: Coord
  b: Coord
  extendA: boolean,
  extendB: boolean,
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
  declare protected __prop: LineProp

  /**
   * Uses 'Line' as ShapeType and 'line' as svgTag.
   */
  constructor(dependencies: Shape[], prop: LineProp) {
    super(dependencies, prop, 'Line', 'line')
  }

  /**
   * Uses stroke of width 2, filled black. Extends points to very large numbers.
   */
  public get svgAttr() {
    const resolved = this.resolve()

    const extend = (coord: Coord, ref: Coord) => {
      return {
        x: coord.x + (coord.x - ref.x) * (2 << 10),
        y: coord.y + (coord.y - ref.y) * (2 << 10),
      }
    }

    const tempA = resolved.extendA ? extend(resolved.a, resolved.b) : resolved.a
    resolved.b = resolved.extendB ? extend(resolved.b, resolved.a) : resolved.b
    resolved.a = tempA

    return {
      x1: resolved.a.x,
      y1: resolved.a.y,
      x2: resolved.b.x,
      y2: resolved.b.y,
      stroke: 'black',
      strokeWidth: 2,
    }
  }

  /**
   * Resolves Line to LineResolved without the cut.
   */
  protected abstract preresolve(): LineResolved

  /**
   * Resolves Line to LineResolved with the cut.
   */
  public resolve(): LineResolved {
    const preresolved = this.preresolve()
    const length = this.dependencies.length
    const offset = this.prop.cutB ? 1 : 0
    if (preresolved.extendA && this.prop.cutA) {
      const pointCutA = this.intersect(this.dependencies[length - offset - 1])
      preresolved.a = pointCutA
      preresolved.extendA = false
    }
    if (preresolved.extendB && this.prop.cutB) {
      const pointCutB = this.intersect(this.dependencies[length - 1])
      preresolved.b = pointCutB
      preresolved.extendB = false
    }
    return preresolved
  }

  /**
   * Cuts Line with the given Line.
   * @param line  - Line which cut.
   * @param cutA  - True if cut extending point A; false if cut extending point B.
   */
  public cut(line: Line, cutA: boolean) {
    this.__dependencies.push(line)
    if (cutA) this.__prop.cutA = true
    else this.__prop.cutB = true
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
    const beta1  = lResolved.a.y - lResolved.b.y
    const beta2  = mResolved.a.y - mResolved.b.y
    const beta3  = mResolved.a.y - lResolved.a.y
    const gamma1 = -alpha1 + alpha2 * (beta1 / (beta2 || 1)) // div by 0 if m || x-axis
    const gamma2 =  alpha3 - alpha2 * (beta3 / (beta2 || 1)) // div by 0 if m || x-axis

    let a: Coord

    if (beta2 === 0 && beta1 !== 0) {  // m || x-axis
      a = {
        x: lResolved.a.x + alpha1 * (beta3 / beta1),
        y: lResolved.a.y + beta3
      }
    } else if ((beta2 === 0 && beta1 === 0) || gamma1 === 0) {  // m || l
      throw new Error("Parallel lines given")
    } else {
      a = {
        x: lResolved.a.x - alpha1 * (gamma2 / gamma1),  // div by 0 if l || m
        y: lResolved.a.y - beta1  * (gamma2 / gamma1)   // div by 0 if l || m
      }
    }

    return a
  }
}

export { LineResolved, LineProp, Line }