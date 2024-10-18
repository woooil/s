import * as React from 'react'
import { ShapeContext, PointAbsoluteCoord, PointInternalDivision, PointIntersection, LineTwoPoints, LineAngleBisector } from '../lib'

export default function App() {
  const sx = ShapeContext.init()
  const pointA = sx.add(new PointAbsoluteCoord([], { x: 700, y: 450 }))
  const pointB = sx.add(new PointAbsoluteCoord([], { x: 300, y: 450 }))
  const pointC = sx.add(new PointAbsoluteCoord([], { x: 500, y: 300 }))
  const lineA  = sx.add(new LineTwoPoints([pointA, pointB], { extendB: true }))
  const lineB  = sx.add(new LineTwoPoints([pointA, pointC], { extendB: true }))
  const lineC  = sx.add(new LineTwoPoints([pointB, pointC], { }))
  const lineD  = sx.add(new LineAngleBisector([lineA, lineC, lineB], { direction: 0, cutB: true }))
  const lineE  = sx.add(new LineAngleBisector([lineA, lineC, lineB], { direction: 3, cutB: true }))
  const pointD = sx.add(new PointIntersection([lineB, lineD], { }))

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field">
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800px" height="500px" style={{ border: '1px solid blue' }}>
        {
          sx.map((i: Shape) => React.createElement(i.svgTag, i.svgAttr))
        }
      </svg>
    </div>
  )
}