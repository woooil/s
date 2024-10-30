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
  switch (shape.type) {
    case RPoint.TYPE:
      return (
        <Point
          resolved={(shape as RPoint).resolve()}
          {...props}
        />
      )
    case RLine.TYPE:
      return (
        <Line
          resolved={(shape as RLine).resolve()}
          {...props}
        />
      )
    case RLabel.TYPE:
      return (
        <Label
          resolved={(shape as RLabel).resolve()}
          {...props}
        />
      )
    case RAngle.TYPE:
      return (
        <Angle
          resolved={(shape as RAngle).resolve()}
          {...props}
        />
      )
  }
}