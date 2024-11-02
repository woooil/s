import * as React from 'react'
import { Props } from './Props'
import { RLengthResolved, RLengthStyle } from '../../lib/relational-shapes'

export default function Length({
  resolved,
  styles,
  ...props
}: Props<RLengthResolved, RLengthStyle, SVGPathElement>) {
  const theta = Math.atan2(resolved.b.y - resolved.a.y, resolved.b.x - resolved.a.x)
  const p = {
    M: {
      x: resolved.a.x,
      y: resolved.a.y,
    }, 
    QC: {
      x: (resolved.a.x + resolved.b.x) / 2 + (resolved.ny ? 1 : -1) * resolved.r * 2 * Math.sin(theta),
      y: (resolved.a.y + resolved.b.y) / 2 - (resolved.ny ? 1 : -1) * resolved.r * 2 * Math.cos(theta),
    },
    QF: {
      x: resolved.b.x,
      y: resolved.b.y,
    }
  }
  const d = `M ${p.M.x} ${p.M.y} Q ${p.QC.x} ${p.QC.y} ${p.QF.x} ${p.QF.y}`

  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
    strokeDasharray: '6, 4',
  }

  return (
    <path
      {...attr}
      {...props}
    />
  )
}