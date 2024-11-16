import * as React from 'react'
import RS from 'react-relational-shapes'

export default function App() {
  const [shapes, action] = RS.useShapes()
  const [mode, setMode] = React.useState(false) // false: add RPoint, true: add RLine

  const canvasOnClick = (e: React.MouseEvent) => {
    if (mode) {
      const points: RS.RPoint[] = action.shapesAt(e.x, e.y, { type: RS.RPoint.RES_TYPE })
      if (points.length > 2) action.add.Line.TwoPoints([points[0], points[1]], {})
    } else {
      action.add.Point.AbsoluteCoord([], { x: e.x, y: e.y })
    }
  }

  return (
    <div>
      <div className="canvas" onClick={canvasOnClick}>
        <RShapes shapes={shapes} />
        { shapes.map(i => shapes.component() }
      </div>
    </div>
  )
}