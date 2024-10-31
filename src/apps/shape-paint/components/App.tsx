import * as React from 'react'
import * as RS from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import Shape from './Shape'
import '../styles/App.css'

export default function App() {
  const { shapes, action } = useShapes()

  React.useEffect(() => {
    const pointA = action.add(new RS.RPointAbsoluteCoord([], { x: 700, y: 450 }))
    const pointB = action.add(new RS.RPointAbsoluteCoord([], { x: 300, y: 450 }))
    const pointC = action.add(new RS.RPointAbsoluteCoord([], { x: 500, y: 300 }))
    const lineA = action.add(
      new RS.RLineTwoPoints([pointA, pointB], { extendB: true }),
    )
    const lineB = action.add(
      new RS.RLineTwoPoints([pointA, pointC], { extendB: true }),
    )
    const lineC = action.add(new RS.RLineTwoPoints([pointB, pointC], {}))
    const lineD = action.add(
      new RS.RLineAngleBisector([lineA, lineC], { direction: [true, true] }),
    )
    const lineE = action.add(
      new RS.RLineAngleBisector([lineA, lineC], { direction: [false, true] }),
    )
    const pointD = action.add(new RS.RPointIntersection([lineB, lineD], {}))
    const pointE = action.add(new RS.RPointIntersection([lineB, lineE], {}))
    action.cutLine(lineD, lineB, false)
    action.cutLine(lineB, lineE, false)
    action.cutLine(lineE, lineB, false)
    const labelA = action.add(
      new RS.RLabelOnPoint([pointC], { r: 16, theta: RS.CARD.ny, label: 'A' }),
    )
    const labelB = action.add(
      new RS.RLabelOnPoint([pointB], { r: 24, theta: RS.CARD.py, label: 'B' }),
    )
    const labelC = action.add(
      new RS.RLabelOnPoint([pointA], { r: 24, theta: RS.CARD.py, label: 'C' }),
    )
    const labelD = action.add(
      new RS.RLabelOnPoint([pointD], { r: 20, theta: 6, label: 'D' }),
    )
    const labelE = action.add(
      new RS.RLabelOnPoint([pointE], { r: 16, theta: 3.5, label: 'E' }),
    )
    const angleA = action.add(
      new RS.RAngleTwoLines([lineA, lineD], { direction: [true, true], marker: '.' })
    )
    const angleB = action.add(
      new RS.RAngleTwoLines([lineC, lineD], { direction: [true, true], marker: '.' })
    )
    const angleC = action.add(
      new RS.RAngleTwoLines([lineA, lineE], { direction: [false, false], marker: '.' })
    )
    const angleD = action.add(
      new RS.RAngleTwoLines([lineC, lineE], { direction: [true, false], marker: '.' })
    )
    action.congruentAngle(angleA, angleB, 'o')
    action.congruentAngle(angleC, angleD, 'x')
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
        {shapes.map((i: RS.RShape) => (
          <Shape
            shape={i}
            key={i.id}
          />
        ))}
      </svg>
    </div>
  )
}
