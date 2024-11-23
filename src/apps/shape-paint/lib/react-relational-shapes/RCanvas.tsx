import * as React from 'react'
import { RShape } from './RShape'

export function RCanvas({ shapes, ...prop }: { shapes: RShape<any>[] }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="800px"
      height="600px"
      style={{ border: '1px solid blue' }}
      {...prop}>
      {shapes.map(i => i.component({}))}
    </svg>
  )
}
