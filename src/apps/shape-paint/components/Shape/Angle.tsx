import * as React from 'react'
import { Props } from './Props'
import { RAngleResolved } from '../../lib/relational-shapes'

export default function Angle({
  resolved,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
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