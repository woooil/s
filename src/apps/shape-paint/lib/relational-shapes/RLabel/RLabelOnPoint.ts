import { CoordPolar, Coords } from '../Coord'
import { RLabelProp, RLabel } from './RLabel'
import { RPoint } from '../RPoint'
import { DependeciesInitError } from '../Error'

interface RLabelOnPointProp extends RLabelProp, CoordPolar {}

class RLabelOnPoint extends RLabel {
  public static TYPEL2 = 'RLabelOnPoint'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLabelOnPointProp

  constructor(dependencies: RPoint[], prop: RLabelOnPointProp) {
    if (
      dependencies.length !== 1 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        1,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLabelOnPoint.TYPEL2)
  }

  resolve() {
    const aResolved = this.__dependencies[0].resolve()
    const offsetCoord = Coords.toCartesian(this.__prop)

    return {
      ...Coords.add(aResolved, offsetCoord),
      label: this.__prop.label,
    }
  }
}

export { RLabelOnPointProp, RLabelOnPoint }
