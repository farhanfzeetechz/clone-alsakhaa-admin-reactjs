import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// import Dashboard from '../views/Dashboard/Dashboard'
import routes from '../routes'

const AppContent = () => {
  return (
    <div className="app-content" style={{ marginTop: '60px' }}>
      <div className="container px-4">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>

            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              )
            })}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />,
          </Routes>
        </Suspense>
      </div>
    </div>
  )
}

export default AppContent