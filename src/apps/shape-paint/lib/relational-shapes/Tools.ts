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
   * Substract one Coord from another.
   */
  static substract(coord1: Coord, coord2: Coord): Coord {
    return {
      x: coord1.x - coord2.x,
      y: coord1.y - coord2.y,
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
   * Adds CoordPolar to Coord.
   */
  static addPolar(coord: Coord, polar: CoordPolar): Coord {
    return Coords.add(coord, Coords.toCartesian(polar))
  }
}

/**
 * Facilitates manipulation of angles.
 */
class Angles {
  /**
   * Calculates the angle in range (-PI, PI] of the line from coord1 to coord2. If coord2 is not given, calculates the angle of the line from the origin to coord1.
   */
  static theta(coord1: Coord, coord2?: Coord): number {
    if (coord2) return Math.atan2(coord2.y - coord1.y, coord2.x - coord1.x)
    return Math.atan2(coord1.y, coord1.x)
  }

  /**
   * Reduces the angle into range (-PI * 2, PI * 2).
   */
  static reduce(theta: number): number {
    return theta % (Math.PI * 2)
  }

  /**
   * Flips the direction of the angle. For instance, PI / 4 will flipped into - 3 PI / 4.
   */
  static flip(theta: number): number {
    const reduced = Angles.reduce(theta)
    if (reduced >= 0) return reduced - Math.PI * 2
    return reduced + Math.PI * 2
  }

  /**
   * Substracts one angle from another, results in the angle in range (-PI, PI]
   */
  static substract(theta1: number, theta2: number) {
    let theta = theta1 - theta2
    if (theta > Math.PI) theta -= 2 * Math.PI
    else if (theta <= -Math.PI) theta += 2 * Math.PI
    return theta
  }

  /**
   * Calculates the angle made by two rays.
   * @param   ray1      - The first ray which makes the angle.
   * @param   ray2      - The second ray which makes the angle.
   * @return  theta     - The (directional) angular measure in range (-PI, PI]
   * @return  theta0    - The start direction in range (-PI, PI]
   * @return  thetaMid  - The middle direction of the angle in range (-PI, PI]
   */
  static intersect(ray1: { from: Coord, to: Coord }, ray2: { from: Coord, to: Coord }): { theta: number, theta0: number, thetaMid: number } {
    let theta1 = Angles.theta(ray1.from, ray1.to)
    const theta2 = Angles.theta(ray2.from, ray2.to)
    const theta = Angles.substract(theta2, theta1)
    const thetaMid = (theta1 + theta2 + Math.PI * 2) / 2 - Math.PI // (-PI, PI]
    return { 
      theta: theta,
      theta0: theta1,
      thetaMid: thetaMid
    }
  }
}

export { Coord, CoordPolar, Coords, CARD, Angles }
