import { useState } from 'react'
import AutosizeInput from 'react-input-autosize'
import Equation from './Equation'
import '../styles/Controller.scss'

function SingleValueController({ value, setValue, min = 1, max, ...prop }) {
  return (
    <input
      {...prop}
      type="number"
      min={min}
      step="1"
      max={max}
      onChange={e => setValue(Number(e.target.value))}
      value={value}
      placeholder={min}
    />
  )
}

function SingleUnitController({ value, setValue, ...prop }) {
  return (
    <AutosizeInput
      {...prop}
      type="text"
      onChange={e => setValue(e.target.value)}
      placeholder={'(단위)'}
      value={value}
    />
  )
}

function SingleController({
  problem,
  setProblem,
  namedA,
  namedB,
  namedUnit,
  bound,
}) {
  return (
    <div className="single-controller">
      <div className="number">
        <SingleValueController
          className="dividend"
          value={problem[namedA]}
          setValue={i =>
            setProblem(p => {
              return { ...p, [namedA]: i }
            })
          }
          max={bound && problem[namedB]}
        />
        <div className="divider" />
        <SingleValueController
          className="divisor"
          value={problem[namedB]}
          setValue={i =>
            setProblem(p => {
              return { ...p, [namedB]: i }
            })
          }
          min={bound && problem[namedA]}
        />
      </div>
      <SingleUnitController
        className="unit"
        value={problem[namedUnit]}
        setValue={i =>
          setProblem(p => {
            return { ...p, [namedUnit]: i }
          })
        }
      />
    </div>
  )
}

function ControllerSet({ problem, setProblem }) {
  return (
    <>
      <SingleController
        problem={problem}
        setProblem={setProblem}
        namedA="n"
        namedB="m"
        namedUnit="dividendUnit"
      />
      <div className="division-label">÷</div>
      <SingleController
        problem={problem}
        setProblem={setProblem}
        namedA="a"
        namedB="b"
        namedUnit="divisorUnit"
        bound
      />
    </>
  )
}

export default function Controller({ problem, setProblem }) {
  const [open, setOpen] = useState(true)

  const toggleOpen = () => {
    setOpen(p => !p)
  }

  return (
    <div className="controller">
      <button
        className="toggle m-icon"
        onClick={toggleOpen}>
        {open ? 'switch_right' : 'switch_left'}
      </button>
      {open ? (
        <ControllerSet
          problem={problem}
          setProblem={setProblem}
        />
      ) : (
        <Equation problem={problem} />
      )}
    </div>
  )
}
