import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, ShapeDependenciesIndex, Shape } from '../Shape'

/**
 * Represents the extension of line.
 * @value 'None'  - No endpoint is extended; represents a segment.
 * @value 'A'     - Endpoint A is extended; represents a ray extended from A.
 * @value 'B'     - Endpoint B is extended; represents a ray extended from B.
 * @value 'Both'  - Both endpoints are extended; represents an infinite line.
 */
type LineExtend = 'None' | 'A' | 'B' | 'Both'

/**
 * The mathematical definition of Line. Defined by two points Line passes through.
 * @prop a      - One Coord which Line passes through.
 * @prop b      - Another Coord which Line passes through.
 * @prop extend - The extension of Line.
 */
interface LineResolved extends ShapeResolved {
  a: Coord
  b: Coord
  extend: LineExtend
}

/**
 * The properties of Line.
 */
interface LineProp extends ShapeProp { }

/**
 * Represents lines.
 * @hierarchy Shape <- Line
 */
abstract class Line extends Shape {
  /**
   * Uses 'Line' as ShapeType and 'line' as svgTag.
   */
  constructor(dependencies: Shape[], prop: LineProp) {
    super(dependencies, prop, 'Line', 'line')
  }

  /**
   * Uses stroke of width 2, filled black. Scales extended points to very large numbers.
   */
  public get svgAttr() {
    const resolved = this.resolve()

    const extend = (coord: Coord, ref: Coord) => {
      return {
        x: ref.x + (coord.x - ref.x) * (2 << 10),
        y: ref.y + (coord.y - ref.y) * (2 << 10),
      }
    }

    switch (resolved.extend) {
      case 'A':
        resolved.a = extend(resolved.a, resolved.b)
        break
      case 'B': 
        resolved.b = extend(resolved.b, resolved.a)
        break
      case 'Both':
        const tempA = extend(resolved.a, resolved.b)
        resolved.b = extend(resolved.b, resolved.a)
        resolved.a = tempA
        break
      default:
        break
    }

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
   * Resolves Line to LineResolved.
   */
  public abstract resolve(): LineResolved

  /**
   * Returns an intersection with another Line.
   * @throws Throws an Error if two Lines are parallel.
   */
  public intersect(line: Line) {
    const lResolved = this.resolve()
    const mResolved = line.resolve()

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

export { LineExtend, LineResolved, LineProp, Line }