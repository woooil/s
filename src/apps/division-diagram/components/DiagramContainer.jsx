import Diagram from './Diagram'
import '../styles/DiagramContainer.scss'

function Arrow({ label }) {
  return (
    <div className="arrow">
      <div className="label">{label}</div>
      <div className="arrow-icon">⟶</div>
    </div>
  )
}

function RowContainer({ children }) {
  return <div className="row-container">{children}</div>
}

// (n / m) / (a / b)
export default function DiagramContainer({ problem }) {
  const step1 = { a: problem.n, b: problem.m, unit: problem.dividendUnit }
  const step2 = { ...step1, b: step1.b * problem.a }
  const step3 = { ...step2, a: step2.a * problem.b }

  return (
    <div className="diagram-container">
      <RowContainer>
        <Diagram
          n={problem.b}
          filled={problem.a}
          label={step1}
          baseUnit={problem.divisorUnit}
        />
        <Arrow label={`÷ ${problem.a}`} />
        <Diagram
          n={problem.b}
          filled={1}
          shaded={problem.a - 1}
          label={step2}
          baseUnit={problem.divisorUnit}
          divider
          initClosed
        />
      </RowContainer>
      <RowContainer>
        <Diagram
          n={problem.b}
          filled={1}
          label={step2}
          baseUnit={problem.divisorUnit}
          initClosed
        />
        <Arrow label={`× ${problem.b}`} />
        <Diagram
          n={problem.b}
          filled={problem.b}
          label={step3}
          baseUnit={problem.divisorUnit}
          divider
          initClosed
        />
      </RowContainer>
    </div>
  )
}
