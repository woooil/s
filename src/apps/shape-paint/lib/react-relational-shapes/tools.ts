const LARGE_NUMBER = 1 << 8

function sim(a: number, b: number, error?: number) {
  return Math.abs(a - b) < (error || 1E-5)
}

export { LARGE_NUMBER, sim }