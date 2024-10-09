import { useState } from 'react'
import Frac from './Frac'
import '../styles/Equation.scss'

function Divided() {
  return <div className="divided">÷</div>
}

function Times() {
  return <div className="times">×</div>
}

function Equals() {
  return <div className="equals">=</div>
}

const TOGGLABLE = 'togglable'

export default function Equation({ problem }) {
  const [open, setOpen] = useState({ a: false, b: false, result: false })
  const toggleA = () =>
    setOpen(p => {
      return { ...p, a: !p.a }
    })
  const toggleB = () =>
    setOpen(p => {
      return { ...p, b: !p.b }
    })
  const toggleResult = () =>
    setOpen(p => {
      return { ...p, result: !p.result }
    })

  return (
    <div className="equation">
      <Frac
        a={problem.n}
        b={problem.m}
      />
      <Divided />
      <Frac
        a={problem.a}
        b={problem.b}
      />
      <Equals />
      <Frac
        a={problem.n}
        b={problem.m}
      />
      <Divided />
      <div
        className={`a ${TOGGLABLE}`}
        onClick={toggleA}>
        {open.a && problem.a}
      </div>
      <Times />
      <div
        className={`b ${TOGGLABLE}`}
        onClick={toggleB}>
        {open.b && problem.b}
      </div>
      <Equals />
      <div
        className={`result ${TOGGLABLE}`}
        onClick={toggleResult}>
        {open.result && (
          <Frac
            a={problem.n * problem.b}
            b={problem.m * problem.a}
          />
        )}
      </div>
    </div>
  )
}
