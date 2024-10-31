import * as React from 'react'
import { Props } from './Props'
import { RAngleResolved } from '../../lib/relational-shapes'

function getStandard(theta: number) {
  const mag = 2
  const dx = Math.abs(theta) % (2 * Math.PI)
  const scale = dx > Math.PI ? 1 : mag * Math.cos(dx + Math.PI / 2) + mag + 1 // The smaller theta, the bigger scale so that the marker is more distinguishable.
  return {
    r: 20 * scale,
    size: 10,
    scale: scale,
  }
}

function AngleO({
  resolved,
  ...props
}: Props<RAngleResolved, SVGCircleElement>) {
  const std = getStandard(resolved.theta)
  const thetaMid = resolved.theta / 2 + resolved.theta0

  const attr = {
    cx: resolved.x + std.r * Math.cos(thetaMid),
    cy: resolved.y + std.r * Math.sin(thetaMid),
    r: std.size / 4,
    fill: 'black',
  }

  return (
    <circle
      {...attr}
      {...props}
    />
  )
}

function AngleX({
  resolved,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
  const std = getStandard(resolved.theta)
  const theta = resolved.theta / 2 + resolved.theta0
  const phi = Math.PI / 4 - theta
  const p = {
    M0: {
      x: resolved.x + std.r * Math.cos(theta) - std.size / 2 * Math.cos(phi),
      y: resolved.y + std.r * Math.sin(theta) + std.size / 2 * Math.sin(phi),
    },
    l1: {
      x: std.size * Math.cos(phi),
      y: -std.size * Math.sin(phi),
    },
    M2: {
      x: resolved.x + std.r * Math.cos(theta) - std.size / 2* Math.sin(phi),
      y: resolved.y + std.r * Math.sin(theta) - std.size / 2 * Math.cos(phi),
    },
    l2: {
      x: std.size * Math.sin(phi),
      y: std.size * Math.cos(phi),
    }
  }
  const d = `M ${p.M0.x} ${p.M0.y} l ${p.l1.x} ${p.l1.y} M ${p.M2.x} ${p.M2.y} l ${p.l2.x} ${p.l2.y}`

  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
  }

  return (
    <path
      {...attr}
      {...props}
    />
  )
}

function AngleDefault({
  resolved,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
  const std = getStandard(resolved.theta)
  const p = {
    i: {
      x: resolved.x + std.r * Math.cos(resolved.theta0),
      y: resolved.y + std.r * Math.sin(resolved.theta0)
    },
    rx: std.r,
    ry: std.r / std.scale,
    rotation: (resolved.theta0 + resolved.theta / 2) * 180 / Math.PI,
    sweepFlag: resolved.theta > 0 ? 1 : 0,
    f: {
      x: resolved.x + std.r * Math.cos(resolved.theta + resolved.theta0),
      y: resolved.y + std.r * Math.sin(resolved.theta + resolved.theta0)
    }
  }
  const d = `M ${p.i.x} ${p.i.y} A ${p.rx} ${p.ry} ${p.rotation} 0 ${p.sweepFlag} ${p.f.x} ${p.f.y}`
  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
  }

  return (
    <path
      {...attr}
      {...props}
    />
  )
}

export default function Angle({
  resolved,
  ...props
}: Props<RAngleResolved, SVGGeometryElement>) {
  switch (resolved.marker) {
    case 'o':
      return (
        <AngleO resolved={resolved} {...props} />
      )
    case 'x':
      return (
        <AngleX resolved={resolved} {...props} />
      )
    default:
      return (
        <AngleDefault resolved={resolved} {...props} />
      )
  }
}