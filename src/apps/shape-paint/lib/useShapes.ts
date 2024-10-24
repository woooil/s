import * as React from 'react'
import { Shape, Line } from './relational-shapes'

interface Action {
  add: <T extends Shape>(shape: T) => T
  delete: <T extends Shape>(shape: T, cacade?: boolean) => T
  cutLine: (line: Line, cut: Line, selectA: boolean) => Line
  uncutLine: (line: Line, selectA: boolean) => Line
}

function useShapes() {
  const [shapes, setShapes] = React.useState<Shape[]>([])

  const addShape: <T extends Shape>(shape: T) => T = shape => {
    setShapes(i => {
      if (!shape.dependencies.every(j => i.includes(j))) {
        throw new Error('Dependencies are not in shapes.')
      }
      return [...i, shape]
    })
    return shape
  }

  const deleteShape: <T extends Shape>(shape: T, cascade?: boolean) => T = (
    shape,
    cascade = true,
  ) => {
    setShapes(i => {
      if (cascade && shape.dependencies.some(i => shapes.includes(i))) {
        throw new Error('Dependencies are still in shapes.')
      }
      return i.filter(j => !(j === shape || j.dependencies.includes(shape)))
    })
    return shape
  }

  const cutLine = (line: Line, cut: Line, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(line)) throw new Error('No such shape in shapes')
      line.cut(cut, selectA)
      return [...i]
    })
    return line
  }

  const uncutLine = (line: Line, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(line)) throw new Error('No such shape in shapes')
      line.uncut(selectA)
      return [...i]
    })
    return line
  }

  const action: Action = {
    add: addShape,
    delete: deleteShape,
    cutLine: cutLine,
    uncutLine: uncutLine,
  }

  return { shapes, action }
}

export { Action, useShapes }
