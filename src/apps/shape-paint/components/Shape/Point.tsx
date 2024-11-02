import * as React from 'react'
import { Props } from './Props'
import { RPointResolved } from '../../lib/relational-shapes'

export default function Point({
  resolved,
  ...props
}: Props<RPointResolved, SVGCircleElement>) {
  const attr = {
    cx: resolved.coord.x,
    cy: resolved.coord.y,
    r: 3,
    fill: resolved.hide ? 'none' : 'black',
  }
  
  return (
    <circle
      {...attr}
      {...props}
    />
  )
}