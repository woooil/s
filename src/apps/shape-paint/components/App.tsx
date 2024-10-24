import * as React from 'react'
import {
  Shape,
  PointAbsoluteCoord,
  PointInternalDivision,
  PointIntersection,
  LineTwoPoints,
  LineAngleBisector,
} from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import { ShapeElement } from '../lib/ShapeElement'

export default function App() {
  const { shapes, action } = useShapes()

  React.useEffect(() => {
    const pointA = action.add(new PointAbsoluteCoord([], { x: 700, y: 450 }))
    const pointB = action.add(new PointAbsoluteCoord([], { x: 300, y: 450 }))
    const pointC = action.add(new PointAbsoluteCoord([], { x: 500, y: 300 }))
    const lineA = action.add(
      new LineTwoPoints([pointA, pointB], { extendB: true }),
    )
    const lineB = action.add(
      new LineTwoPoints([pointA, pointC], { extendB: true }),
    )
    const lineC = action.add(new LineTwoPoints([pointB, pointC], {}))
    const lineD = action.add(
      new LineAngleBisector([lineA, lineC], { direction: 0 }),
    )
    const lineE = action.add(
      new LineAngleBisector([lineA, lineC], { direction: 3 }),
    )
    const pointD = action.add(new PointIntersection([lineB, lineD], {}))
    const pointE = action.add(new PointIntersection([lineB, lineE], {}))
    action.cutLine(lineD, lineB, false)
    action.cutLine(lineB, lineE, false)
    action.cutLine(lineE, lineB, false)
  }, [])

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="800px"
        height="500px"
        style={{ border: '1px solid blue' }}>
        {shapes.map((i: Shape) => (
          <ShapeElement shape={i} />
        ))}
      </svg>
    </div>
  )
}
