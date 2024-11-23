import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Props } from '../ComponentProps'
import { RLabelResolved } from './RLabel'

function Arrow({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
}) {
  const theta = Math.atan2(y2 - y1, x2 - x1)
  const r = 20
  const p = {
    M: {
      x: x1,
      y: y1,
    },
    QC: {
      x: (x1 + x2) / 2 + r * Math.sin(theta),
      y: (y1 + y2) / 2 - r * Math.cos(theta),
    },
    QF: {
      x: x2,
      y: y2,
    },
  }

  const d = `M ${p.M.x} ${p.M.y} Q ${p.QC.x} ${p.QC.y} ${p.QF.x} ${p.QF.y}`

  const id = `arrow-${uuid()}`

  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
    markerStart: `url(#${id})`,
  }

  return (
    <>
      <defs>
        <marker
          id={id}
          markerWidth="10"
          markerHeight="8"
          refX="0"
          refY="4"
          orient="auto">
          <path
            d="M 10 0 L 0 4 10 8 8 4 Z"
            fill="black"
          />
        </marker>
      </defs>
      <path {...attr} />
    </>
  )
}

export default function Label({
  resolved,
  styles,
  ...props
}: Props<RLabelResolved, SVGGElement>) {
  const attr = {
    x: resolved.coord.x,
    y: resolved.coord.y,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontFamily: 'Latin Modern',
    fontSize: '24px',
    stroke: 'white',
    strokeWidth: '0.3em',
    strokeLinejoin: 'round' as 'round',
    paintOrder: 'stroke',
  }

  if (resolved.offsite) {
    attr.x += resolved.offsite.r * Math.cos(resolved.offsite.theta.t)
    attr.y += resolved.offsite.r * Math.sin(resolved.offsite.theta.t)
    const theta = Math.atan2(
      attr.y - resolved.coord.y,
      attr.x - resolved.coord.x,
    )
    if (-Math.PI / 4 < theta && theta <= Math.PI / 4) attr.textAnchor = 'start'
    else if (Math.PI / 4 < theta && theta <= (Math.PI * 3) / 4)
      attr.dominantBaseline = 'text-top'
    else if ((Math.PI * 3) / 4 < theta || theta <= (-Math.PI * 3) / 4)
      attr.textAnchor = 'end'
    else attr.dominantBaseline = 'text-bottom'
  }

  return (
    <g {...props}>
      {resolved.offsite && (
        <Arrow
          x1={resolved.coord.x}
          y1={resolved.coord.y}
          x2={attr.x}
          y2={attr.y}
        />
      )}
      <text
        {...attr}
        {...styles}>
        {resolved.label}
      </text>
    </g>
  )
}
