import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="left">
        <Link
          className="homepage-link"
          to="/">
          <img
            className="app-logo"
            src={`${process.env.PUBLIC_URL}/logo512.png`}
            alt="app-logo"
          />
        </Link>
      </div>
      <div className="middle">
        <div className="title">
          <Link
            className="homepage-link"
            to="https://s.wooil.kim">
            s by Wooil Kim
          </Link>
          <div>&nbsp;— 단 한 명을 위한 수학 도구</div>
          <Link
            className="github-link"
            to="https://github.com/woooil/s"
            target="_blank"
            rel="noopener noreferrer">
            <img
              className="github-logo"
              src={`${process.env.PUBLIC_URL}/github.png`}
              alt="github page"
            />
          </Link>
        </div>
        <div>
          <Link
            className="privacy-link"
            to="/privacy">
            개인정보처리방침
          </Link>
          <Link
            className="about-link"
            to="/about">
            서비스 안내
          </Link>
        </div>
        <div>
          <div>© 2024.&nbsp;</div>
          <Link
            className="wooil-kim-link"
            to="https://wooil.kim"
            target="_blank"
            rel="noopener noreferrer">
            wooil.kim.
          </Link>
          <div>&nbsp;All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
