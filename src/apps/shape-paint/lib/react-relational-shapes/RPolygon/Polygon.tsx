import * as React from 'react'
import { Props } from '../ComponentProps'
import { RPolygonResolved } from './RPolygon'

export default function Polygon({
  resolved,
  ...props
}: Props<RPolygonResolved, SVGPolygonElement>) {
  const points = resolved.coords.map(coord => `${coord.x} ${coord.y} `).join(' ').trimEnd()
  
  const attr = {
    points,
    fill: 'none',
    stroke: 'black',
    strokeWidth: 2,
  }

  return (
    <polygon {...attr} />
  )
}