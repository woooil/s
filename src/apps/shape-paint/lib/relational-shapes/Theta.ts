import { Coord } from './Coord'

/**
 * Facilitates manipulation of angles.
 * @prop t - The angle in radians.
 */
class Theta {
  t: number

  constructor(t: number) {
    this.t = t
  }

  /**
   * (-PI, PI]. The minimum range to cover all directions.
   */
  static MINIMUM_RANGE = '(-PI, PI]'
  /**
   * (-PI * 2, PI * 2). The range to travel all directions around.
   */
  static TRAVEL_RANGE = '(-PI * 2, PI * 2)'
  /**
   * (-INFINITY, INFINITY). The full range accepting multiple rotations.
   */
  static FULL_RANGE = '(-INFINITY, INFINITY)'

  static px() {
    return new Theta(0)
  }
  static py() {
    return new Theta(Math.PI / 2)
  }
  static nx() {
    return new Theta(Math.PI)
  }
  static ny() {
    return new Theta(Math.PI * 3 / 2)
  }

  /**
   * Calculates the angle in MINIMUM_RANGE of the line from coord1 to coord2. If coord2 is not given, calculates the angle of the line from the origin to coord1.
   */
  static fromCoord(coord1: Coord, coord2?: Coord): Theta {
    if (coord2) return new Theta(Math.atan2(coord2.y - coord1.y, coord2.x - coord1.x))
    return new Theta(Math.atan2(coord1.y, coord1.x))
  }

  /**
   * Reduces the angle into TRAVEL_RANGE.
   */
  static travel(theta: Theta): Theta {
    return new Theta(theta.t % (Math.PI * 2))
  }

  /**
   * Reduces the angle into MINIMUM_RANGE.
   */
  static minimize(theta: Theta): Theta {
    let travel = Theta.travel(theta)
    if (travel.t > Math.PI) travel.t -= Math.PI * 2
    else if (travel.t <= -Math.PI) travel.t += Math.PI * 2
    return travel
  }

  /**
   * Flips the direction of the angle, results in the angle in TRAVLE_RANGE. For instance, PI / 4 will flipped into - 3 PI / 4.
   */
  static flip(theta: Theta): Theta {
    const reduced = Theta.travel(theta)
    if (reduced.t >= 0) return new Theta(reduced.t - Math.PI * 2)
    return new Theta(reduced.t + Math.PI * 2)
  }

  /**
   * Adds two angles, results in the angle in MINIMUM_RANGE.
   */
  static add(theta1: Theta, theta2: Theta): Theta {
    return Theta.minimize(new Theta(theta1.t + theta2.t))
  }

  /**
   * Substracts one angle from another, results in the angle in MINIMUM_RANGE.
   */
  static substract(theta1: Theta, theta2: Theta): Theta {
    return Theta.minimize(new Theta(theta1.t - theta2.t))
  }

  /**
   * Calculates the angle in MINIMUM_RANGE made by two rays.
   * @param   ray1      - The first ray which makes the angle.
   * @param   ray2      - The second ray which makes the angle.
   * @return  theta     - The (directional) angular measure in MINIMUM_RANGE.
   * @return  theta0    - The start direction in range in MINIMUM_RANGE.
   * @return  thetaMid  - The middle direction of the angle in MINIMUM_RANGE.
   */
  static intersect(ray1: { from: Coord, to: Coord }, ray2: { from: Coord, to: Coord }): { theta: Theta, theta0: Theta, thetaMid: Theta } {
    let theta1 = Theta.fromCoord(ray1.from, ray1.to)
    const theta2 = Theta.fromCoord(ray2.from, ray2.to)
    const theta = Theta.substract(theta2, theta1)
    const thetaMid = new Theta((theta1.t + theta2.t + Math.PI * 2) / 2 - Math.PI)
    return { 
      theta: theta,
      theta0: theta1,
      thetaMid: thetaMid
    }
  }
}

export { Theta }