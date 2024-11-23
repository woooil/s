import * as React from 'react'

export type Props<R, T> = {
  resolved: R
  style: React.SVGAttributes<React.ReactSVGElement>
} & React.AllHTMLAttributes<T> &
  React.SVGAttributes<T>
