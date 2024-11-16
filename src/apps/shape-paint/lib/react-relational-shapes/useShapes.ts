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
      threePoints: (dependencies: [RPoint.RPoint, RPoint.RPoint, RPoint.RPoint], prop: RAngle.RAngleThreePointsProp) => __addShape(new RAngle.RAngleThreePoints(dependencies, prop)),
      twoLines: (dependencies: [RLine.RLine, RLine.RLine], prop: RAngle.RAngleTwoLinesProp) => __addShape(new RAngle.RAngleTwoLines(dependencies, prop)),
    },

    arc: {
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RArc.RArcTwoPointsProp) => __addShape(new RArc.RArcTwoPoints(dependencies, prop))
    },

    label: {
      angle: (dependencies: [RAngle.RAngle], prop: RLabel.RLabelAngleProp) => __addShape(new RLabel.RLabelAngle(dependencies, prop)),
      arc: (dependencies: [RArc.RArc], prop: RLabel.RLabelArcProp) => __addShape(new RLabel.RLabelArc(dependencies, prop)),
      length: (dependencies: [RLength.RLength], prop: RLabel.RLabelLengthProp) => __addShape(new RLabel.RLabelLength(dependencies, prop)),
      line: (dependencies: [RLine.RLine], prop: RLabel.RLabelLineProp) => __addShape(new RLabel.RLabelLine(dependencies, prop)),
      point: (dependencies: [RPoint.RPoint], prop: RLabel.RLabelPointProp) => __addShape(new RLabel.RLabelPoint(dependencies, prop)),
    },

    length: {
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], _: any) => __addShape(new RLength.RLengthTwoPoints(dependencies, {})),
    },

    line: {
      angleBisector: (dependencies: [RLine.RLine, RLine.RLine], prop: RLine.RLineAngleBisectorProp) => __addShape(new RLine.RLineAngleBisector(dependencies, prop)),
      horizontal: (_: any, prop: RLine.RLineHorizontalProp) => __addShape(new RLine.RLineHorizontal([], prop)),
      oriented: (dependencies: [RPoint.RPoint], prop: RLine.RLineOrientedProp) => __addShape(new RLine.RLineOriented(dependencies, prop)),
      parallel: (dependencies: [RPoint.RPoint, RLine.RLine], prop: RLine.RLineParallelProp) => __addShape(new RLine.RLineParallel(dependencies, prop)),
      perpendicular: (dependencies: [RPoint.RPoint, RLine.RLine], prop: RLine.RLinePerpendicularProp) => __addShape(new RLine.RLinePerpendicular(dependencies, prop)),
      twoPoints: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RLine.RLineTwoPointsProp) => __addShape(new RLine.RLineTwoPoints(dependencies, prop)),
      vertical: (_: any, prop: RLine.RLineVertical) => __addShape(new RLine.RLineVertical([], prop)),
    },

    marker: {
      line: (dependencies: [RLine.RLine], prop: RMarker.RMarkerLineProp) => __addShape(new RMarker.RMarkerLine(dependencies, prop)),
    },

    point: {
      absoluteCoord: (_: any, prop: RPoint.RPointAbsoluteCoordProp) => __addShape(new RPoint.RPointAbsoluteCoord([], prop)),
      internalDivision: (dependencies: [RPoint.RPoint, RPoint.RPoint], prop: RPoint.RPointInternalDivisionProp) => __addShape(new RPoint.RPointInternalDivision(dependencies, prop)),
      intersection: (dependencies: [RLine.RLine, RLine.RLine], prop: RPoint.RPointIntersectionProp) => __addShape(new RPoint.RPointIntersection(dependencies, prop)),
      onLine: (dependencies: [RLine], prop: RPoint.RPointOnLineProp) => __addShape(new RPoint.RPointOnLine(dependencies, prop)),
    },

    polygon: {
      points: (dependencies: RPoint.RPoint[], prop: RPolygon.RPolygonPointsProp) => __addShape(new RPolygon.RPolygonPoints(dependencies, prop)),
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
