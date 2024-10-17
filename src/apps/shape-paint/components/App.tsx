import * as React from 'react'
import { ShapeContext } from '../lib/ShapeContext'
import { PointAbsoluteCoord, PointInternalDivision } from '../lib/Point'
import { LineTwoPoints, LineAngleBisector } from '../lib/Line'

export default function App() {
  const sx = ShapeContext.init()
  const pointA = sx.add(new PointAbsoluteCoord([], { x: 700, y: 450 }))
  const pointB = sx.add(new PointAbsoluteCoord([], { x: 300, y: 450 }))
  const pointC = sx.add(new PointAbsoluteCoord([], { x: 500, y: 300 }))
  const lineA  = sx.add(new LineTwoPoints([pointA, pointB], { extend: 'B' }))
  const lineB  = sx.add(new LineTwoPoints([pointA, pointC], { extend: 'B' }))
  const lineC  = sx.add(new LineTwoPoints([pointB, pointC], { extend: 'None' }))
  const lineD  = sx.add(new LineAngleBisector([lineA, lineC], { direction: 0 }))
  const lineE  = sx.add(new LineAngleBisector([lineA, lineC], { direction: 3 }))
  const pointD = sx.add(new PointAbsoluteCoord([], { x: 300, y: 50 }))
  const lineF  = sx.add(new LineTwoPoints([pointB, pointD], { extend: 'None' }))
  const lineG  = sx.add(new LineAngleBisector([lineD, lineF], { direction: 1 }))

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