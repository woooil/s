import * as React from 'react'
import { Props } from './Props'
import { RLineResolved } from '../../lib/relational-shapes'

export default function Line({
  resolved,
  ...props
}: Props<RLineResolved, SVGLineElement>) {
  const extend = (coord: RS.Coord, ref: RS.Coord) => {
    return {
      x: coord.x + (coord.x - ref.x) * (2 << 10),
      y: coord.y + (coord.y - ref.y) * (2 << 10),
    }
  }

  const tempA = resolved.extendA ? extend(resolved.a, resolved.b) : resolved.a
  resolved.b = resolved.extendB ? extend(resolved.b, resolved.a) : resolved.b
  resolved.a = tempA

  const attr = {
    x1: resolved.a.x,
    y1: resolved.a.y,
    x2: resolved.b.x,
    y2: resolved.b.y,
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