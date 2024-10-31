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
   * Converts CoordPolar to Coord.
   */
  static toCartesian(polar: CoordPolar): Coord {
    return {
      x: polar.r * Math.cos(polar.theta),
      y: polar.r * Math.sin(polar.theta),
    }
  }
}

/**
 * The direction of the angle formed by the intersection of two lines. 
 * @value 0th element - True if selects the first line extending towards +x direction. False if selects the first line extending towards -x direction.
 * @value 1st element - True if selects the second line extending towards +x direction. False if selects the second line extending towards -x direction.
 */
type AngleIntersection = [boolean, boolean]

export { Coord, CoordPolar, Coords, CARD, AngleIntersection }
