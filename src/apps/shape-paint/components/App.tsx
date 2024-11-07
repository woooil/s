import * as React from 'react'
import * as RS from '../lib/relational-shapes'
import { useShapes } from '../lib/useShapes'
import Shape from './Shape'
import '../styles/App.css'

export default function App() {
  const { shapes: s, action: a } = useShapes()

  React.useEffect(() => {
    const lineL = a.add(new RS.RLineVertical([], { x: 300 }, { width: 1 }))
    const labelL = a.add(new RS.RLabelOnLine([lineL], { onLine: { type: 'y', value: 40 }, label: 'l' }, { italic: 'true' }))
    const pointA = a.add(new RS.RPointOnLine([lineL], { onLine: { type: 'y', value: 440 } }, { hide: true }))
    const lineAB = a.add(new RS.RLineDirectional([pointA], { theta: RS.Theta.px(), distance: 200 }))
    const pointB = a.add(new RS.RPointOnLine([lineAB], { onLine: { type: 'coord1', value: 200 } }, { hide: true }))
    const lineBC = a.add(new RS.RLineDirectional([pointB], { theta: RS.Theta.ny() }))
    const lineAC = a.add(new RS.RLineDirectional([pointA], { theta: new RS.Theta(-Math.PI / 3) }))
    a.cutLine(lineBC, lineAC)
    a.cutLine(lineAC, lineBC)
    const angleABC = a.add(new RS.RAngleTwoLines([lineAB, lineBC], { reverse1: true }))
    a.rightAngle(angleABC)
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
        {s.map((i: RS.RShape) => (
          <Shape
            shape={i}
            key={i.id}
          />
        ))}
      </svg>
    </div>
  )
}
