import * as React from 'react'
import component from '../component'
import { Props } from '../ComponentProps'
import { RPolygonResolved } from './RPolygon'

export default component(function Polygon({
  resolved,
  styles,
  ...props
}: Props<RPolygonResolved, SVGPolygonElement>) {
  const points = resolved.coords
    .map(coord => `${coord.x} ${coord.y} `)
    .join(' ')
    .trimEnd()

  const attr = {
    points,
    fill: 'none',
    stroke: 'black',
    strokeWidth: 2,
    ...styles,
  }

  return <polygon {...attr} />
})
