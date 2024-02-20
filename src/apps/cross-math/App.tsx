import { useState, useEffect } from 'react'
import { Board, Puzzle, Operator, BoardRequirement } from './lib/Puzzle'
import './App.css'

interface Option {
  row: number
  col: number
  domain: number[]
  fixedBoard: BoardRequirement
}

interface Tile {
  label?: string
  type: 'operand' | 'operator' | 'equal' | 'result' | 'empty'
  fixed?: boolean
}

const domainMax = 19
const possibleDomain = Array.from(Array(domainMax + 1).keys())

function getEmpty2DArr(row: number, col: number) {
  return [...Array(row)].map(() => [...Array(col)])
}

const initialOption: Option = {
  row: 2,
  col: 3,
  domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  fixedBoard: { operands: getEmpty2DArr(2, 3), operators: getEmpty2DArr(3, 3) },
}

const puzzle = new Puzzle(
  initialOption.col,
  initialOption.row,
  initialOption.domain,
  initialOption.fixedBoard,
)

export default function App() {
  const [option, setOption] = useState(initialOption)
  const [domain, setDomain] = useState(initialOption.domain)
  const [isDomainSelectorActive, setIsDomainSelectorActive] = useState(false)
  const [tiles, setTiles] = useState<Tile[]>([])
  const [showAns, setShowAns] = useState(false)

  const decreaseRow = () =>
    setOption(prev =>
      prev.row < 3
        ? prev
        : {
            ...prev,
            row: prev.row - 1,
            fixedBoard: {
              operands: getEmpty2DArr(prev.row - 1, prev.col),
              operators: getEmpty2DArr(2 * (prev.row - 1) - 1, prev.col),
            },
          },
    )
  const increaseRow = () =>
    setOption(prev =>
      prev.row > 3
        ? prev
        : {
            ...prev,
            row: prev.row + 1,
            fixedBoard: {
              operands: getEmpty2DArr(prev.row + 1, prev.col),
              operators: getEmpty2DArr(2 * (prev.row + 1) - 1, prev.col),
            },
          },
    )
  const decreaseCol = () =>
    setOption(prev =>
      prev.col < 3
        ? prev
        : {
            ...prev,
            col: prev.col - 1,
            fixedBoard: {
              operands: getEmpty2DArr(prev.row, prev.col - 1),
              operators: getEmpty2DArr(2 * prev.row - 1, prev.col - 1),
            },
          },
    )
  const increaseCol = () =>
    setOption(prev =>
      prev.col > 3
        ? prev
        : {
            ...prev,
            col: prev.col + 1,
            fixedBoard: {
              operands: getEmpty2DArr(prev.row, prev.col + 1),
              operators: getEmpty2DArr(2 * prev.row - 1, prev.col + 1),
            },
          },
    )

  const toggleDomain = (d: number) =>
    setDomain(prev => {
      return prev.includes(d) ? prev.filter(f => f !== d) : [...prev, d]
    })

  const domainDownHandler = (d: number) => {
    setIsDomainSelectorActive(true)
    document.addEventListener(
      'mouseup',
      () => {
        setDomain(prev => {
          setOption(prevOp => {
            return { ...prevOp, domain: prev }
          })
          return prev
        })
        setIsDomainSelectorActive(false)
      },
      { once: true },
    )
    toggleDomain(d)
  }

  const domainOverHandler = (d: number) => {
    if (!isDomainSelectorActive) return
    toggleDomain(d)
  }

  const updateTile = (board: Board) => {
    const tiles: Tile[][] = [...Array(option.row * 2 + 1)].map(() =>
      Array(option.col * 2 + 1).fill({ type: 'empty' }),
    )
    board.operands.forEach((o, i) => {
      o.forEach(
        (oo, j) =>
          (tiles[i * 2][j * 2] = { label: oo.toString(), type: 'operand' }),
      )
    })
    board.operators.forEach((o, i) => {
      o.forEach((oo, j) => {
        if (oo === Operator.Null) return
        else if (i % 2 === 0)
          tiles[i][j * 2 + 1] = { label: oo, type: 'operator' }
        else tiles[i][j * 2] = { label: oo, type: 'operator' }
      })
    })
    board.results.rowResult.forEach((o, i) => {
      tiles[i * 2][option.col * 2] = { label: o.toString(), type: 'result' }
    })
    board.results.colResult.forEach((o, i) => {
      tiles[option.row * 2][i * 2] = { label: o.toString(), type: 'result' }
    })
    for (let i = 0; i < option.row; i++)
      tiles[i * 2][option.col * 2 - 1] = { type: 'equal' }
    for (let i = 0; i < option.col; i++)
      tiles[option.row * 2 - 1][i * 2] = { type: 'equal' }

    setTiles(prev => {
      const newTiles = tiles.flat()
      if (prev.length !== newTiles.length) return newTiles
      return prev.map((i, idx) => {
        return { ...newTiles[idx], fixed: i.fixed }
      })
    })
  }

  const formatLabel = (tile: Tile) => {
    switch (tile.type) {
      case 'equal':
        return '='
      case 'result':
        return '' + Math.round(parseFloat(tile.label || '0') * 10) / 10
      case 'operator':
        switch (tile.label) {
          case Operator.Plus:
            return '＋'
          case Operator.Minus:
            return '−'
          case Operator.Div:
            return '÷'
          case Operator.Mul:
            return '×'
          default:
            return tile.label
        }
      default:
        return tile.label
    }
  }

  const clickHandler = () => {
    console.log('wow', option)
    puzzle.row = option.row
    puzzle.col = option.col
    puzzle.domain = option.domain
    puzzle.fixedBoard = option.fixedBoard
    const board = puzzle.createBoard()
    updateTile(board)
  }

  const undoHandler = () => {
    const board = puzzle.undo() as Board
    updateTile(board)
  }

  const redoHandler = () => {
    const board = puzzle.redo() as Board
    updateTile(board)
  }

  const answerHandler = () => {
    setShowAns(prev => !prev)
  }

  const fixHandler = (idx: number) => {
    const tile = tiles[idx]
    if (tile.type !== 'operand' && tile.type !== 'operator') return
    setTiles(prev => {
      const n = [...prev]
      const newState = n[idx].fixed === undefined || n[idx].fixed === false
      n.splice(idx, 1, { ...n[idx], fixed: newState })
      setOption(prev2 => {
        const superCol = 2 * prev2.col + 1
        if (tile.type === 'operand') {
          const operands =
            prev2.fixedBoard.operands?.map(i => i.slice()) ||
            getEmpty2DArr(prev2.row, prev2.col)
          const row = Math.floor(idx / (2 * superCol))
          const col = (idx % superCol) / 2
          const operandsRow = [...operands[row]]
          operandsRow.splice(col, 1, newState ? tile.label : undefined)
          operands.splice(row, 1, operandsRow)
          return { ...prev2, fixedBoard: { ...prev2.fixedBoard, operands } }
        } else {
          const operators =
            prev2.fixedBoard.operators?.map(i => i.slice()) ||
            getEmpty2DArr(prev2.row * 2 - 1, prev2.col)
          const row = Math.floor(idx / superCol)
          const col = Math.floor((idx % superCol) / 2)
          const operatorsRow = [...operators[row]]
          operatorsRow.splice(col, 1, newState ? tile.label : undefined)
          operators.splice(row, 1, operatorsRow)
          return { ...prev2, fixedBoard: { ...prev2.fixedBoard, operators } }
        }
      })
      return n
    })
  }

  useEffect(() => {
    clickHandler()
  }, [option.row, option.col, option.domain])

  return (
    <div className="content">
      <h1 className="title">가로세로 연산</h1>
      <div className="container">
        <div className="dashboard">
          <div className="options">
            <div className="option-container">
              <div className="option row">
                <div className="label">칸</div>
                <div className="form">
                  <button
                    className="dec button m-icon"
                    onClick={decreaseRow}>
                    stat_minus_1
                  </button>
                  <div className="value">{option.row}</div>
                  <button
                    className="inc button m-icon"
                    onClick={increaseRow}>
                    stat_1
                  </button>
                </div>
              </div>
              <div className="option col">
                <div className="label">칸</div>
                <div className="form">
                  <button
                    className="dec button m-icon"
                    onClick={decreaseCol}>
                    stat_minus_1
                  </button>
                  <div className="value">{option.col}</div>
                  <button
                    className="inc button m-icon"
                    onClick={increaseCol}>
                    stat_1
                  </button>
                </div>
              </div>
            </div>
            <div className="option domain">
              <div className="label">값의 범위</div>
              <div className="domain-list">
                {possibleDomain.map(d => (
                  <button
                    className={`value ${domain.includes(d) ? 'checked' : 'unchecked'}`}
                    onMouseDown={() => domainDownHandler(d)}
                    onMouseOver={() => domainOverHandler(d)}
                    key={d}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="controller">
            <div className="main-controller">
              <button
                className="undo button m-icon"
                onClick={undoHandler}>
                undo
              </button>
              <button
                className="create m-icon"
                onClick={clickHandler}>
                deployed_code
              </button>
              <button
                className="redo button m-icon"
                onClick={redoHandler}>
                redo
              </button>
            </div>
            <button
              className="show-ans button m-icon"
              onClick={answerHandler}>
              {showAns ? 'visibility' : 'visibility_off'}
            </button>
          </div>
        </div>
        <div className="puzzle-container">
          <div
            className="puzzle"
            style={{
              gridTemplateColumns: `repeat(${option.col * 2 + 1}, minmax(0, 1fr))`,
              gridTemplateRows: `repeat(${option.row * 2 + 1}, minmax(0, 1fr))`,
            }}>
            {tiles.map((t, idx) => (
              <div
                className={`tile ${t.type}`}
                onClick={() => fixHandler(idx)}
                key={idx}>
                {t.fixed ? (
                  <div className="fixed-flag m-icon">push_pin</div>
                ) : (
                  ''
                )}
                <div className="label">
                  {t.type === 'operand' && !showAns ? '' : formatLabel(t)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
