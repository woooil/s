import { memo, FunctionComponent } from "react"

export default function component(Child: FunctionComponent) {
  return memo(Child, (a, b) => JSON.stringify(a) === JSON.stringify(b))
}
