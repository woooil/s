import { DependeciesInitError } from '../Error'
import { RPoint } from '../RPoint'
import { RLengthProp, RLength } from './RLength'

interface RLengthTwoPointsProp extends RLengthProp {
}

class RLengthTwoPoints extends RLength {
  public static TYPEL2 = 'RLengthTwoPoints'
  protected declare __dependencies: RPoint[]
  protected declare __prop: RLengthTwoPointsProp


  constructor(dependencies: RPoint[], prop: RLengthTwoPointsProp) {
    if (
      dependencies.length !== 2 ||
      !dependencies.every(i => i.type[0] === RPoint.TYPEL1)
    )
      throw DependeciesInitError(
        2,
        RPoint.TYPEL1,
        dependencies.map(i => i.id),
      )
    super(dependencies, prop, RLengthTwoPoints.TYPEL2)
  }

  preresolve() {
    const aResolved = this.__dependencies[0].resolve()
    const bResolved = this.__dependencies[1].resolve()

    return {
      a: aResolved,
      b: bResolved,
      r: 0,
      ny: this.__prop.ny,
    }
  }
}

export { RLengthTwoPointsProp, RLengthTwoPoints }