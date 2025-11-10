import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cibOpsgenie,
  cilPeople,
  cilSpeedometer,
  cilUser,
  cilCheck,
  cilFolder,
  cilFolderOpen,
  cilClock,
  cilBan
} from '@coreui/icons'

const navItems = [
  {
    type: 'single',
    name: 'Dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    path: '/dashboard'
  },
  {
    type: 'group',
    name: 'Users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        name: 'All Users',
        to: '/users',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
        header: 'users'
      },
      {
       
        name: 'Subcontractors',
        to: '/subcontractor',
        icon: <CIcon icon={cibOpsgenie} customClassName="nav-icon" fill="white" />,
        header: 'Subcontractors'
      },
      {
        name: 'Customers',
        to: '/customers',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
        header: 'Customers'
      },
      {
        name: 'Project Managers',
        to: '/project-managers',
        icon: <CIcon icon={cibOpsgenie} customClassName="nav-icon" fill="white" />,
        header: 'ProjectManagers'
      },
      {
       
        name: 'Blocked Users',
        to: '/blocked-Users',
        icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
        header: 'blockuser'
      },
    ]
  },
  {
    type: 'group',
    name: 'Projects',
    icon: <CIcon icon={cilFolder} customClassName="nav-icon" />,
    items: [
      { 
        name: 'All Projects', 
        to: '/projects/all',
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
        header: 'AllProjects'
      },
      { 
        name: 'Complete Projects', 
        to: '/projects/complete',
        icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
        header: 'CompleteProjects'
      },
      { 
        name: 'Pending Projects', 
        to: '/projects/pending',
        icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
        header: 'PendingProjects'
      },
      { 
        name: 'Stopped Projects', 
        to: '/projects/stopped',
        icon: <CIcon icon={cilBan} customClassName="nav-icon" />,
        header: 'StoppedProjects'
      }
    ]
  },
  {
    type: 'group',
    name: 'WorkItems',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
    items: [
      {
        name: 'Approval Request',
        to: '/workItems',
        icon: <CIcon icon={cilClock} customClassName="nav-icon" />,
        header: 'admin_work_order_approvals'
      },
      {
        name: 'Approved',
        to: '/admin_work_order_approvals',
        icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
        header: 'admin_work_order_approvals'
      }
    ]
  }
]

export default navItems