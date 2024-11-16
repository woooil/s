import * as React from 'react'
import { v4 as uuid } from 'uuid'
import { Props } from '../ComponentProps'
import { RMarkerResolved } from './Rmarker'

function Path({ marker, id }: { marker: string, id: string }) {
  switch (marker) {
    case '>':
      return (
        <marker id={id} markerWidth='10' markerHeight='8' refX='5' refY='4' orient='auto'>
          <path d='M 0 0 L 10 4 0 8 2 4 Z' fill='black'/>
        </marker>
      )
    case '>>':
      return (
        <marker id={id} markerWidth='16' markerHeight='8' refX='8' refY='4' orient='auto'>
          <path d='M 0 0 L 10 4 0 8 2 4 Z M 6 0 L 16 4 6 8 8 4 Z' fill='black'/>
        </marker>
      )
    case 'rotate':
      return (
        <marker id={id} markerWidth='28' markerHeight='24' refX='14' refY='12' orient='0'>
          <path d='M 10 6 A 12 6 0 1 0 18 6' fill='none' stroke='black' strokeWidth='1' />
          <path d='M 24 4 L 18 6 21 11 22 7 Z' fill='black' />
        </marker>
      )
    default:
      return (
        <marker id={id} markerWidth='1' markerHeight='10' refX='0' refY='5' orient='auto'>
          <path d='M 0 0 L 0 10' stroke='black' strokeWidth='1' />
        </marker>
      )
  }
}

export default function Marker({
  resolved,
  ...props
}: Props<RMarkerResolved, SVGGElement>) {
  const r = 1
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
        <Path marker={resolved.marker} id={id}/>
      </defs>
      <path {...attr}/>
    </g>
  )
}