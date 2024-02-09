import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import CrossMath from './apps/cross-math/App'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cross-math"
          element={<CrossMath />}
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
      </Routes>
    </BrowserRouter>
  )
}
