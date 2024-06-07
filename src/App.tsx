import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Privacy from './static/Privacy'
import About from './static/About'
import CrossMath from './apps/cross-math/components/App'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/cross-math"
            element={<CrossMath />}
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
            path="*"
            element={
              <Navigate
                replace
                to="cross-math"
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
