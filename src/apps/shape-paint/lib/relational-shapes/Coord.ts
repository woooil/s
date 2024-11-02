import { Theta } from './Theta'

/**
 * Facilitates manipulation of coordinates.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
class Coord {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Adds another Coord.
   */
  add(coord: Coord) {
    this.x += coord.x
    this.y += coord.y
  }
  
  /**
   * Adds two Coords.
   */
  static add(coord1: Coord, coord2: Coord): Coord {
    return new Coord(
      coord1.x + coord2.x,
      coord1.y + coord2.y,
    )
  }

  /**
   * Substract another Coord.
   */
  substract(coord: Coord) {
    this.x -= coord.x
    this.y -= coord.y
  }

  /**
   * Substract one Coord from another.
   */
  static substract(coord1: Coord, coord2: Coord): Coord {
    return new Coord(
      coord1.x - coord2.x,
      coord1.y - coord2.y,
    )
  }

  /**
   * Scales by a given scalar.
   */
  scale(scale: number) {
    this.x *= scale
    this.y *= scale
  }

  /**
   * Multiplies scalar to Coord.
   */
  static scale(coord: Coord, scale: number): Coord {
    return new Coord(
      coord.x * scale,
      coord.y * scale,
    )
  }

  /**
   * Calculates the average of two Coords.
   */
  static avg(coord1: Coord, coord2: Coord): Coord {
    return Coord.scale(Coord.add(coord1, coord2), 0.5)
  }

  /**
   * Adds CoordPolar to Coord.
   */
  static addPolar(coord: Coord, polar: CoordPolar): Coord {
    return Coord.add(coord, polar.toCoord())
  }

  /**
   * Calculates the distance from coord1 to coord2.
   */
  static distance(coord1: Coord, coord2: Coord): number {
    return Math.sqrt((coord2.x - coord1.x) * (coord2.x - coord1.x) + (coord2.y - coord1.y) * (coord2.y - coord1.y))
  }
}


/**
 * Facilitates manipulation of coordinates in the polar coordinate system.
 * @prop r     - The radial coordinate.
 * @prop theta - The angular coordinate.
 */
class CoordPolar {
  r: number
  theta: Theta

  constructor(r: number, theta: Theta) {
    this.r = r
    this.theta = theta
  }

  /**
   * Converts CoordPolar to Coord.
   */
  toCoord(): Coord {
    return new Coord(
      this.r * Math.cos(this.theta.t),
      this.r * Math.sin(this.theta.t),
    )
  }
}

export { Coord, CoordPolar }