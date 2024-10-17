import * as React from 'react'
import { ShapeResolved, ShapeProp, ShapeDependenciesIndex, Shape, Coord } from './Shape'

/**
 * The mathematical definition of Point. Equal to Coord.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface PointResolved extends ShapeResolved, Coord { }

/**
 * The properties of Point.
 */
interface PointProp extends ShapeProp { }

/**
 * The properties of PointAbsoluteCoord. Defined by its absolute coordinates.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
interface PointAbsoluteCoordProp extends PointProp {
  x: number
  y: number
}

/**
 * The properties of PointInternalDivison. 
 * @prop r - The division ratio.
 */
interface PointInternalDivisionProp extends PointProp {
  r: number
}

export { PointResolved, PointProp, PointAbsoluteCoordProp, PointInternalDivisionProp }

/**
 * Represents points.
 * @hierarchy Shape <- Point
 */
abstract class Point extends Shape {
  /**
   * Uses 'Point' as ShapeType and 'circle' as svgTag.
   */
  constructor(dependencies: Shape[], prop: PointProp) {
    super(dependencies, prop, 'Point', 'circle')
  }

  /**
   * Sets radius of the circle to be 3, fills it with black.
   */
  public get svgAttr(): React.SVGAttributes<SVGCircleElement> {
    const resolved = this.resolve()

    return {
      cx: resolved.x,
      cy: resolved.y,
      r: 3,
      fill: 'black',
    }
  }

  /**
   * Resolves Point into PointResolved.
   */
  public abstract resolve(): PointResolved
}

/**
 * Represents points as its absolute coordinates in the Cartesian coordinate system.
 * @hierarchy Shape <- Point <- PointAbsoluteCoord
 */
class PointAbsoluteCoord extends Point {
  /**
   * The absolute coordinates of PointAbsoluteCoord in the Cartesian coordinate system.
   */
  declare readonly prop: PointAbsoluteCoordProp

  /**
   * Returns its coordinates without any modification.
   */
  resolve() {
    return {
      x: this.prop.x,
      y: this.prop.y
    }
  }
}

/**
 * Represents points as internal divisions of two points.
 * @hierarchy Shape <- Point <- PointInternalDivision
 */
class PointInternalDivision extends Point {
  /**
   * Two Points which Point devides
   */
  declare readonly dependencies: Point[]

  /**
   * The properties of PointInternalDivision.
   * @prop r - The division ratio.
   */
  declare readonly prop: PointInternalDivisionProp

  /**
   * @throws Throws an Error if given Dependencies are not type of Point.
   */
  constructor(dependencies: Point[], prop: PointInternalDivisionProp) {
    if (dependencies.length !== 2 || !(dependencies.every((i) => i.type === 'Point'))) throw new Error("Dependencies are not type of Point")
    super(dependencies, prop)
  }

  /**
   * Calculates the internal division mathematically.
   */
  resolve() {
    const aResolved = this.dependencies[0].resolve()
    const bResolved = this.dependencies[1].resolve()

    return {
      x: aResolved.x * (1 - this.prop.r) + bResolved.x * this.prop.r,
      y: aResolved.y * (1 - this.prop.r) + bResolved.y * this.prop.r,
    }
  }
}

export { Point, PointAbsoluteCoord, PointInternalDivision }