import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import './Layout.css'

export default function Layout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
