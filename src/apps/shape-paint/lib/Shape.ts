// See the following code for type definition:
// node_modules/typescript/lib/lib.dom.d.ts
// node_modules/@types/react/index.d.ts

import * as React from 'react'
import { v4 as uuid } from 'uuid'

type ShapeID = string
type ShapeDef = { }
type ShapeType = string
type ShapeResolved = { }
type ShapeDependenciesIndex = number

type Coord = { x: number, y: number }

export { ShapeID, ShapeDef, ShapeType, ShapeResolved, ShapeDependenciesIndex, Coord }

/**
 * @class
 * Represents any shape.
 * @hierarchy Shape
 */
abstract class Shape {
  /**
   * @props
   * id           - The identifier for each instance.
   * dependencies - The list of Shapes on which this Shape depends.
   * def          - The relational definition.
   * type         - The geometric type.
   * svgType      - The name of svg element tag which this Shape should use.
   */
  readonly id: ShapeID
  readonly dependencies: Shape[]
  readonly def: ShapeDef
  readonly type: ShapeType
  readonly svgType: keyof SVGElementTagNameMap

  /**
   * @methods
   * resolve  - Resolves the instance into a defined type based on its type and returns it.
   * svgProps - Returns the attributes of svg element tag which draw the instance.
   */
  public abstract resolve(): ShapeResolved
  public abstract get svgProps(): React.SVGAttributes<SVGElement> 

  /**
   * @constructor
   * Takes def, type, and svgType and assigns them into the instance. id is auto-generated using uuid().
   */
  constructor(dependencies: Shape[], def: ShapeDef, type: ShapeType, svgType: keyof SVGElementTagNameMap) {
    this.id = uuid()
    this.dependencies = dependencies
    this.def = def
    this.type = type
    this.svgType = svgType
  }
}

export { Shape }