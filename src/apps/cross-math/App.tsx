import { useState, useEffect } from 'react'
import { Board, Puzzle } from './lib/Puzzle'
import './App.css'

interface Option {
  row: number
  col: number
  domain: number[]
}

interface Tile {
  label?: string
  type: 'operand' | 'operator' | 'equal' | 'result' | 'empty'
}

const domainMax = 20
const possibleDomain = Array.from(Array(domainMax + 1).keys())

const initialOption: Option = {
  row: 3,
  col: 3,
  domain: [1, 2, 3, 4, 5, 6, 7, 8, 9],
}

export default function App() {
  const [option, setOption] = useState(initialOption)
  const [isDomainSelectorActive, setIsDomainSelectorActive] = useState(false)
  const [tiles, setTiles] = useState<Tile[]>([])

  const decreaseRow = () =>
    setOption(prev => (prev.row < 3 ? prev : { ...prev, row: prev.row - 1 }))
  const increaseRow = () =>
    setOption(prev => (prev.row > 3 ? prev : { ...prev, row: prev.row + 1 }))
  const decreaseCol = () =>
    setOption(prev => (prev.col < 3 ? prev : { ...prev, col: prev.col - 1 }))
  const increaseCol = () =>
    setOption(prev => (prev.col > 3 ? prev : { ...prev, col: prev.col + 1 }))

  const toggleDomain = (d: number) =>
    setOption(prev => {
      return {
        ...prev,
        domain: prev.domain.includes(d)
          ? prev.domain.filter(f => f !== d)
          : [...prev.domain, d],
      }
    })

  const domainDownHandler = (d: number) => {
    setIsDomainSelectorActive(true)
    document.addEventListener(
      'mouseup',
      () => {
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

  const puzzle = new Puzzle(3, 2, '', [1, 2, 3, 4, 5, 6, 7, 8, 9])

  const updateTile = (board: Board) => {
    const data = board.data
    const dataParsed = data
      .replace(/ {2}/g, '#')
      .replace(/ /g, '')
      .replace(/#/g, ' ')
      .split('\n')
    const tiles: Tile[] = []
    for (let i = 0; i < dataParsed.length - 1; i++) {
      if (i === dataParsed.length - 2) {
        ;[...dataParsed[i]].forEach(d => {
          if (d === ' ') tiles.push({ type: 'empty' })
          else tiles.push({ label: d, type: 'result' })
        })
      } else if (i === dataParsed.length - 3) {
        ;[...dataParsed[i]].forEach(d => {
          if (d === ' ') tiles.push({ type: 'empty' })
          else tiles.push({ label: d, type: 'equal' })
        })
        tiles.push({ type: 'empty' })
        tiles.push({ type: 'empty' })
      } else if (dataParsed[i].includes('=')) {
        const s = dataParsed[i].split('=')
        s[0].split(/(\d+)/).forEach(d => {
          if (d === '') return
          else if (/\d+/.test(d)) tiles.push({ label: d, type: 'operand' })
          else tiles.push({ label: d, type: 'operator' })
        })
        tiles.push({ label: '=', type: 'equal' })
        tiles.push({ label: s[1], type: 'result' })
      } else {
        ;[...dataParsed[i]].forEach(d => {
          if (d === ' ') tiles.push({ type: 'empty' })
          else tiles.push({ label: d, type: 'operator' })
        })
        tiles.push({ type: 'empty' })
        tiles.push({ type: 'empty' })
      }
    }
    setTiles(tiles)
  }

  const clickHandler = () => {
    const board = puzzle.createBoard()
    updateTile(board)
  }

  const undoHandler = () => {
    const board = puzzle.undo()
    updateTile(board)
  }

  const redoHandler = () => {
    const board = puzzle.redo()
    updateTile(board)
  }

  useEffect(() => {
    puzzle.row = option.row
    puzzle.col = option.col
    puzzle.domain = option.domain
  }, [option])

  return (
    <div>
      <h1>Cross Math Puzzle</h1>
      <div className="options">
        <div className="row">
          <div className="form">
            <button
              className="dec"
              onClick={decreaseRow}>
              -
            </button>
            <div className="value">{option.row}</div>
            <button
              className="inc"
              onClick={increaseRow}>
              +
            </button>
          </div>
          <div className="label">줄</div>
        </div>
        <div className="col">
          <div className="form">
            <button
              className="dec"
              onClick={decreaseCol}>
              -
            </button>
            <div className="value">{option.col}</div>
            <button
              className="inc"
              onClick={increaseCol}>
              +
            </button>
          </div>
          <div className="label">칸</div>
        </div>
        <div className="domain">
          <div className="label">값의 범위</div>
          <div className="form">
            {possibleDomain.map(d => (
              <button
                className={`value ${option.domain.includes(d) ? 'checked' : 'unchecked'}`}
                onMouseDown={() => domainDownHandler(d)}
                onMouseOver={() => domainOverHandler(d)}
                key={d}>
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button onClick={clickHandler}>만들기</button>
      <button onClick={undoHandler}>이전</button>
      <button onClick={redoHandler}>다음</button>
      <div className="puzzle">
        {tiles.map((t, idx) => (
          <div
            className={`tile ${t.type}`}
            key={idx}>
            {t.label}
          </div>
        ))}
      </div>
    </div>
  )
}
