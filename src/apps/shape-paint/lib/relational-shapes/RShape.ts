import { v4 as uuid } from 'uuid'

/**
 * The properties of RShape.
 */
interface RShapeProp {}

/**
 * The mathematical definition of RShape. Once resolved, any RShape of the same RShapeType should be of the same type.
 */
interface RShapeResolved {}

/**
 * The identifier of RShape.
 */
type RShapeID = string

/**
 * The type of RShape.
 */
type RShapeType = string

export { RShapeProp, RShapeResolved, RShapeID, RShapeType }

/**
 * Represents any shapes.
 * @hierarchy RShape
 */
abstract class RShape {
  /**
   * The prefix of the id.
   */
  public static ID_PREFIX = 'rs-'
  /**
   * The identifier of this RShape.
   */
  readonly id: RShapeID
  /**
   * The list of RShapes on which this RShape depends.
   */
  protected __dependencies: RShape[]
  /**
   * The list of RShapes on which this RShape depends.
   */
  public get dependencies() {
    return this.__dependencies
  }
  /**
   * The properties of this RShape except its Dependencies. This may include the division ratio of PointInternalDivision, or the extending direction of Line.
   */
  protected __prop: RShapeProp
  /**
   * The properties of this RShape except its Dependencies. This may include the division ratio of PointInternalDivision, or the extending direction of Line.
   */
  public get prop() {
    return this.__prop
  }
  /**
   * The type of this RShape. For example, Point is one type of RShape.
   */
  public static TYPE: RShapeType
  /**
   * The type of this RShape. For example, Point is one type of RShape.
   */
  readonly type: RShapeType

  /**
   * Resolves this RShape into its mathematical definition. Any RShape of the same type should be resolved into the same type.
   */
  public abstract resolve(): RShapeResolved

  /**
   * Assigns properties to this RShape. id is auto-generated using uuid().
   */
  constructor(dependencies: RShape[], prop: RShapeProp, type: RShapeType) {
    this.id = `${RShape.ID_PREFIX}${uuid()}`
    this.__dependencies = dependencies
    this.__prop = prop
    this.type = type
  }
}

export { RShape }
