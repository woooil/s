import { Coord } from '../Coord'
import { NotEqualError } from '../Error'
import { RShapeResolved, RShapeProp, RShapeTypeL2, RShape } from '../RShape'

interface RAngleResolved extends RShapeResolved, Coord {
  theta0: number
  theta: number
  marker: string
}

interface RAngleProp extends RShapeProp {
  marker?: string
  equal?: boolean
}

abstract class RAngle extends RShape {
  public static TYPEL1 = 'RAngle'

  protected __dependenciesEqual: RAngle | undefined
  public get dependencies(): RShape[] {
    if (this.__dependenciesEqual) return [...this.__dependencies, this.__dependenciesEqual]
    return this.__dependencies
  }
  protected declare __prop: RAngleProp

  constructor(dependencies: RShape[], prop: RAngleProp, typel2: RShapeTypeL2) {
    super(dependencies, prop, [RAngle.TYPEL1, typel2])
  }

  public abstract resolve(): RAngleResolved

  public equal(rangle: RAngle, marker: string) {
    const sim = (a: number, b: number) => {
      const err = 1E-5
      return Math.abs(a - b) < err
    }
    const theta1 = Math.abs(this.resolve().theta)
    const theta2 = Math.abs(rangle.resolve().theta)
    if (sim(theta1, theta2)) {
      this.__dependenciesEqual = rangle
      this.__prop.marker = marker
      rangle.__dependenciesEqual = this
      rangle.__prop.marker = marker
    } else {
      throw NotEqualError(`RAngle ${this.id}`,`RAngle ${rangle.id}`)
    }
  }
}

export { RAngleResolved, RAngleProp, RAngle }