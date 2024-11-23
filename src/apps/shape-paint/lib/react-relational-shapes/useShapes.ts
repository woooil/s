import * as React from 'react'
import { NoSuchShapeError } from './Error'
import { RShape } from './RShape'
import * as RAngle from './RAngle'
import * as RArc from './RArc'
import * as RLabel from './RLabel'
import * as RLength from './RLength'
import * as RLine from './RLine'
import * as RMarker from './RMarker'
import * as RPoint from './RPoint'
import * as RPolygon from './RPolygon'

function useShapes() {
  const [shapes, setShapes]: [RShape[], React.Dispatch<React.SetStateAction<RShape[]>>] = React.useState<RShape[]>([])

  const __addShape = (shape: RShape) => {
    setShapes(i => {
      if (!shape.dependencies.every(j => i.includes(j)))
        throw NoSuchShapeError(`dependencies of ${shape}`, 'shapes')
      return [...i, shape]
    })
    return shape
  }

  const addShape = {
    angle: {
      threePoints: (dependencies: [RPoint.RPoint, RPoint.RPoint, RPoint.RPoint], prop: RAngle.RAngleThreePointsProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RAngle.RAngleThreePoints(dependencies, prop, style)),
      twoLines: (dependencies: [RLine.RLine, RLine.RLine], prop: RAngle.RAngleTwoLinesProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RAngle.RAngleTwoLines(dependencies, prop, style)),
    },

    arc: {
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RArc.RArcTwoPointsProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RArc.RArcTwoPoints(dependencies, prop, style))
    },

    label: {
      angle: (dependencies: [RAngle.RAngle], prop: RLabel.RLabelAngleProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLabel.RLabelAngle(dependencies, prop, style)),
      arc: (dependencies: [RArc.RArc], prop: RLabel.RLabelArcProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLabel.RLabelArc(dependencies, prop, style)),
      length: (dependencies: [RLength.RLength], prop: RLabel.RLabelLengthProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLabel.RLabelLength(dependencies, prop, style)),
      line: (dependencies: [RLine.RLine], prop: RLabel.RLabelLineProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLabel.RLabelLine(dependencies, prop, style)),
      point: (dependencies: [RPoint.RPoint], prop: RLabel.RLabelPointProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLabel.RLabelPoint(dependencies, prop, style)),
    },

    length: {
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], _: any) => __addShape(new RLength.RLengthTwoPoints(dependencies, {})),
    },

    line: {
      angleBisector: (dependencies: [RLine.RLine, RLine.RLine], prop: RLine.RLineAngleBisectorProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineAngleBisector(dependencies, prop, style)),
      horizontal: (_: any, prop: RLine.RLineHorizontalProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineHorizontal([], prop, style)),
      oriented: (dependencies: [RPoint.RPoint], prop: RLine.RLineOrientedProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineOriented(dependencies, prop, style)),
      parallel: (dependencies: [RPoint.RPoint, RLine.RLine], prop: RLine.RLineParallelProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineParallel(dependencies, prop, style)),
      perpendicular: (dependencies: [RPoint.RPoint, RLine.RLine], prop: RLine.RLinePerpendicularProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLinePerpendicular(dependencies, prop, style)),
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RLine.RLineTwoPointsProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineTwoPoints(dependencies, prop, style)),
      vertical: (_: any, prop: RLine.RLineVertical, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RLine.RLineVertical([], prop, style)),
    },

    marker: {
      line: (dependencies: [RLine.RLine], prop: RMarker.RMarkerLineProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RMarker.RMarkerLine(dependencies, prop, style)),
    },

    point: {
      absoluteCoord: (_: any, prop: RPoint.RPointAbsoluteCoordProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RPoint.RPointAbsoluteCoord([], prop, style)),
      internalDivision: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RPoint.RPointInternalDivisionProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RPoint.RPointInternalDivision(dependencies, prop, style)),
      intersection: (dependencies: [RLine.RLine, RLine.RLine], prop: RPoint.RPointIntersectionProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RPoint.RPointIntersection(dependencies, prop, style)),
      onLine: (dependencies: [RLine], prop: RPoint.RPointOnLineProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RPoint.RPointOnLine(dependencies, prop, style)),
    },

    polygon: {
      points: (dependencies: RPoint.RPoint[], prop: RPolygon.RPolygonPointsProp, style?: React.SVGAttributes<React.ReactSVGElement>) => __addShape(new RPolygon.RPolygonPoints(dependencies, prop, style)),
    },
  }

  const deleteShape: <T extends RShape>(shape: T, cascade: boolean) => T = (
    shape,
    cascade = true,
  ) => {
    setShapes(i => {
      if (cascade && shape.dependencies.some(i => shapes.includes(i))) {
        throw new Error('Dependencies are still in shapes.')
      }
      return i.filter(j => !(j === shape || j.dependencies.includes(shape)))
    })
    return shape
  }

  const __update = (shapes: RShape[], payload: () => any) => {
    setShapes(i => {
      if (shapes.some(j => !i.includes(j))) throw NoSuchShapeError(`in ${shapes.toString()}`, 'shapes')
      payload()
      return [...i]
    })
  }

  const update = {
    angle: {
      congruent: (rangle: RAngle.RAngle, rangle2: RAngle.RAngle, marker: string) => __update([rangle, rangle2], () => rangle.congruent(rangle2, marker)),
      right: (rangle: RAngle.RAngle) => __update([rangle], () => rangle.right()),
    },

    line: {
      cut: (rline: RLine.RLine, cut: RLine.RLine, select1?: boolean) => __update([rline], () => rline.cut(cut, !!select1)),
      uncut: (rline: RLine.RLine, select1?: boolean) => __update([rline], () => rline.uncut(!!select1)),
    },

    marker: {
      parallel: (rmarker: RMarker.RMarkerOnLine, rmarker2: RMarker.RMarkerOnLine, marker: string) => __update([rmarker, rmarker2], () => rmarker.parallel(rmarker2, marker)),
    }
  }

  const action = {
    add: addShape,
    delete: deleteShape,
    update: update,
  }

  return { shapes, action }
}

export { useShapes }
