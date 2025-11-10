import React from 'react'
import { useDispatch } from 'react-redux'
import './AppSidebar.css'
import AppSidebarNav from './AppSidebarNav'

const AppSidebar = () => {
  const dispatch = useDispatch()

  return (





    <div className="app-sidebar">
      <div className="sidebar-header">
        <h2>Al-Sakhaa</h2>
        <button
          style={
            {
              backgroundColor: 'transparent',
              border: 'none',
              color: '#929aa9ff',
              fontSize: '2.6rem',
              cursor: 'pointer',
              position: 'absolute',
              top: '10px',
              right: '10px',
              marginLeft: '20px',
            }
          }
          className="d-none d-lg-block close-btn"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        >
          ×
        </button>
      </div>
      <div className="sidebar-nav">
        <AppSidebarNav />
      </div>
    </div>
  )
}

export default AppSidebar