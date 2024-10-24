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
   * The prefix of the id.
   */
  public static ID_PREFIX = 'RS-'
  /**
   * The identifier of this Shape.
   */
  readonly id: ShapeID
  /**
   * The list of Shapes on which this Shape depends.
   */
  protected __dependencies: Shape[]
  /**
   * The list of Shapes on which this Shape depends.
   */
  public get dependencies() {
    return this.__dependencies
  }
  /**
   * The properties of this Shape except its Dependencies. This may include the division ratio of PointInternalDivision, or the extending direction of Line.
   */
  protected __prop: ShapeProp
  /**
   * The properties of this Shape except its Dependencies. This may include the division ratio of PointInternalDivision, or the extending direction of Line.
   */
  public get prop() {
    return this.__prop
  }
  /**
   * The type of this Shape. For example, Point is one type of Shape.
   */
  public static TYPE: ShapeType
  /**
   * The type of this Shape. For example, Point is one type of Shape.
   */
  readonly type: ShapeType

  /**
   * Resolves this Shape into its mathematical definition. Any Shape of the same type should be resolved into the same type.
   */
  public abstract resolve(): ShapeResolved

  /**
   * Assigns properties to this Shape. id is auto-generated using uuid().
   */
  constructor(dependencies: Shape[], prop: ShapeProp, type: ShapeType) {
    this.id = `${Shape.ID_PREFIX}${uuid()}`
    this.__dependencies = dependencies
    this.__prop = prop
    this.type = type
  }
}

export { Shape }
