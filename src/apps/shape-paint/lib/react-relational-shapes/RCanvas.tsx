import * as React from 'react'
import { RShape } from './RShape'

type Props = {
  shapes: RShape<any>[]
}

export const RCanvas = React.forwardRef<SVGSVGElement, Props>(({ shapes, ...prop }, ref) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="800px"
      height="600px"
      style={{ border: '1px solid blue' }}
      {...prop}
      ref={ref}>
      {shapes.map(i => i.component())}
    </svg>
  )
 })
