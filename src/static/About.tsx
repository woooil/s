import { Link } from 'react-router-dom'
import "./style.css"

export default function About() {
  const SIHYUN_LINK = "https://github.com/sihyun-ahn"
  const WOOIL_LINK = "https://wooil.kim"

  return (
    <div className="about">
      <h1>s by Wooil Kim 소개</h1>
      <p>s by Wooil Kim(약칭 s)은 오직 단 한 명을 위한 수학 도구입니다. 수학을 다루는 데 유용한 도구들이 하나씩, 이곳에서 만들어집니다.</p>
      <h2>만들어진 도구</h2>
      <h3>가로세로 연산 (Cross Math Puzzle)</h3>
      <p>가로세로 연산은 사칙연산을 다루는 퍼즐입니다. 사칙연산으로만 이루어진 가로세로의 모든 등식이 성립하도록 빈 칸에 적당한 수를 채워 넣으면 됩니다. 줄과 칸 수를 조절하거나 빈 칸에 들어갈 수의 범위를 지정할 수 있습니다. 빈 칸과 연산을 클릭하여 값이 변하지 않게 고정할 수도 있습니다. 원하는 설정에 맞추고 퍼즐을 마음껏 즐겨 보세요!</p>
      <p>가로세로 연산은 특별히 공동 작업으로 만들어진 도구입니다. 즐거이 작업에 참여해 주신 <Link to={SIHYUN_LINK} target="_blank" rel="noopener noreferrer">안시현</Link>님께 감사 인사를 전합니다!</p>
      <h4>공동 작업자</h4>
      <ul>
        <li><Link to={WOOIL_LINK} target="_blank" rel="noopener noreferrer">김우일</Link>: In charge of view. Created the interface bertween the user and the model and designed the UI.</li>
        <li><Link to={SIHYUN_LINK} target="_blank" rel="noopener noreferrer">안시현</Link>: In charge of model. Implemented the logic of the puzzle and provided the API to the view.</li>
      </ul>
    </div>
  )
}
