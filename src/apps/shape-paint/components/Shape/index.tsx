import * as React from 'react'
import {
  RShape,
  RPoint,
  RLine,
  RLabel,
  RAngle,
  RLength,
} from '../../lib/relational-shapes'
import Point from './Point'
import Line from './Line'
import Label from './Label'
import Angle from './Angle'
import Length from './Length'

export default function Shape({ shape, ...props }: { shape: RShape }) {
  switch (shape.type[0]) {
    case RPoint.TYPEL1:
      return (
        <Point
          resolved={(shape as RPoint).resolve()}
          styles={(shape as RPoint).style}
          {...props}
        />
      )
    case RLine.TYPEL1:
      return (
        <Line
          resolved={(shape as RLine).resolve()}
          styles={(shape as RPoint).style}
          {...props}
        />
      )
    case RLabel.TYPEL1:
      return (
        <Label
          resolved={(shape as RLabel).resolve()}
          styles={(shape as RPoint).style}
          {...props}
        />
      )
    case RAngle.TYPEL1:
      return (
        <Angle
          resolved={(shape as RAngle).resolve()}
          styles={(shape as RAngle).style}
          {...props}
        />
      )
    case RLength.TYPEL1:
      return (
        <Length
          resolved={(shape as RLength).resolve()}
          styles={(shape as RLength).style}
          {...props}
        />
      )
  }
}