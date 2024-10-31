import * as React from 'react'
import * as RS from './relational-shapes'

interface Action {
  add: <T extends RS.RShape>(shape: T) => T
  delete: <T extends RS.RShape>(shape: T, cacade?: boolean) => T
  cutLine: (rline: RS.RLine, cut: RS.RLine, selectA: boolean) => RS.RLine
  uncutLine: (rline: RS.RLine, selectA: boolean) => RS.RLine
  equalAngle: (rangle: RS.RAngle, rangle2: RS.RAngle, marker: string) => RS.RAngle
}

function useShapes() {
  const [shapes, setShapes] = React.useState<RS.RShape[]>([])

  const addShape: <T extends RS.RShape>(shape: T) => T = shape => {
    setShapes(i => {
      if (!shape.dependencies.every(j => i.includes(j))) {
        throw new Error('Dependencies are not in shapes.')
      }
      return [...i, shape]
    })
    return shape
  }

  const deleteShape: <T extends RS.RShape>(shape: T, cascade?: boolean) => T = (
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

  const cutLine = (rline: RS.RLine, cut: RS.RLine, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.cut(cut, selectA)
      return [...i]
    })
    return rline
  }

  const uncutLine = (rline: RS.RLine, selectA: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.uncut(selectA)
      return [...i]
    })
    return rline
  }

  const equalAngle = (rangle: RS.RAngle, rangle2: RS.RAngle, marker: string) => {
    setShapes(i => {
      if (!i.includes(rangle) || !i.includes(rangle2)) throw new Error('No such shape in shapes')
      rangle.equal(rangle2, marker)
      return [...i]
    })
    return rangle
  }

  const action: Action = {
    add: addShape,
    delete: deleteShape,
    cutLine: cutLine,
    uncutLine: uncutLine,
    equalAngle: equalAngle
  }

  return { shapes, action }
}

export { Action, useShapes }
