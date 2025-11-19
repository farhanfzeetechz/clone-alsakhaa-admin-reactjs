import { CCardBody, CCardHeader } from '@coreui/react';
import React, { useEffect, useRef, useState } from 'react'
import './Dashboard.css'
import toast, { Toaster } from 'react-hot-toast'
import toastStyle from '../../helper/taoststyle';
import { cilBriefcase, cilChartLine, cilCheckCircle, cilUser, cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard } from '@coreui/react';
import colors from '../../helper/Colors';
import Useaxios from '../../utility/Useaxios';

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState([])
  const { fetchData } = Useaxios();


  const fetchDataDashboard = async () => {
    try {
      const res = await fetchData({
        url: "/api/v1/admin/rolebase/getdashboardData",
        method: "GET",
      })
      if (res?.success && res?.data) {
        setDashboardData(res.data)
      } else {
        toast.error(res?.message || "Failed to fetch dashboard data", toastStyle)
      }

    } catch (error) {
      console.log(error)
      toast.error("Error fetching dashboard data", toastStyle)
    }
  }

  useEffect(() => {
    fetchDataDashboard();
  }, []);






  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.success('Welcome to the Dashboard!', toastStyle);
      hasShownToast.current = true;
    }
    // fetchDataDashboard();
  }, []);

  const {
    totalUsers,
    usersByRole,
    totalProjects,
    projectStatusCount,
    workItems,
  } = dashboardData;


  return (
    <div className="dashboard">
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-content">

            {/* Total Users */}
            <div className="stat-icon">
              <CIcon icon={cilUser} style={{ color: '#3B82F6' }} />
            </div>
            <p className="stat-number">{totalUsers}</p>
          </div>
          <h3>Total Users</h3>
        </div>
        {/* Total Projects */}
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <CIcon icon={cilBriefcase} style={{ color: '#10B981' }} /></div>
            <p className="stat-number">{totalProjects}</p>
          </div>
          <h3>Total Projects</h3>
        </div>

        {/* Work Items */}
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <CIcon icon={cilCheckCircle} style={{ color: '#8B5CF6' }} />
            </div>
            <p className="stat-number">{workItems?.total || 0}</p>
          </div>
          <h3>Work Items</h3>
        </div>

        {/* Completion Rate */}
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <CIcon icon={cilChartLine} style={{ color: '#F59E0B' }} />
            </div>
            <p className="stat-number">{workItems?.completed || 0}%</p>
          </div>
          <h3>Completion Rate</h3>
        </div>

        {/* Unassigned Tasks */}
        <div className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">
              <CIcon icon={cilWarning} style={{ color: '#EF4444' }} />
            </div>
            <p className="stat-number">{workItems?.unassigned || 0}</p>
          </div>
          <h3>Unassigned Tasks</h3>
        </div>
      </div>



      {/* Charts Section */}
      <div className="dashboard-charts">
        <div className="chart-row">
          <CCard className='Chart-card'>
            <CCardHeader>
              <h5>Project Status Distribution</h5>
            </CCardHeader>
            <CCardBody>
              {/* Chart component goes here */}
              <div className='chart-container'>
                <div className="pie-chart">
                  <div className='chart-legend'>
                    <div className='legend-item'>
                      <span className='legend-color' style={{ backgroundColor: '#10B981' }}></span>
                      <span>Completed:  {projectStatusCount?.completed || 0}</span>
                    </div>
                    <div className='legend-item'>
                      <span className='legend-color in-progress' style={{ backgroundColor: '#F59E0B' }}></span>
                      <span>In Progress:  {projectStatusCount?.in_progress || 0}</span>
                    </div>
                    <div className='legend-item'>
                      <span className='legend-color not-started' style={{ backgroundColor: '#EF4444' }}></span>
                      <span>Not Started:   {projectStatusCount?.not_started || 0}</span>
                    </div>
                    <div className='legend-item'>
                      <span className='legend-color on-hold' style={{ backgroundColor: '#3B82F6' }}></span>
                      <span>On Hold:  {projectStatusCount?.on_hold || 0}</span>
                    </div>
                  </div>
                  <div className="pie-visual">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                      <circle
                        cx="100"
                        cy="100"
                        r="80"
                        fill="none"
                        // stroke="#10B981"
                        strokeWidth="20"
                        strokeDashoffset={`${502 - (502 * (projectStatusCount?.completed || 0)) / 100}`}
                        transform="rotate(-90 100 100)"
                      />
                    </svg>
                    <div className="pie-center">
                      <div className="pie-percentage">0%</div>
                      <div className="pie-label">Complete</div>
                    </div>
                  </div>
                </div>
              </div>
            </CCardBody>
          </CCard>





          <CCard className='Chart-card'>
            <CCardHeader>
              <h5>User Distribution</h5>
            </CCardHeader>
            <CCardBody>
              <div className="bar-chart">
                <div className="bar-item">
                  <div className="bar-label">Customers</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: '75%',
                        backgroundColor: '#3B82F6'
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">{usersByRole?.customer || 0}</div>
                </div>
                <div className="bar-item">
                  <div className="bar-label">Managers</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: '15%',
                        backgroundColor: '#10B981'
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">{usersByRole?.project_manager || 0}</div>
                </div>
                <div className="bar-item">
                  <div className="bar-label">Subcontractors</div>
                  <div className="bar-container">
                    <div
                      className="bar-fill"
                      style={{
                        width: '15%',
                        backgroundColor: '#F59E0B'
                      }}
                    ></div>
                  </div>
                  <div className="bar-value">{usersByRole?.subcontractor || 0}</div>
                </div>
              </div>
            </CCardBody>
          </CCard>



        </div>

        {/* Work Items Progress */}
        <CCard className="progress-overview"
          style={{
            backgroundColor: colors.primary,
          }}
        >
          <CCardHeader>
            <h5>Work Items Overview</h5>
          </CCardHeader>
          <CCardBody>
            <div className="progress-stats">
              <div className="progress-item">
                <div className="progress-circle">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="#10B981"
                      strokeWidth="8"
                      strokeDasharray={`${((workItems?.in_progress || 0) / (workItems?.total || 1)) * 188} 188`}
                      strokeDashoffset="0"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="circle-text">{workItems?.completed || 0}%</div>
                </div>
                <div className="progress-label">Completed</div>
              </div>
              <div className="progress-item">
                <div className="progress-circle">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="8"
                      strokeDasharray={`${((workItems?.in_progress || 0) / (workItems?.total || 1)) * 188} 188`}
                      strokeDashoffset="0"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="circle-text">{Math.round(((workItems?.in_progress || 0) / (workItems?.total || 1)) * 100)}%
                  </div>
                </div>
                <div className="progress-label">In Progress</div>
              </div>
              <div className="progress-item">
                <div className="progress-circle">
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle cx="40" cy="40" r="30" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle
                      cx="40"
                      cy="40"
                      r="30"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="8"
                      strokeDasharray={`${((workItems?.unassigned || 0) / (workItems?.total || 1)) * 188} 188`}
                      strokeDashoffset="0"
                      transform="rotate(-90 40 40)"
                    />
                  </svg>
                  <div className="circle-text">{workItems?.unassigned || 0}%</div>
                </div>
                <div className="progress-label">Unassigned</div>
              </div>
            </div>
          </CCardBody>
        </CCard>


      </div>
    </div>
  )
}

export default Dashboard