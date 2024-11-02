import * as React from 'react'
import { Props } from './Props'
import { RLabelResolved } from '../../lib/relational-shapes'

export default function Label({
  resolved,
  ...props
}: Props<RLabelResolved, SVGGElement>) {
  const attr = {
    x: resolved.coord.x,
    y: resolved.coord.y,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
    fontFamily: 'Latin Modern',
    fontSize: '24px',
  }

  const strokeAttr = {
    stroke: 'white',
    strokeWidth: '0.3em',
    strokeLinejoin: 'round'
  }

  return (
    <g {...props}>
      <text {...attr} {...strokeAttr}>
        {resolved.label}
      </text>
      <text {...attr}>
        {resolved.label}
      </text>
    </g>
  )
}