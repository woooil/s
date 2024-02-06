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
export interface Board {
  data: string
}

enum Operator {
  Plus = '+',
  Minus = '-',
  Div = '/',
  Mul = '*',
  Eq = '=',
}

const exampleBoard: Board = {
  data: `3 + 8 - 2 = 9
+   /   *
5 * 4 + 3 = 23
=   =   =
8   2   6
`,
}

function getRandOperator(): Operator {
  const opArray = Object.values(Operator).filter(op => op !== Operator.Eq)
  const randIdx = Math.floor(Math.random() * opArray.length)
  return opArray[randIdx] as Operator
}

function computeRes(op1: number, op2: number, operator: Operator): number {
  switch (operator) {
    case Operator.Plus:
      return op1 + op2
    case Operator.Minus:
      return op1 - op2
    case Operator.Div:
      return op1 / op2
    case Operator.Mul:
      return op1 * op2
    default:
      return 0
  }
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
  constructor(col: number, row: number, fixedBoard: Board, domain: number[]) {
    this.col = col
    this.row = row
    this.fixedBoard = fixedBoard
    this.domain = domain
  }
  /*
   * Creates a Board instance for a cross math puzzle under current options (row, col, fixedBoard and
   * domain) and returns it.
   */
  createBoard(): Board {
    // return exampleBoard // TODO: Please complete this method!!
    const operands: number[][] = new Array(this.row + 1)
    const operators: Operator[][] = new Array(this.row * 2)

    // set operands
    for (let i = 0; i < this.row; i++) {
      operands[i] = new Array(this.col + 1).fill(0)
      for (let j = 0; j < this.col; j++) {
        operands[i][j] =
          this.domain[Math.floor(Math.random() * this.domain.length)]
      }
    }
    operands[this.row] = new Array(this.col + 1).fill(0)

    // set operators
    for (let i = 0; i < this.row * 2; i++) {
      operators[i] = new Array(this.col).fill(Operator.Eq)
      if (i === this.row * 2 - 1) {
        break
      }
      if (i % 2 === 0) {
        for (let j = 0; j < this.col - 1; j++) {
          operators[i][j] = getRandOperator()
        }
      } else {
        for (let j = 0; j < this.col; j++) {
          operators[i][j] = getRandOperator()
        }
      }
    }

    // set results
    for (let i = 0; i < this.row; i++) {
      let res = operands[i][0]
      for (let j = 0; j < this.col - 1; j++) {
        res = computeRes(res, operands[i][j + 1], operators[2 * i][j])
      }
      operands[i][this.col] = res
    }

    for (let i = 0; i < this.col; i++) {
      let res = operands[0][i]
      for (let j = 0; j < this.row - 1; j++) {
        res = computeRes(res, operands[j + 1][i], operators[2 * j + 1][i])
      }
      operands[this.row][i] = res
    }

    // set return board
    const tempData: string[] = []
    for (let i = 0; i < this.row; i++) {
      for (let j = 0; j < this.col; j++) {
        tempData.push(operands[i][j].toString())
        tempData.push(operators[2 * i][j])
      }
      tempData.push(operands[i][this.col].toString())
      tempData.push('\n')
      for (let j = 0; j < this.col; j++) {
        tempData.push(operators[2 * i + 1][j])
        tempData.push(' ')
      }
      tempData.push('\n')
    }
    for (let j = 0; j < this.col; j++) {
      tempData.push(operands[this.row][j].toString())
      tempData.push(' ')
    }
    return { data: tempData.join(' ') }
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

export { Puzzle }
