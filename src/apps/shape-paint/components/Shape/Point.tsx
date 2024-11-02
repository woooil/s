import * as React from 'react'
import { Props } from './Props'
import { RPointResolved, RPointStyle } from '../../lib/relational-shapes'

export default function Point({
  resolved,
  styles,
  ...props
}: Props<RPointResolved, RPointStyle, SVGCircleElement>) {
  const attr = {
    cx: resolved.coord.x,
    cy: resolved.coord.y,
    r: 3,
    fill: styles?.hide ? 'none' : 'black',
  }
  
  return (
    <circle
      {...attr}
      {...props}
    />
  )
}