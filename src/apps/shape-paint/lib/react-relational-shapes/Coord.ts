import { Theta } from './Theta'

/**
 * Facilitates manipulation of coordinates.
 * @prop x - The x coordinate.
 * @prop y - The y coordinate.
 */
class Coord {
  readonly x: number
  readonly y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  /**
   * Adds another Coord.
   */
  add(coord: Coord): Coord {
    return new Coord(this.x + coord.x, this.y + coord.y)
  }

  /**
   * Substract another Coord.
   */
  substract(coord: Coord): Coord {
    return new Coord(this.x - coord.x, this.y - coord.y)
  }

  /**
   * Scales by a given scalar.
   */
  scale(scale: number): Coord {
    return new Coord(this.x * scale, this.y * scale)
  }

  /**
   * Calulates the average with another coord.
   */
  avg(coord: Coord): Coord {
    return this.add(coord).scale(0.5)
  }

  /**
   * Adds CoordPolar.
   */
  addPolar(polar: CoordPolar): Coord {
    return this.add(polar.toCoord())
  }

  /**
   * Calculates the distance to another Coord.
   */
  distance(coord: Coord): number {
    return Math.sqrt((coord.x - this.x) * (coord.x - this.x) + (coord.y - this.y) * (coord.y - this.y))
  }

  /**
   * Calulates the interal division with another Coord.
   */
  divideInternal(coord: Coord, r: number): Coord {
    return this.scale(1 - r).add(coord.scale(r))
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