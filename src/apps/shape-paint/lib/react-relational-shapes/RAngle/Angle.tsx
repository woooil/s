import * as React from 'react'
import { Props } from '../ComponentProps'
import { RAngleResolved } from './RAngle'

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
  style,
  ...props
}: Props<RAngleResolved, SVGCircleElement>) {
  const std = getStandard(resolved.theta.t)
  const thetaMid = resolved.theta.t / 2 + resolved.theta0.t

  const attr = {
    cx: resolved.coord.x + std.r * Math.cos(thetaMid),
    cy: resolved.coord.y + std.r * Math.sin(thetaMid),
    r: std.size / 4,
    fill: 'black',
    ...style
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
  style,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
  const std = getStandard(resolved.theta.t)
  const theta = resolved.theta.t / 2 + resolved.theta0.t
  const phi = Math.PI / 4 - theta
  const p = {
    M0: {
      x: resolved.coord.x + std.r * Math.cos(theta) - std.size / 2 * Math.cos(phi),
      y: resolved.coord.y + std.r * Math.sin(theta) + std.size / 2 * Math.sin(phi),
    },
    l1: {
      x: std.size * Math.cos(phi),
      y: -std.size * Math.sin(phi),
    },
    M2: {
      x: resolved.coord.x + std.r * Math.cos(theta) - std.size / 2 * Math.sin(phi),
      y: resolved.coord.y + std.r * Math.sin(theta) - std.size / 2 * Math.cos(phi),
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
    ...style
  }

  return (
    <path
      {...attr}
      {...props}
    />
  )
}

function AngleRight({
  resolved,
  style,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
  const std = getStandard(resolved.theta.t)
  const cos = Math.cos(resolved.theta0.t)
  const sin = Math.sin(resolved.theta0.t)
  const flag = resolved.theta.t > 0 ? 1 : -1
  const p = {
    M: {
      x: resolved.coord.x + std.size * cos,
      y: resolved.coord.y + std.size * sin,
    },
    L1: {
      x: resolved.coord.x + std.size * (cos - flag * sin),
      y: resolved.coord.y + std.size * (sin + flag * cos),
    },
    L2: {
      x: resolved.coord.x - flag * std.size * sin,
      y: resolved.coord.y + flag * std.size * cos,
    }
  }
  const d = `M ${p.M.x} ${p.M.y} L ${p.L1.x} ${p.L1.y} ${p.L2.x} ${p.L2.y}`
  
  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
    ...style
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
  style,
  ...props
}: Props<RAngleResolved, SVGPathElement>) {
  const std = getStandard(resolved.theta.t)
  const p = {
    i: {
      x: resolved.coord.x + std.r * Math.cos(resolved.theta0.t),
      y: resolved.coord.y + std.r * Math.sin(resolved.theta0.t)
    },
    rx: std.r,
    ry: std.r / std.scale,
    rotation: (resolved.theta0.t + resolved.theta.t / 2) * 180 / Math.PI,
    largeArcFlag: Math.abs(resolved.theta.t) > Math.PI ? 1 : 0,
    sweepFlag: resolved.theta.t > 0 ? 1 : 0,
    f: {
      x: resolved.coord.x + std.r * Math.cos(resolved.theta.t + resolved.theta0.t),
      y: resolved.coord.y + std.r * Math.sin(resolved.theta.t + resolved.theta0.t)
    }
  }
  const d = `M ${p.i.x} ${p.i.y} A ${p.rx} ${p.ry} ${p.rotation} ${p.largeArcFlag} ${p.sweepFlag} ${p.f.x} ${p.f.y}`
  const attr = {
    d: d,
    fill: 'none',
    stroke: 'black',
    strokeWidth: '1',
    ...style
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
  style,
  ...props
}: Props<RAngleResolved, SVGGeometryElement>) {
  switch (resolved.marker) {
    case 'o':
      return (
        <AngleO resolved={resolved} style={style} {...props} />
      )
    case 'x':
      return (
        <AngleX resolved={resolved} style={style} {...props} />
      )
    case 'right':
      return (
        <AngleRight resolved={resolved} style={style} {...props} />
      )
    default:
      return (
        <AngleDefault resolved={resolved} style={style} {...props} />
      )
  }
}
