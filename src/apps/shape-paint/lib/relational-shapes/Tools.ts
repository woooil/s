/**
 * The mathematical coordinates in the Cartesian coordinate system.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
type Coord = { x: number; y: number }

/**
 * The four cardinal directions.
 * @value px  - +x direction; 0 rad
 * @value py  - +y direction; (pi / 2) rad
 * @value nx  - -x direction; pi rad
 * @value ny  - -y direction; (pi * 3 / 2) rad
 */
const CARD = {
  px: 0,
  py: Math.PI / 2,
  nx: Math.PI,
  ny: (Math.PI * 3) / 2,
}
type CARD = typeof CARD[keyof typeof CARD]

/**
 * The mathematical coordinates in the polar coordinate system.
 * @prop r      - The radial coordinate.
 * @prop theta  - The angular coordinate.
 */
type CoordPolar = { r: number; theta: number }

/**
 * Facilitates manipulation of coordinates.
 */
class Coords {
  /**
   * Adds two Coords.
   */
  static add(coord1: Coord, coord2: Coord): Coord {
    return {
      x: coord1.x + coord2.x,
      y: coord1.y + coord2.y,
    }
  }

  /**
   * Multiplies scalar to Coord.
   */
  static scale(coord: Coord, scale: number): Coord {
    return {
      x: coord.x * scale,
      y: coord.y * scale,
    }
  }

  /**
   * Calculates the average of two Coords.
   */
  static avg(coord1: Coord, coord2: Coord): Coord {
    return Coords.scale(Coords.add(coord1, coord2), 0.5)
  }

  /**
   * Converts CoordPolar to Coord.
   */
  static toCartesian(polar: CoordPolar): Coord {
    return {
      x: polar.r * Math.cos(polar.theta),
      y: polar.r * Math.sin(polar.theta),
    }
  }
  
  /**
   * Calculates the angle in range (- PI, PI] of the line from coord1 to coord2.
   */
  static theta2(coord1: Coord, coord2: Coord): number {
    return Math.atan2(coord2.y - coord1.y, coord2.x - coord1.x)
  }

  /**
   * Adds CoordPolar to Coord.
   */
  static addPolar(coord: Coord, polar: CoordPolar): Coord {
    return Coords.add(coord, Coords.toCartesian(polar))
  }

  /**
   * Calculates the angle made by two rays.
   */
  static angleIntersect(ray1: { from: Coord, to: Coord }, ray2: { from: Coord, to: Coord }): { theta: number, theta0: number, thetaMid: number } {
    let theta1 = Coords.theta2(ray1.from, ray1.to)
    const theta2 = Coords.theta2(ray2.from, ray2.to)
    let theta = theta2 - theta1
    if (theta > Math.PI) theta -= 2 * Math.PI
    else if (theta < -Math.PI) theta += 2 * Math.PI
    const thetaMid = (theta1 + theta2 + Math.PI * 2) / 2 - Math.PI // (-PI, PI]
    return { 
      theta: theta,
      theta0: theta1,
      thetaMid: thetaMid
    }
  }
}

export { Coord, CoordPolar, Coords, CARD }
