import * as React from 'react'
import { Shape } from './Shape'
import { Line } from './Line'

interface Action {
  add: <T extends Shape>(shape: T) => T
  delete: <T extends Shape>(shape: T, cacade?: boolean) => T
  cutLine: (line: Line, cut: Line, cutA: boolean) => Line
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

  const cutLine = (line: Line, cut: Line, cutA: boolean) => {
    setShapes(i => {
      if (!i.includes(line)) throw new Error('No such shape in shapes')
      line.cut(cut, cutA)
      return [...i]
    })
    return line
  }

  const action: Action = {
    add: addShape,
    delete: deleteShape,
    cutLine: cutLine,
  }

  return { shapes, action }
}

export { Action, useShapes }
