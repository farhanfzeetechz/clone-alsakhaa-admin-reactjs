import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import Swal from 'sweetalert2'
import CIcon from '@coreui/icons-react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { cilCommentSquare, cilCreditCard, cilFile, cilLockLocked, cilSettings, cilTask, cilUser } from '@coreui/icons'
import colors from '../helper/Colors'

const AppHeaderDropdown = () => {
  const [token, setToken] = useState('')
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const tokenFromCookie = localStorage.getItem('token')
    setToken(tokenFromCookie)
  }, [])

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#c00b1a',
      cancelButtonColor: '#3085d6',
    })
    if (!result.isConfirmed) return
    Cookies.remove('token')
    Cookies.remove('userRole')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div style={{ position: 'relative' }}>
      <div onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: 'pointer' }}>
        <CIcon icon={cilUser} style={{
          width: "34px", 
          height: "30px",
          color: "#a1a1a1"
        }} />
      </div>
      {showDropdown && (
        <div className="pt-0" style={{ 
          position: 'absolute',
          right: '3px',
          top: '50px',
          background: colors.primary, 
          color: colors.secondary,
          minWidth: '150px',
          borderRadius: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          zIndex: 1000
        }}>
          <div className="text-white fw-semibold mb-2" style={{ padding: '8px 16px' }}>Account</div>
          {token ? (
            <div
              onClick={handleLogout}
              className="d-flex align-items-center"
              style={{
                display: 'flex',
                alignItems: 'center', 
                padding: '8px 16px',
                cursor: 'pointer',
                color: isHovered ? colors.primary : colors.secondary,
                backgroundColor: isHovered ? colors.secondary : "black",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <CIcon icon={cilLockLocked} style={{
                width: "24px",
                height: "24px",
                color: "#a1a1a1"
              }}/>
              Log-out
            </div>
          ) : (
            <div onClick={() => navigate('/login')} className="d-flex align-items-center" style={{ padding: '8px 16px', cursor: 'pointer' }}>
              <CIcon icon={cilUser} className="me-2" />
              Log-In
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AppHeaderDropdown