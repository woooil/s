import * as React from 'react'
import { ShapeResolved, ShapeDef, ShapeDependenciesIndex, Shape, Coord } from './Shape'

type LineResolved = ShapeResolved & { a: Coord, b: Coord }
type LineDef = ShapeDef & { }
type LineTwoPoints = { a: ShapeDependenciesIndex, b: ShapeDependenciesIndex }

abstract class Line extends Shape {
  constructor(dependencies: Shape[], def: LineDef) {
    super(dependencies, def, 'Line', 'line')
  }

  public get svgProps(): React.SVGAttributes<SVGLineElement> {
    return {
      x1: this.resolve().a.x,
      y1: this.resolve().a.y,
      x2: this.resolve().b.x,
      y2: this.resolve().b.y,
      stroke: 'black',
      strokeWidth: 2,
    }
  }
  public abstract resolve(): LineResolved
}