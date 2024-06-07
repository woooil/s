import { Operator } from '../lib/Puzzle'
import { Option, Tile } from './App'
import '../styles/PuzzleContainer.scss'

interface PuzzleContainerProps {
  option: Option
  tiles: Tile[]
  fixHandler: (idx: number) => void
  showAns: boolean
}

export default function PuzzleContainer({
  option,
  tiles,
  fixHandler,
  showAns,
}: PuzzleContainerProps) {
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
  return (
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
            {t.fixed ? <div className="fixed-flag m-icon">push_pin</div> : ''}
            <div className="label">
              {t.type === 'operand' && !showAns ? '' : formatLabel(t)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
