import * as React from 'react'
import { Shape, ShapeContext } from '../lib/ShapeContext'
import { PointAbsoluteCoord, PointInternalDivision } from '../lib/Point'

export default function App() {
  const sx = ShapeContext.init()
  const pointA = sx.add(new PointAbsoluteCoord([], { x: 50, y: 20 }))
  const pointB = sx.add(new PointAbsoluteCoord([], { x: 300, y: 50 }))
  const pointC = sx.add(new PointInternalDivision([pointA, pointB], { a: 0, b: 1, r: 0.2 }))

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="500px" height="200px">
        {
          sx.map((i: Shape) => React.createElement(i.svgType, i.svgProps))
        }
      </svg>
    </div>
  )
}