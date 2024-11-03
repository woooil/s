import * as React from 'react'
import { Props } from './Props'
import { RPolygonResolved, RPolygonStyle } from '../../lib/relational-shapes'

export default function Polygon({
  resolved,
  styles,
  ...props
}: Props<RPolygonResolved, RPolygonStyle, SVGPolygonElement>) {
  const points = resolved.coords.map(coord => `${coord.x} ${coord.y} `).join(' ').trimEnd()
  
  const attr = {
    points,
    fill: 'none',
    stroke: 'black',
    strokeWidth: styles?.width || 1,
  }

  return (
    <polygon {...attr} />
  )
}