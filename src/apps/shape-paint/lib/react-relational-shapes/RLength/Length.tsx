import * as React from 'react'
import { Props } from '../ComponentProps'
import { RLengthResolved } from './RLength'

export default function Length({
  resolved,
  style,
  ...props
}: Props<RLengthResolved, SVGPathElement>) {
  const theta = Math.atan2(resolved.coord2.y - resolved.coord1.y, resolved.coord2.x - resolved.coord1.x)
  const p = {
    M: {
      x: resolved.coord1.x,
      y: resolved.coord1.y,
    }, 
    QC: {
      x: (resolved.coord1.x + resolved.coord2.x) / 2 + (resolved.reverse ? 1 : -1) * resolved.curvature * 2 * Math.sin(theta),
      y: (resolved.coord1.y + resolved.coord2.y) / 2 - (resolved.reverse ? 1 : -1) * resolved.curvature * 2 * Math.cos(theta),
    },
    QF: {
      x: resolved.coord2.x,
      y: resolved.coord2.y,
    }
  }
  const d = `M ${p.M.x} ${p.M.y} Q ${p.QC.x} ${p.QC.y} ${p.QF.x} ${p.QF.y}`

  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
    strokeDasharray: '6, 4',
    ...style
  }

  return (
    <path
      {...attr}
      {...props}
    />
  )
}
