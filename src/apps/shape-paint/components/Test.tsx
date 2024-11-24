import * as React from 'react'
import { RCanvas, useShapes } from '../lib/react-relational-shapes'
import '../styles/App.css'

function createTriangle(canvasRef: React.RefObject<SVGSVGElement>, action: any) {
  const shapes: { point1: any, point2: any, point3: any, line1: any, line2: any, line3: any } = {
    point1: null,
    point2: null,
    point3: null,
    line1: null,
    line2: null,
    line3: null,
  }
  const getCoord = (e: MouseEvent) => { return { x: e.offsetX, y: e.offsetY } }
  // Step 1: Creates a point when the cursor first entered to the canvas.
  const func1 = (e: MouseEvent) => {
    const coord = getCoord(e)
    shapes.point1 = action.add.point.absoluteCoord([], coord, { opacity: 0.2 })
    canvasRef.current.addEventListener("mousemove", func2)
  }
  // Step 2: Moves the point along the cursor.
  const func2 = (e: MouseEvent) => {
    canvasRef.current.style.cursor = "none"
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point1, coord)
    canvasRef.current.addEventListener("click", func3, { once: true })
  }
  // Step 3: Settles the point on click.
  const func3 = (e: MouseEvent) => {
    canvasRef.current.removeEventListener("mousemove", func2)
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point1, coord)
    action.update.style(shapes.point1, { opacity: 1 })
    canvasRef.current.addEventListener("mousemove", func4, { once: true })
  } 
  // Step 4: Creates another point and segment.
  const func4 = (e: MouseEvent) => {
    const coord = getCoord(e)
    shapes.point2 = action.add.point.absoluteCoord([], coord, { opacity: 0.2 })
    shapes.line1 = action.add.line.twoPoints([shapes.point1, shapes.point2], {}, { opacity: 0.2 })
    canvasRef.current.addEventListener("mousemove", func5)
  }
  // Step 5: Moves the point 2 along the cursor.
  const func5 = (e: MouseEvent) => {
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point2, coord)
    canvasRef.current.addEventListener("click", func6, { once: true })
  }
  // Step 6: Settles the point 2 on click.
  const func6 = (e: MouseEvent) => {
    canvasRef.current.removeEventListener("mousemove", func5)
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point2, coord)
    action.update.style(shapes.point2, { opacity: 1 })
    action.update.style(shapes.line1, { opacity: 1 })
    canvasRef.current.addEventListener("mousemove", func7, { once: true })
  } 
  // Step 7: Creates point3, segment2, and segment3.
  const func7 = (e: MouseEvent) => {
    const coord = getCoord(e)
    shapes.point3 = action.add.point.absoluteCoord([], coord, { opacity: 0.2 })
    shapes.line2 = action.add.line.twoPoints([shapes.point2, shapes.point3], {}, { opacity: 0.2 })
    shapes.line3 = action.add.line.twoPoints([shapes.point3, shapes.point1], {}, { opacity: 0.2 })
    canvasRef.current.addEventListener("mousemove", func8)
  }
  // Step 8: Moves point3 along the cursor.
  const func8 = (e: MouseEvent) => {
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point3, coord)
    canvasRef.current.addEventListener("click", func9, { once: true })
  }
  // Step 9: Settles point3 on click.
  const func9 = (e: MouseEvent) => {
    canvasRef.current.removeEventListener("mousemove", func8)
    const coord = getCoord(e)
    action.update.point.absoluteCoord.move(shapes.point3, coord)
    action.update.style(shapes.point3, { opacity: 1 })
    action.update.style(shapes.line2, { opacity: 1 })
    action.update.style(shapes.line3, { opacity: 1 })
    canvasRef.current.style.cursor = "auto"
  } 
  canvasRef.current.addEventListener("mousemove", func1, { once: true })
}

export default function App() {
  const { shapes: s, action: a } = useShapes()
  const canvasRef = React.useRef(null)

  React.useEffect(() => {
    const pointA = a.add.point.absoluteCoord([], { x: 200, y: 400 }, { r: 5 })
    const pointB = a.add.point.absoluteCoord([], { x: 400, y: 200 }, { visibility: 'hidden' })
    const pointC = a.add.point.internalDivision([pointA, pointB], { ratio: 0.1 })
    const pointD = a.add.point.absoluteCoord([], { x: 500, y: 300 })
    const lineL = a.add.line.twoPoints([pointA, pointB], { extend2: true })
    const lineM = a.add.line.twoPoints([pointC, pointD], {})
    a.update.line.cut(lineL, lineM, true)
    createTriangle(canvasRef, a)
  }, [])

  return (
    <div>
      <div>THIS IS SHAPE PAINT APP</div>
      <div className="test-field"></div>
      <RCanvas shapes={s} ref={canvasRef} />
    </div>
  )
}
