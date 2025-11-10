import React, { useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import navItems from '../navitem'
import './AppSidebarNav.css'

const AppSidebarNav = () => {
  const [openMenus, setOpenMenus] = useState({})
  const location = useLocation()

  const toggleMenu = useCallback((menuName) => {
    setOpenMenus(prev => {
      const isCurrentlyOpen = prev[menuName]
      if (isCurrentlyOpen) {
        // If current menu is open, just close it
        return {
          ...prev,
          [menuName]: false
        }
      } else {
        // If current menu is closed, close all others and open this one
        return {
          [menuName]: true
        }
      }
    })
  }, [])



  return (
    <nav className="app-sidebar-nav">
      <ul className="nav-list">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            {item.type === 'single' ? (
              <Link to={item.path} className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}>
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </Link>
            ) : (
              <div className="nav-group">
                <div 
                  className="nav-link group-header"
                  onClick={() => toggleMenu(item.name)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.name}</span>
                  <span className={`dropdown-arrow ${openMenus[item.name] ? 'open' : ''}`}>
                    ▼
                  </span>
                </div>
                {openMenus[item.name] && (
                  <ul className={`submenu ${openMenus[item.name] ? 'open' : ''}`}>
                    {item.items.map((subItem, subIndex) => (
                      <li key={subIndex} className="submenu-item">
                        <Link to={subItem.to || subItem.path} className={`submenu-link ${location.pathname === (subItem.to || subItem.path) ? 'active' : ''}`}>
                          {subItem.icon && <span className="nav-icon">{subItem.icon}</span>}
                          <span className="submenu-text">{subItem.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default React.memo(AppSidebarNav)