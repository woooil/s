import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img
          className="app-logo"
          src={`${process.env.PUBLIC_URL}/logo512.png`}
          alt="app logo"
        />
        <h1 className="app-title">s by Wooil Kim</h1>
      </Link>
    </header>
  )
}
