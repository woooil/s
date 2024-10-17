import { Shape, ShapeID } from './Shape'

/**
 * Controls the context in which Shapes are stored.
 */
class ShapeContext {
  /**
   * The shapes which are stored in the context.
   */
  private __shapes: { [key: ShapeID]: Shape } = { }

  /**
   * The map of Shapes to the list of Shapes which depends on it in the context.
   */
  private __dependents: { [key: ShapeID]: Shape[] } = { }

  /**
   * Returns an empty context.
   */
  public static init() {
    return new ShapeContext()
  }

  /**
   * Adds Shape to the context while updating the dependents.
   * @throws Throws an Error if Dependencies of Shape to be added are not present in the context.
   */
  public add(shape: Shape) {
    shape.dependencies.forEach((i: Shape) => {
      if (!(this.__shapes.hasOwnProperty(i.id))) throw new Error("No Shape in context")
      if (!(this.__dependents.hasOwnProperty(i.id))) this.__dependents[i.id] = []
      this.__dependents[i.id].push(shape)
    })
    this.__shapes[shape.id] = shape
    return shape
  }

  /**
   * Deletes a Shape from the context with/without cascading. If cascade is true, all Shapes which depends on the Shape to be deleted are also deleted. Otherwise, it will throw an Error if any Shape depends on the Shape to be deleted.
   * @throws Throws an Error if any Shape depends on the Shape to be deleted when cascade is false.
   */
  public delete(shape: Shape, cascade: boolean = true) {
    if (cascade && this.__dependents.hasOwnProperty(shape.id)) {
      this.__dependents[shape.id].forEach((i: Shape) => {
        this.delete(i)
      })
    } else if (this.__dependents.hasOwnProperty(shape.id)) {
      throw new Error("This Shape is not free from dependencies.")
    }

    delete this.__shapes[shape.id]
    delete this.__dependents[shape.id]
  }

  /**
   * Maps the func to Shapes stored in the context.
   */
  public map(func: (i: Shape) => any) {
    return Object.values(this.__shapes).map(func)
  }
}

export { ShapeContext }