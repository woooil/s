import * as React from 'react'
import { Props } from '../ComponentProps'
import { RPointResolved } from './RPoint'

export default function Point({
  resolved,
  ...props
}: Props<RPointResolved, SVGCircleElement>) {
  const attr = {
    cx: resolved.coord.x,
    cy: resolved.coord.y,
    r: 3,
    fill: 'black',
  }
  
  return (
    <circle
      {...attr}
      {...props}
    />
  )
}