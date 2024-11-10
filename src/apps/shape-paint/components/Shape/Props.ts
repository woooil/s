import * as React from 'react'

export type Props<R, T> = {
  resolved: R
} & React.AllHTMLAttributes<T> &
  React.SVGAttributes<T>