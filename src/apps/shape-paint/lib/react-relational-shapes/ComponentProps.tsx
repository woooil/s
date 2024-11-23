import * as React from 'react'

export type Props<R, T> = {
  resolved: R
  styles: React.SVGAttributes<T>
  key: any
} & React.AllHTMLAttributes<T> &
  React.SVGAttributes<T>
