import * as React from 'react'
import { Shape } from './Shape'

export function ShapeElement(shape: Shape) {
  return React.createElement(shape.svgTag, shape.svgAttr)
}