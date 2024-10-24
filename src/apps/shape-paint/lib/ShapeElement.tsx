import * as React from 'react'
import * as Shape from './relational-shapes'

function PointElement({ resolved }: { resolved: Shape.PointResolved }) {
  const attr = {
    cx: resolved.x,
    cy: resolved.y,
    r: 3,
    fill: 'black',
  }

  return <circle {...attr} />
}

function LineElement({ resolved }: { resolved: Shape.LineResolved }) {
  const extend = (coord: Shape.Coord, ref: Shape.Coord) => {
    return {
      x: coord.x + (coord.x - ref.x) * (2 << 10),
      y: coord.y + (coord.y - ref.y) * (2 << 10),
    }
  }

  const tempA = resolved.extendA ? extend(resolved.a, resolved.b) : resolved.a
  resolved.b = resolved.extendB ? extend(resolved.b, resolved.a) : resolved.b
  resolved.a = tempA

  const attr = {
    x1: resolved.a.x,
    y1: resolved.a.y,
    x2: resolved.b.x,
    y2: resolved.b.y,
    stroke: 'black',
    strokeWidth: 2,
  }

  return <line {...attr} />
}

function ShapeElement({ shape }: { shape: Shape.Shape }) {
  switch (shape.type) {
    case Shape.Point.TYPE:
      return (
        <PointElement
          resolved={(shape as Shape.Point).resolve()}
          key={shape.id}
        />
      )
    case Shape.Line.TYPE:
      return (
        <LineElement
          resolved={(shape as Shape.Line).resolve()}
          key={shape.id}
        />
      )
  }
}

export { PointElement, LineElement, ShapeElement }
