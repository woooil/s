import '../styles/PuzzleOption.scss'

interface PuzzleDomainOptionProps {
  possibleDomain: number[]
  domain: number[]
  domainDownHandler: (d: number) => void
  domainOverHandler: (d: number) => void
}

export default function PuzzleDomainOption({
  possibleDomain,
  domain,
  domainDownHandler,
  domainOverHandler,
}: PuzzleDomainOptionProps) {
  return (
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
  )
}
