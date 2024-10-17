import * as React from 'react'
import { ShapeResolved, ShapeProp, ShapeDependenciesIndex, Shape, Coord } from './Shape'
import { Point } from './Point'

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
 * The properties of LineTwoPointsProp. Sets LineExtend explicitly.
 * @prop extend - The extension of LineTwoPoints.
 */
interface LineTwoPointsProp extends LineProp {
  extend: LineExtend
}

/**
 * The properties of LineAngleBisectorProp. Chooses the direction of the angle to bisect.
 * @prop direction - The direction of the angle to bisect. Integers from 0 to 3 represents four possible angles made by two Lines defined as below. Any integer out of this range would be considered as its remainder divided by 4.
 *   @value 0 - The angle by two Lines extending towards +x direction.
 *   @value 1 - The angle by the first Line extending towards +x direction and the second Line extending towards -x direction.
 *   @value 2 - The angle by two Lines extending towards -x direction.
 *   @value 3 - The angle by the first Line extending towards -x direction and the second Line extending towards +x direction.
 */
interface LineAngleBisectorProp extends LineProp {
  direction: number
}

export { LineExtend, LineResolved, LineProp, LineTwoPointsProp, LineAngleBisectorProp }

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
  public get svgAttr(): React.SVGAttributes<SVGLineElement> {
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
}

/**
 * Represents lines as two points it passes through.
 * @hierarchy Shape <- Line <- LineTwoPoints
 */
class LineTwoPoints extends Line {
  /** 
   * Two points Line passes through.
   */
  declare readonly dependencies: Point[]

  /**
   * The properties of LineTwoPoints.
   * @prop extend - The extension of LineTwoPoints.
   */
  declare readonly prop: LineTwoPointsProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Point[], prop: LineTwoPointsProp) {
    if (dependencies.length !== 2 || !(dependencies.every((i) => i.type === 'Point'))) throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  /**
   * Returns two points Line passes through.
   */
  resolve() {
    const aResolved: Coord = this.dependencies[0].resolve()
    const bResolved: Coord = this.dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      extend: this.prop.extend,
    }
  }
}

/**
 * Represents lines as angle bisectors of two lines.
 * @hierarchy Shape <- Line <- LineAngleBisector
 */
class LineAngleBisector extends Line {
  /**
   * Two Lines which Line bisects.
   */
  declare readonly dependencies: Line[]

  /**
   * The properties of LineAngleBisector.
   * @prop direction - The direction of the angle to bisect.
   */
  declare readonly prop: LineAngleBisectorProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Line.
   */
  constructor(dependencies: Line[], prop: LineAngleBisectorProp) {
    if (dependencies.length !== 2 || !(dependencies.every((i) => i.type === 'Line'))) throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  /**
   * Calculates the angle bisector of two Lines mathematically.
   * @throws Throws an Error if two Lines are parallel.
   */
  resolve() {
    const lResolved = this.dependencies[0].resolve()
    const mResolved = this.dependencies[1].resolve()

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

    const theta1 = Math.atan(beta1 / alpha1)
    const theta2 = Math.atan(beta2 / alpha2)
    const theta = (theta1 + theta2) / 2
    const tan = Math.tan(theta)

    let b: Coord = {
      x: a.x,
      y: a.y
    }

    const c = 1 << 8

    switch (this.prop.direction % 4) {
      case 0:
        b.x += c
        b.y += c * tan
        break
      case 1:
        b.x += theta1 > theta2 ? -c * tan : c * tan
        b.y += theta1 > theta2 ? c : -c
        break
      case 2:
        b.x -= c
        b.y -= c * tan
        break
      case 3:
        b.x += theta1 > theta2 ? c * tan : -c * tan
        b.y += theta1 > theta2 ? -c : c
        break
      default:
        break
    }

    return {
      a: a,
      b: b,
      extend: 'B' as LineExtend
    }
  }
}

export { Line, LineTwoPoints, LineAngleBisector }