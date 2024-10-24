import * as React from 'react'
import * as Shape from './relational-shapes'

type Props<R, T> = {
  resolved: R
} & React.AllHTMLAttributes<T> &
  React.SVGAttributes<T>

function PointElement({
  resolved,
  ...props
}: Props<Shape.PointResolved, SVGCircleElement>) {
  const attr = {
    cx: resolved.x,
    cy: resolved.y,
    r: 3,
    fill: 'black',
  }

  return (
    <circle
      {...attr}
      {...props}
    />
  )
}

function LineElement({
  resolved,
  ...props
}: Props<Shape.LineResolved, SVGLineElement>) {
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

  return (
    <line
      {...attr}
      {...props}
      key={'s'}
    />
  )
}

function LabelElement({
  resolved,
  ...props
}: Props<Shape.LabelResolved, SVGTextElement>) {
  const attr = {
    x: resolved.x,
    y: resolved.y,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontFamily: 'Latin Modern',
    fontSize: '24px',
  }

  return (
    <text
      {...attr}
      {...props}>
      {resolved.label}
    </text>
  )
}

function ShapeElement({ shape, ...props }: { shape: Shape.Shape }) {
  switch (shape.type) {
    case Shape.Point.TYPE:
      return (
        <PointElement
          resolved={(shape as Shape.Point).resolve()}
          {...props}
        />
      )
    case Shape.Line.TYPE:
      return (
        <LineElement
          resolved={(shape as Shape.Line).resolve()}
          {...props}
        />
      )
    case Shape.Label.TYPE:
      return (
        <LabelElement
          resolved={(shape as Shape.Label).resolve()}
          {...props}
        />
      )
  }
}

export { ShapeElement, PointElement, LineElement, LabelElement }
