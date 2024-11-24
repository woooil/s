import * as React from 'react'
import component from '../component'
import { Props } from '../ComponentProps'
import { RLineResolved } from './RLine'
import { Coord } from '../Coord'

export default component(function Line({
  resolved,
  styles,
  ...props
}: Props<RLineResolved, SVGLineElement>) {
  const extend = (coord: Coord, ref: Coord) => {
    return new Coord(
      coord.x + (coord.x - ref.x) * (2 << 10),
      coord.y + (coord.y - ref.y) * (2 << 10),
    )
  }

  const tempA = resolved.extend1
    ? extend(resolved.coord1, resolved.coord2)
    : resolved.coord1
  const coord2 = resolved.extend2
    ? extend(resolved.coord2, resolved.coord1)
    : resolved.coord2
  const coord1 = tempA

  const attr = {
    x1: coord1.x,
    y1: coord1.y,
    x2: coord2.x,
    y2: coord2.y,
    stroke: 'black',
    strokeWidth: 2,
    ...styles,
  }

  return (
    <line
      {...attr}
      {...props}
    />
  )
})
