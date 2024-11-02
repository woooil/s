import { useState, useEffect, useRef } from 'react'
import { Board, Puzzle, Operator, BoardRequirement } from '../lib/Puzzle'
import '../styles/App.scss'
import { useReactToPrint } from 'react-to-print'
import MainController from './MainController'
import ViewController from './ViewController'
import PuzzleContainer from './PuzzleContainer'
import PuzzleSizeOption from './PuzzleSizeOption'
import PuzzleDomainOption from './PuzzleDomainOption'

export interface Option {
  row: number
  col: number
  domain: number[]
  fixedBoard: BoardRequirement
  board: Board
}

export interface Tile {
  label?: string
  type: 'operand' | 'operator' | 'equal' | 'result' | 'empty'
  fixed?: boolean
}

export enum Direction {
  Row = 'row',
  Col = 'col',
}

const DOMAIN_MAX = 19
const possibleDomain = Array.from(Array(DOMAIN_MAX + 1).keys())

function getEmpty2DArr(row: number, col: number) {
  return [...Array(row)].map(() => [...Array(col)])
}

const initialOptionRaw = {
  row: 2,
  col: 3,
  domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  fixedBoard: { operands: getEmpty2DArr(2, 3), operators: getEmpty2DArr(3, 3) },
}

const puzzle = new Puzzle(
  initialOptionRaw.col,
  initialOptionRaw.row,
  initialOptionRaw.domain,
  initialOptionRaw.fixedBoard,
)

const initialOption: Option = {
  ...initialOptionRaw,
  board: puzzle.createBoard(),
}

export default function App() {
  const [option, setOption] = useState(initialOption)
  const [domain, setDomain] = useState(initialOption.domain)
  const [isDomainSelectorActive, setIsDomainSelectorActive] = useState(false)
  const [tiles, setTiles] = useState<Tile[]>([])
  const [showAns, setShowAns] = useState(false)

  const printRef = useRef(null)

  const changeRowCol = (row: boolean, inc: boolean) => {
    setOption(prev => {
      if (
        (row && ((inc && prev.row > 3) || (!inc && prev.row < 3))) ||
        (!row && ((inc && prev.col > 3) || (!inc && prev.col < 3)))
      )
        return prev
      const newRow = prev.row + (row ? (inc ? 1 : -1) : 0)
      const newCol = prev.col + (row ? 0 : inc ? 1 : -1)
      const newFixedBoard = {
        operands: getEmpty2DArr(newRow, newCol),
        operators: getEmpty2DArr(2 * newRow - 1, newCol),
      }
      puzzle.row = newRow
      puzzle.col = newCol
      puzzle.fixedBoard = newFixedBoard
      return {
        ...prev,
        row: newRow,
        col: newCol,
        fixedBoard: newFixedBoard,
        board: puzzle.createBoard(),
      }
    })
  }

  const decreaseRow = () => changeRowCol(true, false)
  const increaseRow = () => changeRowCol(true, true)
  const decreaseCol = () => changeRowCol(false, false)
  const increaseCol = () => changeRowCol(false, true)

  const toggleDomain = (d: number) =>
    setDomain(prev => {
      if (prev.length === 1 && d === prev[0]) return prev
      return prev.includes(d) ? prev.filter(f => f !== d) : [...prev, d]
    })

  const domainDownHandler = (d: number) => {
    setIsDomainSelectorActive(true)
    document.addEventListener(
      'mouseup',
      () => {
        setDomain(prev => {
          setOption(prevOp => {
            puzzle.domain = prev
            return { ...prevOp, domain: prev, board: puzzle.createBoard() }
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

  const updateTile = () => {
    const tiles: Tile[][] = [...Array(option.row * 2 + 1)].map(() =>
      Array(option.col * 2 + 1).fill({ type: 'empty' }),
    )
    option.board.operands.forEach((o, i) => {
      o.forEach(
        (oo, j) =>
          (tiles[i * 2][j * 2] = {
            label: oo?.toString() || '',
            type: 'operand',
          }),
      )
    })
    option.board.operators.forEach((o, i) => {
      o.forEach((oo, j) => {
        if (oo === Operator.Null) return
        else if (i % 2 === 0)
          tiles[i][j * 2 + 1] = { label: oo, type: 'operator' }
        else tiles[i][j * 2] = { label: oo, type: 'operator' }
      })
    })
    option.board.results.rowResult.forEach((o, i) => {
      tiles[i * 2][option.col * 2] = {
        label: o?.toString() || '',
        type: 'result',
      }
    })
    option.board.results.colResult.forEach((o, i) => {
      tiles[option.row * 2][i * 2] = {
        label: o?.toString() || '',
        type: 'result',
      }
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

  const clickHandler = () => {
    const newBoard = puzzle.createBoard()
    setOption(prev => {
      return { ...prev, board: newBoard }
    })
  }

  const undoHandler = () => {
    const board = puzzle.undo()
    setOption(prev => {
      return {
        ...prev,
        row: board.operands.length,
        col: board.operands[0].length,
        board,
      }
    })
  }

  const redoHandler = () => {
    const board = puzzle.redo()
    setOption(prev => {
      return {
        ...prev,
        row: board.operands.length,
        col: board.operands[0].length,
        board,
      }
    })
  }

  const printHandler = useReactToPrint({
    content: () => printRef.current,
    documentTitle: '가로세로 연산',
  })

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
    puzzle.row = option.row
    puzzle.col = option.col
    puzzle.fixedBoard = option.fixedBoard
    updateTile()
  }, [option])

  return (
    <div className="content">
      <div className="container">
        <div className="dashboard">
          <h1 className="title">가로세로 연산</h1>
          <div className="options">
            <div className="option-container">
              <PuzzleSizeOption
                direction={Direction.Row}
                decreaseHandler={decreaseRow}
                increaseHandler={increaseRow}
                value={option.row}
              />
              <PuzzleSizeOption
                direction={Direction.Col}
                decreaseHandler={decreaseCol}
                increaseHandler={increaseCol}
                value={option.col}
              />
            </div>
            <PuzzleDomainOption
              possibleDomain={possibleDomain}
              domain={domain}
              domainDownHandler={domainDownHandler}
              domainOverHandler={domainOverHandler}
            />
          </div>
          <div className="controller">
            <MainController
              undoHandler={undoHandler}
              clickHandler={clickHandler}
              redoHandler={redoHandler}
            />
            <ViewController
              printHandler={printHandler}
              answerHandler={answerHandler}
              showAns={showAns}
            />
          </div>
        </div>
        <PuzzleContainer
          option={option}
          tiles={tiles}
          fixHandler={fixHandler}
          showAns={showAns}
        />
        <div style={{ display: 'none' }}>
          <div
            className="puzzle-for-print"
            ref={printRef}>
            <PuzzleContainer
              option={option}
              tiles={tiles}
              fixHandler={fixHandler}
              showAns={showAns}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
