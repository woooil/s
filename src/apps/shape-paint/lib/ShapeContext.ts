import { Shape, ShapeID } from './Shape'

/**
 * @class
 * Controls the context in which Shapes are stored.
 */
class ShapeContext {
  /**
   * @props
   * __shapes     - The Shapes stored in the context.
   * __dependents - The map of dependents which depends on each Shape in the context.
   */
  private __shapes: { [key: ShapeID]: Shape } = { }
  private __dependents: { [key: ShapeID]: Shape[] } = { }

  /**
   * @method
   * Returns an empty context.
   */
  public static init() {
    return new ShapeContext()
  }

  /**
   * @method
   * Adds a Shape to the context while updating the dependents.
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
   * @method
   * Deletes a Shape from the context with/without cascading. If cascade is true, all Shapes which depends on the Shape to be deleted are also deleted. Otherwise, it will throw an Error if any Shape depends on the Shape to be deleted.
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

  public map(param: (i: Shape) => any) {
    return Object.values(this.__shapes).map(param)
  }
}

export { ShapeContext }