import Chunk from './Chunk'
import Axis from './Axis'
import '../styles/Diagram.scss'

export default function Diagram({
  n,
  filled = 0,
  shaded = 0,
  label,
  baseUnit,
  divider,
  initClosed,
}) {
  return (
    <div className="diagram">
      <Chunk
        n={n}
        filled={filled}
        shaded={shaded}
        label={label}
        divider={divider}
        initClosed={initClosed}
      />
      <Axis
        a={filled}
        b={n}
        unit={baseUnit}
      />
    </div>
  )
}
