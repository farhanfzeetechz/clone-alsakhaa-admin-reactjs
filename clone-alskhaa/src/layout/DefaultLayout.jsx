import React from 'react'
import { useSelector } from 'react-redux'
import { AppContent, AppSidebar, AppHeader } from '../components/index'
import './DefaultLayout.css'

const DefaultLayout = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)

  return (
    <div className={`default-layout ${sidebarShow ? 'sidebar-show' : ''} ${unfoldable ? 'sidebar-unfoldable' : ''}`}>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 flex-grow-1">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout