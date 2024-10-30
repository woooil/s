import * as React from 'react'
import { RShape, RLine } from './relational-shapes'

interface Action {
  add: <T extends RShape>(shape: T) => T
  delete: <T extends RShape>(shape: T, cacade?: boolean) => T
  cutLine: (rline: RLine, cut: RLine, selectA: boolean) => RLine
  uncutLine: (rline: RLine, selectA: boolean) => RLine
}

function useShapes() {
  const [shapes, setShapes] = React.useState<RShape[]>([])

  const addShape: <T extends RShape>(shape: T) => T = shape => {
    setShapes(i => {
      if (!shape.dependencies.every(j => i.includes(j))) {
        throw new Error('Dependencies are not in shapes.')
      }
      return [...i, shape]
    })
    return shape
  }

  const deleteShape: <T extends RShape>(shape: T, cascade?: boolean) => T = (
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

  const cutLine = (rline: RLine, cut: RLine, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.cut(cut, selectA)
      return [...i]
    })
    return rline
  }

  const uncutLine = (rline: RLine, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.uncut(selectA)
      return [...i]
    })
    return rline
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
