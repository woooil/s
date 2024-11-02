import * as React from 'react'
import * as RS from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import Shape from './Shape'
import '../styles/App.css'

export default function App() {
  const { shapes, action } = useShapes()

  React.useEffect(() => {
    const pointA = action.add(new RS.RPointAbsoluteCoord([], { x: 700, y: 450 }, { hide: true }))
    const pointB = action.add(new RS.RPointAbsoluteCoord([], { x: 300, y: 450 }, { hide: true }))
    const pointC = action.add(new RS.RPointAbsoluteCoord([], { x: 500, y: 300 }, { hide: true }))
    const lineA = action.add(new RS.RLineTwoPoints([pointA, pointB], { extendB: true }))
    const lineB = action.add(new RS.RLineTwoPoints([pointA, pointC], { extendB: true }))
    const lineC = action.add(new RS.RLineTwoPoints([pointB, pointC], {}))
    const lineD = action.add(new RS.RLineAngleBisector([lineA, lineC], { reverseL: true }))
    const lineE = action.add(new RS.RLineAngleBisector([lineA, lineC], { }))
    const pointD = action.add(new RS.RPointIntersection([lineB, lineD], { }, { hide: true }))
    const pointE = action.add(new RS.RPointIntersection([lineB, lineE], { }, { hide: true }))
    action.cutLine(lineD, lineB, false)
    action.cutLine(lineB, lineE, false)
    action.cutLine(lineE, lineB, false)
    const labelA = action.add(new RS.RLabelOnPoint([pointC], { offset: new RS.CoordPolar(16, RS.Theta.ny()), label: 'A' }))
    const labelB = action.add(new RS.RLabelOnPoint([pointB], { offset: new RS.CoordPolar(24, RS.Theta.py()), label: 'B' }))
    const labelC = action.add(new RS.RLabelOnPoint([pointA], { offset: new RS.CoordPolar(24, RS.Theta.py()), label: 'C' }))
    const labelD = action.add(new RS.RLabelOnPoint([pointD], { offset: new RS.CoordPolar(20, new RS.Theta(6)), label: 'D' }))
    const labelE = action.add(new RS.RLabelOnPoint([pointE], { offset: new RS.CoordPolar(16, new RS.Theta(3.5)), label: 'E' }))
    const angleA = action.add(new RS.RAngleTwoLines([lineA, lineD], { reverseL: true }))
    const angleB = action.add(new RS.RAngleTwoLines([lineC, lineD], { }))
    const angleC = action.add(new RS.RAngleTwoLines([lineA, lineE], { }))
    const angleD = action.add(new RS.RAngleTwoLines([lineC, lineE], { }))
    action.congruentAngle(angleA, angleB, 'o')
    action.congruentAngle(angleC, angleD, 'x')
    const lengthA = action.add(new RS.RLengthTwoPoints([pointB, pointC], { ny: true }))
    const lengthB = action.add(new RS.RLengthTwoPoints([pointC, pointD], { ny: true }))
    const lengthC = action.add(new RS.RLengthTwoPoints([pointB, pointA], { }))
    const labelF = action.add(new RS.RLabelOnLength([lengthA], { label: '4 cm' }))
    const labelG = action.add(new RS.RLabelOnLength([lengthB], { label: '2 cm' }))
    const labelH = action.add(new RS.RLabelOnLength([lengthC], { label: '8 cm' }))
    const pointF = action.add(new RS.RPointOnLine([lineA], { section: 2, r: 200 }))
    const labelI = action.add(new RS.RLabelOnPoint([pointF], { offset: new RS.CoordPolar(24, RS.Theta.py()), label: 'F' }))
  }, [])

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width="800px"
        height="600px"
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
