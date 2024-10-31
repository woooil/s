import * as React from 'react'
import {
  RShape,
  RPoint,
  RLine,
  RLabel,
  RAngle
} from '../../lib/relational-shapes'
import Point from './Point'
import Line from './Line'
import Label from './Label'
import Angle from './Angle'

export default function Shape({ shape, ...props }: { shape: RShape }) {
  switch (shape.type[0]) {
    case RPoint.TYPEL1:
      return (
        <Point
          resolved={(shape as RPoint).resolve()}
          {...props}
        />
      )
    case RLine.TYPEL1:
      return (
        <Line
          resolved={(shape as RLine).resolve()}
          {...props}
        />
      )
    case RLabel.TYPEL1:
      return (
        <Label
          resolved={(shape as RLabel).resolve()}
          {...props}
        />
      )
    case RAngle.TYPEL1:
      return (
        <Angle
          resolved={(shape as RAngle).resolve()}
          {...props}
        />
      )
  }
}