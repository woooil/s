import * as React from 'react'
import { Props } from '../ComponentProps'
import { RLineResolved } from './RLine'
import { Coord } from '../Coord'

export default function Line({
  resolved,
  ...props
}: Props<RLineResolved, SVGLineElement>) {
  const extend = (coord: Coord, ref: Coord) => {
    return new Coord(
      coord.x + (coord.x - ref.x) * (2 << 10),
      coord.y + (coord.y - ref.y) * (2 << 10),
    )
  }

  const tempA = resolved.extend1 ? extend(resolved.coord1, resolved.coord2) : resolved.coord1
  resolved.coord2 = resolved.extend2 ? extend(resolved.coord2, resolved.coord1) : resolved.coord2
  resolved.coord1 = tempA

  const attr = {
    x1: resolved.coord1.x,
    y1: resolved.coord1.y,
    x2: resolved.coord2.x,
    y2: resolved.coord2.y,
    stroke: 'black',
    strokeWidth: 2,
  }

  return (
    <line
      {...attr}
      {...props}
    />
  )
}