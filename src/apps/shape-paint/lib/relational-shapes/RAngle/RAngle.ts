import { Coord } from '../Coord'
import { RShapeResolved, RShapeProp, RShape } from '../RShape'

interface RAngleResolved extends RShapeResolved, Coord {
  theta0: number
  theta: number
  marker: string
}

interface RAngleProp extends RShapeProp {}

abstract class RAngle extends RShape {
  public static TYPE = 'RAngle'

  constructor(dependencies: RShape[], prop: RAngleProp) {
    super(dependencies, prop, RAngle.TYPE)
  }

  public abstract resolve(): RAngleResolved
}

export { RAngleResolved, RAngleProp, RAngle }