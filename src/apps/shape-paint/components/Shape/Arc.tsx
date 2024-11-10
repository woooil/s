import * as React from 'react'
import { Props } from './Props'
import { RArcResolved, Coord } from '../../lib/relational-shapes'

export default function Arc({
  resolved,
  ...props
}: Props<RArcResolved, SVGPathElement>) {
  const p = {
    M: {
      x: resolved.coord.x + resolved.r * Math.cos(resolved.theta0.t),
      y: resolved.coord.y + resolved.r * Math.sin(resolved.theta0.t)
    },
    rx: resolved.r,
    ry: resolved.r,
    rotation: 0,
    largeArcFlag: Math.abs(resolved.theta.t) > Math.PI ? 1 : 0,
    sweepFlag: resolved.theta.t > 0 ? 1 : 0,
    F: {
      x: resolved.coord.x + resolved.r * Math.cos(resolved.theta.t + resolved.theta0.t),
      y: resolved.coord.y + resolved.r * Math.sin(resolved.theta.t + resolved.theta0.t),
    }
  }

  const d = `M ${p.M.x} ${p.M.y} A ${p.rx} ${p.ry} ${p.rotation} ${p.largeArcFlag} ${p.sweepFlag} ${p.F.x} ${p.F.y}`

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