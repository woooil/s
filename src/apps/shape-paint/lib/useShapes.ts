import * as React from 'react'
import * as RS from './relational-shapes'

interface Action {
  add: <T extends RS.RShape>(shape: T) => T
  delete: <T extends RS.RShape>(shape: T, cacade?: boolean) => T
  cutLine: (rline: RS.RLine, cut: RS.RLine, selectA: boolean) => RS.RLine
  uncutLine: (rline: RS.RLine, selectA: boolean) => RS.RLine
  congruentAngle: (rangle: RS.RAngle, rangle2: RS.RAngle, marker: string) => RS.RAngle
  rightAngle: (rangle: RS.RAngle) => RS.RAngle
  parallelLineMarker: (rmarker: RS.RMarkerOnLine, rmarker2: RS.RMarkerOnLine, marker: string) => RS.RLine
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

  const cutLine = (rline: RS.RLine, cut: RS.RLine, select1?: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.cut(cut, !!select1)
      return [...i]
    })
    return rline
  }

  const uncutLine = (rline: RS.RLine, select1?: boolean) => {
    setShapes(i => {
      if (!i.includes(rline)) throw new Error('No such shape in shapes')
      rline.uncut(!!select1)
      return [...i]
    })
    return rline
  }

  const congruentAngle = (rangle: RS.RAngle, rangle2: RS.RAngle, marker: string) => {
    setShapes(i => {
      if (!i.includes(rangle) || !i.includes(rangle2)) throw new Error('No such shape in shapes')
      rangle.congruent(rangle2, marker)
      return [...i]
    })
    return rangle
  }

  const rightAngle = (rangle: RS.RAngle) => {
    setShapes(i => {
      if (!i.includes(rangle)) throw new Error('No such shape in shapes')
      rangle.right()
      return [...i]
    })
    return rangle
  }

  const parallelLineMarker = (rmarker: RS.RMarkerOnLine, rmarker2: RS.RLine, marker: string) => {
    setShapes(i => {
      if (!i.includes(rmarker) || !i.includes(rmarker2)) throw new Error('No such shape in shapes')
      rmarker.parallel(rmarker2, marker)
      return [...i]
    })
    return rmarker
  }

  const action: Action = {
    add: addShape,
    delete: deleteShape,
    cutLine,
    uncutLine,
    congruentAngle,
    rightAngle,
    parallelLineMarker,
  }

  return { shapes, action }
}

export { Action, useShapes }
