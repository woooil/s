/**
 * The mathematical coordinates in the Cartesian coordinate system.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
type Coord = { x: number; y: number }

const QUARTER = {
  px: 0,
  py: Math.PI / 2,
  nx: Math.PI,
  ny: (Math.PI * 3) / 2,
}
type QUARTER = typeof QUARTER[keyof typeof QUARTER]

/**
 * The mathematical coordinates in the polar coordinate system.
 */
type CoordPolar = { r: number; theta: number }

class Coords {
  static add(coord1: Coord, coord2: Coord): Coord {
    return {
      x: coord1.x + coord2.x,
      y: coord1.y + coord2.y,
    }
  }

  static toCartesian(polar: CoordPolar): Coord {
    return {
      x: polar.r * Math.cos(polar.theta),
      y: polar.r * Math.sin(polar.theta),
    }
  }
}

export { Coord, CoordPolar, Coords, QUARTER }
