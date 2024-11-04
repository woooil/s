import { Coord } from './Coord'

/**
 * Facilitates manipulation of angles of full range: (-INFINITY, INFIINITY)
 * @prop t - The angle in radians.
 */
class Theta {
  protected __t: number
  public set t(value: number) {
    this.__t = value
  }
  public get t() {
    return this.__t
  }

  /**
   * Returns the unsigned angle.
   */
  public get size() {
    return Math.abs(this.__t)
  }

  constructor(t: number) {
    this.__t = t
  }

  /**
   * The +x direction. Equals to 0.
   */
  static px() {
    return new ThetaMinimum(0)
  }
  /**
   * The +y direction. Equals to PI / 2.
   */
  static py() {
    return new ThetaMinimum(Math.PI / 2)
  }
  /**
   * The -x direction. Equals to PI.
   */
  static nx() {
    return new Theta(Math.PI)
  }
  /**
   * The -y direction. Equals to -PI / 2.
   */
  static ny() {
    return new ThetaMinimum(-Math.PI / 2)
  }
  /**
   * Equals to 0.
   */
  static zero() {
    return new ThetaMinimum(0)
  }
  /**
   * Equals to PI / 2.
   */
  static halfPi() {
    return new ThetaMinimum(Math.PI / 2)
  }
  /**
   * Equals to PI.
   */
  static pi() {
    return new ThetaMinimum(Math.PI)
  }

  /**
   * Calculates the ThetaMinimum of the line from coord1 to coord2. If coord2 is not given, calculates the angle of the line from the origin to coord1.
   */
  static fromCoord(coord1: Coord, coord2?: Coord): ThetaMinimum {
    if (coord2) return new ThetaMinimum(Math.atan2(coord2.y - coord1.y, coord2.x - coord1.x))
    return new ThetaMinimum(Math.atan2(coord1.y, coord1.x))
  }

  /**
   * Flips the direction of Theta, results in ThetaTravel. For instance, PI / 4 will flipped into - 3 PI / 4.
   */
  flip(): ThetaTravel {
    const reduced = new ThetaTravel(this.t)
    if (reduced.t >= 0) return new ThetaTravel(reduced.t - Math.PI * 2)
    return new ThetaTravel(reduced.t + Math.PI * 2)
  }

  /**
   * Adds another Theta.
   */
  add(theta: Theta): Theta {
    return new Theta(this.t + theta.t)
  }

  /**
   * Substracts another Theta
   */
  substract(theta: Theta): Theta {
    return new Theta(this.t - theta.t)
  }

  /**
   * Halves the angle.
   */
  half(): Theta {
    return new Theta(this.t / 2)
  }

  /**
   * Investigates ThetaMinimum made by two rays.
   * @param   ray1      - The first ray which makes the angle.
   * @param   ray2      - The second ray which makes the angle.
   * @return  theta     - The (directional) angular measure.
   * @return  theta0    - The start direction.
   * @return  thetaMid  - The middle direction.
   */
  static intersect(ray1: { from: Coord, to: Coord }, ray2: { from: Coord, to: Coord }): { theta: ThetaMinimum, theta0: ThetaMinimum, thetaMid: ThetaMinimum } {
    const theta1 = Theta.fromCoord(ray1.from, ray1.to)
    const theta2 = Theta.fromCoord(ray2.from, ray2.to)
    const thetaSub = theta2.substract(theta1)
    let theta = new ThetaMinimum(thetaSub.t)
    let thetaMid = new ThetaMinimum((theta1.t + theta2.t) / 2)
    if (thetaSub.size > Math.PI) {
      thetaMid = thetaMid.substract(Theta.pi())
      theta = theta.substract(Theta.pi())
    }
    return { 
      theta: theta,
      theta0: theta1,
      thetaMid: thetaMid
    }
  }
}

/**
 * Facilitates manipulation of angles of the minimum range: (-PI / 2, PI / 2], which barely covers all directions.
 * @prop t - The angle in radians. Only accepts values in (-PI / 2, PI / 2]
 */
class ThetaMinimum extends Theta {
  protected declare __t: number
  public set t(value: number) {
    this.__t = ThetaMinimum.intoRange(value)
  }
  public get t() {
    return this.__t
  }

  /**
   * Checks if the given Theta is in the minimum range.
   */
  public static checkRange(theta: Theta): boolean {
    return -Math.PI < theta.t && theta.t <= Math.PI
  }

  /**
   * Converts any angle into the minimum range.
   */
  protected static intoRange(t: number): number {
    let travel = t % (Math.PI * 2)
    if (travel > Math.PI) travel -= Math.PI * 2
    else if (travel <= -Math.PI) travel += Math.PI * 2
    return travel
  }

  constructor(t: number) {
    super(ThetaMinimum.intoRange(t))
  }

  /**
   * Adds another Theta.
   */
  add(theta: Theta): ThetaMinimum {
    return new ThetaMinimum(this.t + theta.t)
  }

  /**
   * Substract another Theta.
   */
  substract(theta: Theta): ThetaMinimum {
    return new ThetaMinimum(this.t - theta.t)
  }
  
  /**
   * Halves the angle.
   */
  half(): ThetaMinimum {
    return new ThetaMinimum(this.t / 2)
  }
}

/**
 * Facilitates manipulation of angles of the travel range: (-PI * 2, PI * 2), which represents the directional angles of all directions.
 * @prop t - The angle in radians. Only accepts values in (-PI * 2, PI * 2)
 */
class ThetaTravel extends Theta {
  protected declare __t: number
  public set t(value: number) {
    this.__t = ThetaTravel.intoRange(value)
  }
  public get t() {
    return this.__t
  }

  /**
   * Checks if the given Theta is in the travel range.
   */
  public static checkRange(theta: Theta): boolean {
    return -Math.PI * 2 < theta.t && theta.t < Math.PI * 2
  }

  /**
   * Converts any angle into the travel range.
   */
  protected static intoRange(t: number): number {
    return t % (Math.PI * 2)
  }

  constructor(t: number) {
    super(ThetaTravel.intoRange(t))
  }

  /**
   * Adds another Theta.
   */
  add(theta: Theta): ThetaTravel {
    return new ThetaTravel(this.t + theta.t)
  }

  /**
   * Substract another Theta.
   */
  substract(theta: Theta): ThetaTravel {
    return new ThetaTravel(this.t - theta.t)
  }

  /**
   * Halves the angle.
   */
  half(): ThetaTravel {
    return new ThetaTravel(this.t / 2)
  }
}

export { Theta, ThetaMinimum, ThetaTravel }