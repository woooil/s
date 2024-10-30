import { Coord } from '../Coord'
import { ShapeResolved, ShapeProp, Shape } from '../Shape'

interface AngleResolved extends ShapeResolved, Coord {
  theta0: number
  theta: number
  marker: string
}

interface AngleProp extends ShapeProp {}

abstract class Angle extends Shape {
  public static TYPE = 'Angle'

  constructor(dependencies: Shape[], prop: AngleProp) {
    super(dependencies, prop, Angle.TYPE)
  }

  public abstract resolve(): AngleResolved
}

export { AngleResolved, AngleProp, Angle }