/*
 * Board represents a complete (possibly incomplete) instance of a cross math puzzle. It contains
 * the operators and the results of the operations for each row and column, and the operand
 * numbers, which is the correct answers for the puzzle.
 *
 * Example
 * A corresponding Board for a cross math puzzle
 *     3 + 8 - 2 = 9
 *     +   /   *
 *     5 * 4 + 3 = 23
 *     =   =   =
 *     8   2   6
 * is exampleBoard, a constant delcared below.
 *
 * TODO: Please richen its structure, it's so naive now! As long as operands, Operators, and the
 * results are semantically distinct, feel free to modify Board to make it easier for you to
 * implement Puzzle.
 */
interface Board {
  data: string
}

const exampleBoard: Board = {
  data: `3 + 8 - 2 = 9
+   /   *
5 * 4 + 3 = 23
=   =   =
8   2   6
`,
}

/*
 * Puzzle implements a controller that configure options for a cross math puzzle, generate a new
 * instance, and provide undo and redo functions.
 */
class Puzzle {
  /*
   * Represents the number of columns of the operands.
   *
   * For example, exampleBoard has 3 columns for its operands.
   */
  col: number

  /*
   * Represents the number of rows of the operands.
   *
   * For example, exampleBoard has 2 columns for its operands.
   */
  row: number

  /*
   * Represents a (incomplete) Board representing the operands, operators or results that users
   * specified for the puzzle.
   *
   * For example, if users want to include division by 8, this property could be specified as follows:
   * `    8     =
   *      /     =
   *            =
   *  =   =   =
   * `
   */
  fixedBoard: Board

  /*
   * Represents a list of numbers that can be used in the operands. The numbers may not be
   * consecutive.
   *
   * For example, if users want to use natural numbers less than 10 in the operands, this property
   * could be specified as follows:
   * [1, 2, 3, 4, 5, 6, 7, 8, 9]
   */
  domain: number[]

  /*
   * Creates a Board instance for a cross math puzzle under current options (row, col, fixedBoard and
   * domain) and returns it.
   */
  createBoard(): Board {
    return exampleBoard // TODO: Please complete this method!!
  }

  /*
   * Returns the Board instance previously created by this Puzzle. Up to five instances are stored,
   * and if users try to find a history earlier than that, it throws an error.
   */
  undo(): Board | Error {
    return exampleBoard // TODO: Please complete this method!!
  }

  /*
   * Returns the Board instance undoned by this Puzzle. Up to five instances are stored, and if users
   * try to find a history earlier than that, it throws an error.
   */
  redo(): Board | Error {
    return exampleBoard // TODO: Please complete this method!!
  }
}

export { Board, Puzzle }
