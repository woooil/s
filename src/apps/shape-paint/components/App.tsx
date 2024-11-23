import * as React from 'react'
import { RCanvas, useShapes } from '../lib/react-relational-shapes'
import '../styles/App.css'

export default function App() {
  const { shapes: s, action: a } = useShapes()

  React.useEffect(() => {
    const pointA = a.add.point.absoluteCoord([], { x: 200, y: 400 }, { r: 5 })
    const pointB = a.add.point.absoluteCoord([], { x: 400, y: 200 }, { visibility: 'hidden' })
    const pointC = a.add.point.internalDivision([pointA, pointB], { ratio: 0.1 })
    const pointD = a.add.point.absoluteCoord([], { x: 500, y: 300 })
    const lineL = a.add.line.twoPoints([pointA, pointB], { extend2: true })
    const lineM = a.add.line.twoPoints([pointC, pointD], {})
    a.update.line.cut(lineL, lineM, true)
  }, [])

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field"></div>
      <RCanvas shapes={s} />
    </div>
  )
}
