import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Props } from './Props'
import { RMarkerResolved, RMarkerStyle } from '../../lib/relational-shapes'

// width: 16
// height: 8
// center: { x: 8, y: 4 }
function Path({ marker }: { marker: string }) {
  switch (marker) {
    case '<':
      return (
        <path d='M 4 0 L 14 4 4 8 6 4 Z' fill='black'/>
      )
    case '<<':
      return (
        <path d='M 0 0 L 10 4 0 8 2 4 Z M 6 0 L 16 4 6 8 8 4 Z' fill='black'/>
      )
    default:
      return (
        <path d='M 5 0 L 5 10' stroke='black' strokeWidth='1' />
      )
  }
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
        <marker id={id} markerWidth='16' markerHeight='8' refX='8' refY='4' orient='auto'>
          <Path marker={resolved.marker} />
        </marker>
      </defs>
      <path {...attr}/>
    </g>
  )
}