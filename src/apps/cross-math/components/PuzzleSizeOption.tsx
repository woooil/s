import classNames from 'classnames'
import { Direction } from './App'
import Controller from './Controller'
import '../styles/PuzzleOption.scss'

interface PuzzleSizeOptionProps {
  direction: Direction
  decreaseHandler: () => void
  increaseHandler: () => void
  value: number
}

export default function PuzzleSizeOption({
  direction,
  decreaseHandler,
  increaseHandler,
  value,
}: PuzzleSizeOptionProps) {
  return (
    <div className={classNames('option', direction)}>
      <div className="label">{direction === Direction.Row ? '줄' : '칸'}</div>
      <div className="form">
        <Controller
          className="dec"
          buttonName="stat_minus_1"
          handler={decreaseHandler}
        />
        <div className="value">{value}</div>
        <Controller
          className="inc"
          buttonName="stat_1"
          handler={increaseHandler}
        />
      </div>
    </div>
  )
}
