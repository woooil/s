import * as React from 'react'
import { useShapes, ShapeElement, PointAbsoluteCoord, PointInternalDivision, PointIntersection, LineTwoPoints, LineAngleBisector } from '../lib'

export default function App() {
  const [shapes, action] = useShapes()

  React.useEffect(() => {
    const pointA = action.add(new PointAbsoluteCoord({ x: 700, y: 450 }))
    const pointB = action.add(new PointAbsoluteCoord({ x: 300, y: 450 }))
    const pointC = action.add(new PointAbsoluteCoord({ x: 500, y: 300 }))
    const lineA  = action.add(new LineTwoPoints([pointA, pointB], { extendB: true }))
    const lineB  = action.add(new LineTwoPoints([pointA, pointC], { extendB: true }))
    const lineC  = action.add(new LineTwoPoints([pointB, pointC], { }))
    const lineD  = action.add(new LineAngleBisector([lineA, lineC, lineB], { direction: 0, cutB: true }))
    const lineE  = action.add(new LineAngleBisector([lineA, lineC, lineB], { direction: 3, cutB: true }))
    const pointD = action.add(new PointIntersection([lineB, lineD], { }))
    action.cutLine(lineB, lineE, false)
    const pointE = action.add(new PointIntersection([lineB, lineE], { }))
  }, [])               
                       
  return (             
    <div>              
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field">
      </div>           
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="800px" height="500px" style={{ border: '1px solid blue' }}>
        {
          shapes.map((i: Shape) => ShapeElement(i))
        }
      </svg>
    </div>
  )
}