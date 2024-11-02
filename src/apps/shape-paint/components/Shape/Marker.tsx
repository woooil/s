import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Props } from './Props'
import { RMarkerResolved, RMarkerStyle } from '../../lib/relational-shapes'

function Path({ marker }: { marker: string }) {
  return (
    <path d="M 0 0 L 10 4 0 8 0 4 Z" fill="black"/>
  )
}

export default function Marker({
  resolved,
  styles,
  ...props
}: Props<RMarkerResolved, RMarkerStyle, SVGGeometryElement>) {
  const r = 10
  const p = {
    M: {
      x: resolved.coord.x,
      y: resolved.coord.y,
    },
    l: {
      x: r * Math.cos(resolved.theta.t),
      y: r * Math.sin(resolved.theta.t),
    }
  }
  const id = `marker-${uuid()}`
  const attr = {
    d: `M ${p.M.x} ${p.M.y} l ${p.l.x} ${p.l.y}`,
    fill: 'none',
    stroke: 'none',
    markerStart: `url(#${id})`
  }

  return (
    <g {...props}>
      <defs>
        <marker id={id} markerWidth="10" markerHeight="8" refX="5" refY="4" orient="auto">
          <Path marker={resolved.marker} />
        </marker>
      </defs>
      <path {...attr}/>
    </g>
  )
}