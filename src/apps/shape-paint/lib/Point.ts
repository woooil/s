import * as React from 'react'
import { ShapeResolved, ShapeDef, ShapeDependenciesIndex, Shape, Coord } from './Shape'

type PointResolved = ShapeResolved & Coord
type PointDef = ShapeDef & { }
type PointAbsoluteCoordDef = PointDef & { x: number, y: number }
type PointInternalDivisionDef = PointDef & { a: ShapeDependenciesIndex, b: ShapeDependenciesIndex, r: number }

export { PointResolved, PointDef, PointAbsoluteCoordDef, PointInternalDivisionDef }

/**
 * @class
 * Represents points
 * @hierarchy Shape <- Point
 */
abstract class Point extends Shape {
  /**
   * @constructor
   * Takes dependencies and def and put it in super with 'Point' as type and 'circle' as svgType.
   */
  constructor(dependencies: Shape[], def: PointDef) {
    super(dependencies, def, 'Point', 'circle')
  }

  /**
   * @methods
   * svgProps - Returns the attributes of circle tag based on the resolved point with the default attributes.
   * resolve  - Resolves the instance into PointResolved type.
   */
  public get svgProps(): React.SVGAttributes<SVGCircleElement> {
    return {
      cx: this.resolve().x,
      cy: this.resolve().y,
      r: 3,
      fill: 'black',
    }
  }
  public abstract resolve(): PointResolved
}

/**
 * @class
 * Represents points defined by its absolute coordinates in the Cartesian coordinate system.
 * @hierarchy Shape <- Point <- PointAbsoluteCoord
 */
class PointAbsoluteCoord extends Point {
  /**
   * @props
   * def  - The absolute coordinates of the instance in the Cartesian coordinate system.
   */
  declare readonly def: PointAbsoluteCoordDef

  /**
   * @methods
   * resolve  - Returns its definition without any modification.
   */
  resolve() {
    return {
      x: this.def.x,
      y: this.def.y
    }
  }
}

/**
 * @class
 * Represents points defined by an internal division of two points.
 * @hierarchy Shape <- Point <- PointInternalDivision
 */
class PointInternalDivision extends Point {
  /**
   * @props
   * def  - Two points which the instance divides and the ratio of the division.
   */
  declare def: PointInternalDivisionDef

  /**
   * @props
   * resolve  - Calculates the internal division mathematically and returns it.
   */
  resolve() {
    const aResolved = this.dependencies[this.def.a].resolve()
    const bResolved = this.dependencies[this.def.b].resolve()

    return {
      x: aResolved.x * (1 - this.def.r) + bResolved.x * this.def.r,
      y: aResolved.y * (1 - this.def.r) + bResolved.y * this.def.r,
    }
  }
}

export { Point, PointAbsoluteCoord, PointInternalDivision }