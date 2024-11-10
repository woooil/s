import * as React from 'react'
import {
  RShape,
  RPoint,
  RLine,
  RLabel,
  RAngle,
  RLength,
  RMarker,
  RPolygon,
  RArc,
} from '../../lib/relational-shapes'
import Point from './Point'
import Line from './Line'
import Label from './Label'
import Angle from './Angle'
import Length from './Length'
import Marker from './Marker'
import Polygon from './Polygon'
import Arc from './Arc'

export default function Shape({ shape, ...props }: { shape: RShape }) {
  switch (shape.resType) {
    case RPoint.RES_TYPE:
      return (
        <Point
          resolved={(shape as RPoint).resolve()}
          {...props}
        />
      )
    case RLine.RES_TYPE:
      return (
        <Line
          resolved={(shape as RLine).resolve()}
          {...props}
        />
      )
    case RLabel.RES_TYPE:
      return (
        <Label
          resolved={(shape as RLabel).resolve()}
          {...props}
        />
      )
    case RAngle.RES_TYPE:
      return (
        <Angle
          resolved={(shape as RAngle).resolve()}
          {...props}
        />
      )
    case RLength.RES_TYPE:
      return (
        <Length
          resolved={(shape as RLength).resolve()}
          {...props}
        />
      )
    case RMarker.RES_TYPE:
      return (
        <Marker
          resolved={(shape as RMarker).resolve()}
          {...props}
        />
      )
    case RPolygon.RES_TYPE:
      return (
        <Polygon
          resolved={(shape as RPolygon).resolve()}
          {...props}
        />
      )
    case RArc.RES_TYPE:
      return (
        <Arc
          resolved={(shape as RArc).resolve()}
          {...props}
        />
      )
    default:
      return (
        <></>
      )
  }
}