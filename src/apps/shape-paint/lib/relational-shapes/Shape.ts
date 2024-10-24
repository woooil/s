import { v4 as uuid } from 'uuid'

/**
 * The properties of Shape.
 */
interface ShapeProp {}

/**
 * The mathematical definition of Shape. Once resolved, any Shape of the same ShapeType should be of the same type.
 */
interface ShapeResolved {}

/**
 * The identifier of Shape.
 */
type ShapeID = string

/**
 * The type of Shape.
 */
type ShapeType = string

export { ShapeProp, ShapeResolved, ShapeID, ShapeType }

/**
 * Represents any shapes.
 * @hierarchy Shape
 */
abstract class Shape {
  /**
   * The identifier of Shape.
   */
  readonly id: ShapeID
  /**
   * The list of Shapes which Shape depends on to be defined.
   */
  protected __dependencies: Shape[]
  public get dependencies() {
    return this.__dependencies
  }
  /**
   * The properties of Shape except its Dependencies. This may include the division ratio of PointInternalDivision, the extending direction of Line, and more.
   */
  protected __prop: ShapeProp
  public get prop() {
    return this.__prop
  }
  /**
   * The type of Shape. For example, Point is one type of Shape.
   */
  public static TYPE: ShapeType
  /**
   * The type of Shape. For example, Point is one type of Shape.
   */
  readonly type: ShapeType
  /**
   * The name of svg element tag which Shape should use.
   */
  // readonly svgTag: keyof SVGElementTagNameMap

  /**
   * Resolves Shape into its mathematical definition. Once resolved, any Shape of the same ShapeType should be of the same type.
   */
  public abstract resolve(): ShapeResolved
  /**
   * Returns the attributes of svg element tag which should draw Shape.
   */
  // public abstract get svgAttr(): SVGAttributes

  /**
   * Assigns properties to Shape. id is auto-generated using uuid().
   */
  constructor(dependencies: Shape[], prop: ShapeProp, type: ShapeType) {
    this.id = uuid()
    this.__dependencies = dependencies
    this.__prop = prop
    this.type = type
  }
}

export { Shape }
