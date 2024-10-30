import * as React from 'react'
import {
  Shape,
  QUARTER,
  PointAbsoluteCoord,
  PointInternalDivision,
  PointIntersection,
  LineTwoPoints,
  LineAngleBisector,
  LabelOnPoint,
  AngleTwoLines,
} from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import { ShapeElement } from '../lib/ShapeElement'
import '../styles/App.css'

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
    const labelA = action.add(
      new LabelOnPoint([pointC], { r: 16, theta: QUARTER.ny, label: 'A' }),
    )
    const labelB = action.add(
      new LabelOnPoint([pointB], { r: 24, theta: QUARTER.py, label: 'B' }),
    )
    const labelC = action.add(
      new LabelOnPoint([pointA], { r: 24, theta: QUARTER.py, label: 'C' }),
    )
    const labelD = action.add(
      new LabelOnPoint([pointD], { r: 20, theta: 6, label: 'D' }),
    )
    const labelE = action.add(
      new LabelOnPoint([pointE], { r: 16, theta: 3.5, label: 'E' }),
    )
    const angleA = action.add(
      new AngleTwoLines([lineA, lineD], { direction: 0, marker: '.' })
    )
    const angleB = action.add(
      new AngleTwoLines([lineC, lineD], { direction: 0, marker: '.' })
    )
    const angleC = action.add(
      new AngleTwoLines([lineA, lineE], { direction: 2, marker: '.' })
    )
    const angleD = action.add(
      new AngleTwoLines([lineC, lineE], { direction: 1, marker: '.' })
    )
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
          <ShapeElement
            shape={i}
            key={i.id}
          />
        ))}
      </svg>
    </div>
  )
}
