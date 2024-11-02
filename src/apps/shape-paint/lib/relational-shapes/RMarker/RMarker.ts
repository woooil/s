import { Coord } from '../Coord'
import { ThetaMinimum } from '../Theta'
import { RShapeResolved, RShapeProp, RShapeStyle, RShapeTypeL2, RShape } from '../RShape'

interface RMarkerResolved extends RShapeResolved {
  coord: Coord
  theta: ThetaMinimum
  marker: string
}

interface RMarkerProp extends RShapeProp {
  marker: string
}

interface RMarkerStyle extends RShapeStyle {}

abstract class RMarker extends RShape {
  /**
   * 'RMarker'.
   */
  public static TYPEL1 = 'RMarker'

  constructor(dependencies: RShape[], prop: RMarkerProp, style: RMarkerStyle, typel2: RShapeTypeL2) {
    super(dependencies, prop, style, [RMarker.TYPEL1, typel2])
  }

  public abstract resolve(): RMarkerResolved
}

export { RMarkerResolved, RMarkerProp, RMarkerStyle, RMarker }