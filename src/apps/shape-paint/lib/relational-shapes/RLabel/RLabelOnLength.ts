import { RLabelProp, RLabel } from './RLabel'
import { RLength } from '../RLength'
import { DependeciesInitError } from '../Error'

interface RLabelOnLengthProp extends RLabelProp {}

class RLabelOnLength extends RLabel {
  public static TYPEL2 = 'RLabelOnLength'
  protected declare __dependencies: RLength[]
  protected declare __prop: RLabelOnLengthProp

  constructor(dependencies: RLength[], prop: RLabelOnLengthProp) {
    if (
      dependencies.length !== 1 ||
      !dependencies.every(i => i.type[0] === RLength.TYPEL1)
    )
      throw DependeciesInitError(
        1,
        RLength.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLabelOnLength.TYPEL2)
  }

  resolve() {
    const resolved = this.__dependencies[0].resolve()
    const theta = Math.atan2(resolved.b.y - resolved.a.y, resolved.b.x - resolved.a.x)
    const coord = {
      x: (resolved.a.x + resolved.b.x) / 2 + (resolved.ny ? 1 : -1) * resolved.r * Math.sin(theta),
      y: (resolved.a.y + resolved.b.y) / 2 - (resolved.ny ? 1 : -1) * resolved.r * Math.cos(theta),
    }
    return {
      ...coord,
      label: this.__prop.label
    }
  }
}

export { RLabelOnLengthProp, RLabelOnLength }