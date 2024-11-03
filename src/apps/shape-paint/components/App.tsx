import * as React from 'react'
import * as RS from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import Shape from './Shape'
import '../styles/App.css'

export default function App() {
  const { shapes, action } = useShapes()
  const { shapes: s2, action: a2 } = useShapes()

  React.useEffect(() => {
    const pointA = a2.add(new RS.RPointAbsoluteCoord([], { x: 350, y: 200 }, { hide: true }))
    const labelA = a2.add(new RS.RLabelOnPoint([pointA], { offset: new RS.CoordPolar(16, RS.Theta.ny()), label: 'A' }))
    const pointB = a2.add(new RS.RPointAbsoluteCoord([], { x: 200, y: 400 }, { hide: true }))
    const labelB = a2.add(new RS.RLabelOnPoint([pointB], { offset: new RS.CoordPolar(20, new RS.Theta(2.8)), label: 'B' }))
    const lineAB = a2.add(new RS.RLineTwoPoints([pointA, pointB], {}))
    const lineAC = a2.add(new RS.RLinePerpendicular([pointA, lineAB], { reverse: true }))
    const lineBC = a2.add(new RS.RLineDirectional([pointB], { theta: RS.Theta.px() }))
    const pointC = a2.add(new RS.RPointIntersection([lineAC, lineBC], {}, { hide: true }))
    const labelC = a2.add(new RS.RLabelOnPoint([pointC], { offset: new RS.CoordPolar(16, new RS.Theta(0.4)), label: 'C' }))
    a2.cutLine(lineAC, lineBC, false)
    a2.cutLine(lineBC, lineAC, false)
    const lengthAB = a2.add(new RS.RLengthTwoPoints([pointA, pointB], { reverse: true }))
    const labelAB = a2.add(new RS.RLabelOnLength([lengthAB], { label: '8 cm' }))
    const arcAB = a2.add(new RS.RArcOnTwoPoints([pointA, pointB], { theta: new RS.Theta(-Math.PI) }))
  }, [])

  React.useEffect(() => {
    const pointA = action.add(new RS.RPointAbsoluteCoord([], { x: 500, y: 350 }, { hide: true }))
    const pointB = action.add(new RS.RPointAbsoluteCoord([], { x: 400, y: 450 }, { hide: true }))
    const pointC = action.add(new RS.RPointAbsoluteCoord([], { x: 700, y: 450}, { hide: true }))
    const labelA = action.add(new RS.RLabelOnPoint([pointA], { offset: new RS.CoordPolar(16, RS.Theta.ny()), label: 'A' }))
    const labelB = action.add(new RS.RLabelOnPoint([pointB], { offset: new RS.CoordPolar(20, RS.Theta.py()), label: 'B' }))
    const labelC = action.add(new RS.RLabelOnPoint([pointC], { offset: new RS.CoordPolar(16, RS.Theta.px()), label: 'C' }))
    const lineAB = action.add(new RS.RLineTwoPoints([pointA, pointB], {}, { width: 2 }))
    const lineBC = action.add(new RS.RLineTwoPoints([pointB, pointC], {}, { width: 2 }))
    const lineCA = action.add(new RS.RLineTwoPoints([pointC, pointA], {}, { width: 2 }))
    const lineBD = action.add(new RS.RLineAngleBisector([lineAB, lineBC], { reverseL: true }))
    action.cutLine(lineBD, lineCA, false)
    const pointD = action.add(new RS.RPointIntersection([lineCA, lineBD], {}, { hide: true }))
    const labelD = action.add(new RS.RLabelOnPoint([pointD], { offset: new RS.CoordPolar(20, new RS.Theta(-0.4)), label: 'D' }))
    const angleABD = action.add(new RS.RAngleThreePoints([pointA, pointB, pointD], {}))
    const angleCBD = action.add(new RS.RAngleThreePoints([pointC, pointB, pointD], {}))
    action.congruentAngle(angleABD, angleCBD, 'o')
    const lineCF = action.add(new RS.RLineTwoPoints([pointC, pointB], { extendB: true }))
    const pointF = action.add(new RS.RPointOnLine([lineCF], { section: 2, r: 120 }))
    const labelF = action.add(new RS.RLabelOnPoint([pointF], { offset: new RS.CoordPolar(20, RS.Theta.py()), label: 'F' }))
    const lineCE = action.add(new RS.RLineTwoPoints([pointC, pointA], { extendB: true }))
    const lineBE = action.add(new RS.RLineAngleBisector([lineCF, lineAB], { reverseM: true }))
    action.cutLine(lineCE, lineBE, false)
    action.cutLine(lineBE, lineCE, false)
    const pointE = action.add(new RS.RPointIntersection([lineBE, lineCE], {}, { hide: true }))
    const labelE = action.add(new RS.RLabelOnPoint([pointE], { offset: new RS.CoordPolar(16, new RS.Theta(-2.6)), label: 'E' }))
    const angleABE = action.add(new RS.RAngleThreePoints([pointA, pointB, pointE], {}))
    const angleFBE = action.add(new RS.RAngleThreePoints([pointF, pointB, pointE], {}))
    action.congruentAngle(angleABE, angleFBE, 'x')
    const lengthAB = action.add(new RS.RLengthTwoPoints([pointA, pointB], {}))
    const labelAB = action.add(new RS.RLabelOnLength([lengthAB], { label: '4 cm' }))
    const lengthBC = action.add(new RS.RLengthTwoPoints([pointB, pointC], {}))
    const labelBC = action.add(new RS.RLabelOnLength([lengthBC], { label: '8 cm' }))
    const lengthAD = action.add(new RS.RLengthTwoPoints([pointA, pointD], { reverse: true }))
    const labelAD = action.add(new RS.RLabelOnLength([lengthAD], { label: '2 cm', offsite: new RS.CoordPolar(40, new RS.Theta(-0.3)) }))
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
        {s2.map((i: RS.RShape) => (
          <Shape
            shape={i}
            key={i.id}
          />
        ))}
      </svg>
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
