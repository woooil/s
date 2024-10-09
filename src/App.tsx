import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Privacy from './static/Privacy'
import About from './static/About'
import Home from './static/Home'
import CrossMath from './apps/cross-math/components/App'
import DivisionDiagram from './apps/division-diagram/components/App'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={<Home />}
          />
          <Route
            path="/privacy"
            element={<Privacy />}
          />
          <Route
            path="/about"
            element={<About />}
          />
          <Route
            path="/cross-math"
            element={<CrossMath />}
          />
          <Route
            path="/division-diagram"
            element={<DivisionDiagram />}
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="home"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
