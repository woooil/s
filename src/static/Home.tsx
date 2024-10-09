import { Link } from 'react-router-dom'
import './Home.css'

interface AppInfo {
  name: string
  description: string
  link: string
}

function AppLink({ app }: { app: AppInfo }) {
  return (
    <Link
      className="app-link"
      to={app.link}>
      <div className="app-name">{app.name}</div>
      <div className="app-description">{app.description}</div>
    </Link>
  )
}

export default function Home() {
  const Apps: AppInfo[] = [
    {
      name: '가로세로 연산',
      description:
        '사칙연산으로만 이루어진 가로세로의 모든 등식이 성립하도록 빈 칸에 적당한 수를 채워 넣는 퍼즐',
      link: '/cross-math',
    },
    {
      name: '분수의 나눗셈',
      description: '분수의 나눗셈을 블록으로 시각화하여 이해를 돕는 그림',
      link: '/division-diagram',
    },
  ]

  return (
    <div className="home content">
      <h1 className="title">s by Wooil Kim</h1>
      <div className="app-link-container">
        <h3 className="description">도구 바로가기</h3>
        <div className="app-links">
          {Apps.map((app, idx) => (
            <AppLink
              app={app}
              key={idx}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
