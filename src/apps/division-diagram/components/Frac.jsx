import '../styles/Frac.scss'

function gcd(a, b) {
  if (!b) {
    return a
  }
  return gcd(b, a % b)
}

// a / b
export default function Frac({ a, b, reduced = true, ...prop }) {
  let [reducedA, reducedB] = [a, b]

  if (reduced) {
    const gcdResult = gcd(a, b)
    reducedA /= gcdResult
    reducedB /= gcdResult
  }

  return (
    <div
      {...prop}
      className={`${prop.className} frac`}>
      <div className={`frac-dividend ${reducedB !== 1 && 'whole'}`}>
        {reducedA}
      </div>
      {reducedB !== 1 && (
        <>
          <div className="frac-line" />
          <div className="frac-divisor">{reducedB}</div>
        </>
      )}
    </div>
  )
}
