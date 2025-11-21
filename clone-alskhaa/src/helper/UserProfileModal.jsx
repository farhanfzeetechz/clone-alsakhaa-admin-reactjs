import React from 'react'
import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CBadge,
} from '@coreui/react'
import {
    FaTimes,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaUserTag,
    FaIdCard
} from 'react-icons/fa'
import colors from './Colors'
import "./UserProfileModal.css"

const UserProfileModal = ({ visible, onClose, user, buttonTitle, onButtonPress }) => {

    const getStatusColor = (isBlocked) => {
        return isBlocked ? '#dc3545' : colors.primary
    }




    const getRoleColor = (role) => {
        const roleColors = {
            admin: '#dc3545',
            user: '#007bff',
            customer: '#28a745',
            project_manager: '#fd7e14',
            subcontractor: '#6f42c1'
        }
        return roleColors[role?.toLowerCase()] || colors.primary
    }


    if (!user) return null

    return (
        <CModal
            visible={visible}
            onClose={onClose}
            size="lg"
            alignment="center"
            backdrop="static"
            className="user-profile-modal"
        >
            <div className="modal-container">

                {/* Header */}
                <div className="modal-header-custom">
                    <div className="header-content">
                        <div className="header-icon">
                            <FaUser />
                        </div>
                        <div className="header-text">
                            <h2>User Profile</h2>
                            <p>Complete user information</p>
                        </div>
                    </div>
                    <button className="close-button" onClick={onClose}>
                        <FaTimes />
                    </button>
                </div>

                {/* Body */}
                <div className="modal-body-custom">

                    {/* Profile Card */}
                    <div className="profile-header-card">
                        <div className="avatar-section">
                            <div className="user-info">
                                <h3 className="user-name">{user.name || 'Unknown User'}</h3>

                                <p className="user-email">
                                    <FaEnvelope className="icon" />
                                    {user.email || 'No email provided'}
                                </p>

                                <div className="badges-container">
                                    <CBadge
                                        className="badge-custom"
                                        style={{
                                            backgroundColor: getStatusColor(user.isBlocked || user.blocked),
                                        }}
                                    >
                                        {user.isBlocked || user.blocked ? '🚫 Blocked' : '✅ Active'}
                                    </CBadge>

                                    <CBadge
                                        className="badge-custom"
                                        style={{
                                            backgroundColor: getRoleColor(user.role),
                                        }}
                                    >
                                        <FaUserTag style={{ fontSize: '0.7rem', marginRight: "4px" }} />
                                        {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                                    </CBadge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details */}
                    <div className="details-grid">

                        <div className="detail-item">
                            <div className="detail-icon"><FaIdCard /></div>
                            <div className="detail-content">
                                <span className="detail-label">USER ID</span>
                                <span className="detail-value">{user.userId || user._id || 'N/A'}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon"><FaPhone /></div>
                            <div className="detail-content">
                                <span className="detail-label">PHONE NUMBER</span>
                                <span className="detail-value">{user.phone || 'Not provided'}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon"><FaMapMarkerAlt /></div>
                            <div className="detail-content">
                                <span className="detail-label">ADDRESS</span>
                                <span className="detail-value">{user.address || 'Not provided'}</span>
                            </div>
                        </div>

                        <div className="detail-item">
                            <div className="detail-icon">🏙️</div>
                            <div className="detail-content">
                                <span className="detail-label">CITY</span>
                                <span className="detail-value">{user.city || 'Not provided'}</span>
                            </div>
                        </div>

                        {user.state && (
                            <div className="detail-item">
                                <div className="detail-icon">🗺️</div>
                                <div className="detail-content">
                                    <span className="detail-label">STATE</span>
                                    <span className="detail-value">{user.state}</span>
                                </div>
                            </div>
                        )}

                        <div className="detail-item">
                            <div className="detail-icon"><FaCalendarAlt /></div>
                            <div className="detail-content">
                                <span className="detail-label">MEMBER SINCE</span>
                                <span className="detail-value">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })
                                        : 'N/A'}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer */}
                <div className="modal-footer-custom">
                    <CButton
                        color="secondary"
                        onClick={onClose}
                        className="close-btn"
                    >
                        <FaTimes style={{ marginRight: '0.5rem' }} />
                        Close
                    </CButton>

                    {buttonTitle && onButtonPress && (
                        <CButton
                            onClick={() => onButtonPress(user._id, onClose)}
                            className="action-btn"
                            style={{
                                backgroundColor: (user.isBlocked || user.blocked) ? colors.primary : '#dc3545',
                                borderColor: (user.isBlocked || user.blocked) ? colors.primary : '#dc3545'
                            }}
                        >
                            {buttonTitle}
                        </CButton>
                    )}
                </div>
            </div>
        </CModal>
    )
}

export default UserProfileModal
