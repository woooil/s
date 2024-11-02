import * as React from 'react'
import * as RS from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import Shape from './Shape'
import '../styles/App.css'

export default function App() {
  const { shapes, action } = useShapes()
  const { shapes: s2, action: a2 } = useShapes()

  React.useEffect(() => {
    const pointA = a2.add(new RS.RPointAbsoluteCoord([], { x: 500, y: 200 }, { hide: true }))
    const pointB = a2.add(new RS.RPointAbsoluteCoord([], { x: 200, y: 500 }, { hide: true }))
    const pointC = a2.add(new RS.RPointAbsoluteCoord([], { x: 600, y: 500 }, { hide: true }))
    const labelA = a2.add(new RS.RLabelOnPoint([pointA], { offset: new RS.CoordPolar(16, RS.Theta.ny()), label: 'A' }))
    const labelB = a2.add(new RS.RLabelOnPoint([pointB], { offset: new RS.CoordPolar(20, RS.Theta.py()), label: 'B' }))
    const labelC = a2.add(new RS.RLabelOnPoint([pointC], { offset: new RS.CoordPolar(20, RS.Theta.py()), label: 'C' }))
    const lineAB = a2.add(new RS.RLineTwoPoints([pointA, pointB], {}, { width: 2 }))
    const lineBC = a2.add(new RS.RLineTwoPoints([pointB, pointC], {}, { width: 2 }))
    const lineCA = a2.add(new RS.RLineTwoPoints([pointC, pointA], {}, { width: 2 }))
    const pointD = a2.add(new RS.RPointOnLine([lineAB], { section: 1, r: 0.3 }, { hide: true }))
    const labelD = a2.add(new RS.RLabelOnPoint([pointD], { offset: new RS.CoordPolar(20, new RS.Theta(-2.8)), label: 'D' }))
    const lengthAD = a2.add(new RS.RLengthTwoPoints([pointA, pointD], {}))
    const labelAD = a2.add(new RS.RLabelOnLength([lengthAD], { label: '8 cm' }))
    const lineCD = a2.add(new RS.RLineTwoPoints([pointC, pointD], {}))
    const lineDE = a2.add(new RS.RLineParallel([pointD, lineCA], { reverse: true }))
    a2.cutLine(lineDE, lineBC, false)
    const pointE = a2.add(new RS.RPointIntersection([lineDE, lineBC], {}, { hide: true }))
    const labelE = a2.add(new RS.RLabelOnPoint([pointE], { offset: new RS.CoordPolar(20, RS.Theta.py()), label: 'E'}))
    const markerCA = a2.add(new RS.RMarkerOnLine([lineCA], {}))
    const markerDE = a2.add(new RS.RMarkerOnLine([lineDE], { reverse: true }))
    a2.parallelLineMarker(markerCA, markerDE, '<')
    const lineEF = a2.add(new RS.RLineParallel([pointE, lineCD], {}))
    a2.cutLine(lineEF, lineAB, false)
    const pointF = a2.add(new RS.RPointIntersection([lineEF, lineAB], {}, { hide: true }))
    const labelF = a2.add(new RS.RLabelOnPoint([pointF], { offset: new RS.CoordPolar(20, new RS.Theta(-3)), label: 'F'}))
    const markerCD = a2.add(new RS.RMarkerOnLine([lineCD], {}))
    const markerEF = a2.add(new RS.RMarkerOnLine([lineEF], {}))
    a2.parallelLineMarker(markerCD, markerEF, '<<')
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
    const lengthAD = action.add(new RS.RLengthTwoPoints([pointA, pointD], { ny: true }))
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
