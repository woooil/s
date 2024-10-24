import { CoordPolar, Coords } from '../Coord'
import { LabelProp, Label } from './Label'
import { Point } from '../Point'
import { DependeciesInitError } from '../Error'

interface LabelOnPointProp extends LabelProp, CoordPolar {}

class LabelOnPoint extends Label {
  protected declare __dependencies: Point[]
  protected declare __prop: LabelOnPointProp

  constructor(dependencies: Point[], prop: LabelOnPointProp) {
    if (
      dependencies.length !== 1 ||
      !dependencies.every(i => i.type === Point.TYPE)
    )
      throw DependeciesInitError(
        1,
        Point.TYPE,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop)
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

export { LabelOnPointProp, LabelOnPoint }
