import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from '../views/Dashboard/Dashboard'

const AppContent = () => {
  return (
    <div className="app-content"  style={{ marginTop: '60px' }}>
      <div className="container px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default AppContent