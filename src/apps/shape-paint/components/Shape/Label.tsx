import * as React from 'react'
import { Props } from './Props'
import { RLabelResolved } from '../../lib/relational-shapes'

export default function Label({
  resolved,
  ...props
}: Props<RLabelResolved, SVGTextElement>) {
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