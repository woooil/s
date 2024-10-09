import '../styles/Axis.scss'

function Label({ text, pos }) {
  return (
    <div
      className="label"
      style={{ left: `${pos * 100}%` }}>
      {text}
    </div>
  )
}

export default function Axis({ a, b, unit }) {
  return (
    <div className="axis">
      <div className="tick-container">
        {[...Array(b + 1)].map(() => (
          <div className="tick" />
        ))}
      </div>
      <div className="line" />
      <div className="label-container">
        <Label
          text="0"
          pos={0}
        />
        {a !== b && a !== 0 && (
          <Label
            text={`${a} / ${b}`}
            pos={a / b}
          />
        )}
        <Label
          text="1"
          pos={1}
        />
        {unit && <div className="unit">({unit})</div>}
      </div>
    </div>
  )
}
