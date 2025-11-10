import React from 'react'
import './AppHeader.css'
import AppHeaderDropdown from './AppHeaderDropdown'
import { CIcon } from '@coreui/icons-react'
import { cilMoon } from '@coreui/icons'

const AppHeader = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <button className="menu-toggle">
          ☰
        </button>
        <h1 className="page-title">Dashboard</h1>
      </div>
      <div className="header-right">
        <div style={{paddingTop: '0.25rem', paddingBottom: '0.25rem'}}>
            <div style={{width: '1px', height: '40px', marginLeft: '0.5rem', marginRight: '0.8rem', backgroundColor: '#a1a1a1'}}></div>
          </div>
           <CIcon icon={cilMoon} style={{
            width:'24px',
            height:'30px',
           }} />
           <div style={{paddingTop: '0.25rem', paddingBottom: '0.25rem'}}>
            <div style={{width: '1px', height: '40px', marginLeft: '0.8rem', marginRight: '0.5rem', backgroundColor: '#a1a1a1'}}></div>
          </div>
          <AppHeaderDropdown />
        </div>
    </header>
  )
}

export default AppHeader