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

function AngleElement({
  resolved,
  ...props
}: Props<Shape.AngleResolved, SVGPathElement>) {
  const r = 50
  const rxcc = Math.abs(resolved.theta) % (2 * Math.PI)
  const rxc =  rxcc > Math.PI ? 1 : 2 * Math.cos(rxcc + Math.PI / 2) + 3 // The smaller theta, the bigger rx so that the marker is more distinguishable.
  const p = {
    i: {
      x: resolved.x + r * Math.cos(resolved.theta0),
      y: resolved.y + r * Math.sin(resolved.theta0)
    },
    rx: r * rxc,
    ry: r,
    rotation: (resolved.theta0 + resolved.theta / 2) * 180 / Math.PI,
    sweepFlag: resolved.theta > 0 ? 1 : 0,
    f: {
      x: resolved.x + r * Math.cos(resolved.theta + resolved.theta0),
      y: resolved.y + r * Math.sin(resolved.theta + resolved.theta0)
    }
  }
  const d = `M ${p.i.x} ${p.i.y} A ${p.rx} ${p.ry} ${p.rotation} 0 ${p.sweepFlag} ${p.f.x} ${p.f.y}`
  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
  }

  return (
    <path
      {...attr}
      {...props}
    />
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
    case Shape.Angle.TYPE:
      return (
        <AngleElement
          resolved={(shape as Shape.Angle).resolve()}
          {...props}
        />
      )
  }
}

export { ShapeElement, PointElement, LineElement, LabelElement }
