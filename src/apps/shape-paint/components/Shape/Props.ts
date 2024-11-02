import * as React from 'react'

export type Props<R, S, T> = {
  resolved: R
  styles?: S
} & React.AllHTMLAttributes<T> &
  React.SVGAttributes<T>