import React, { useState, useEffect } from 'react';
import {
    CCard, CCardHeader, CCardBody, CTable, CButton, CTableHeaderCell,
    CTableHead, CTableBody, CTableDataCell, CTableRow, CPagination, CPaginationItem
} from '@coreui/react';
import './Allusers.css';
import Colors from '../helper/Colors'
import toast from 'react-hot-toast';
import toastStyle from './../helper/taoststyle';
import Useaxios from '../utility/Useaxios';
import colors from '../helper/Colors';
import { FaEye } from 'react-icons/fa';
import Swal from 'sweetalert2';
import UserProfileModal from '../helper/UserProfileModal';
import handleBlock from '../helper/ActionUser';

const BlockedUser = () => {

    const { fetchData } = Useaxios();
    const [allUsers, setAllUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [showLimitDropdown, setShowLimitDropdown] = useState(false);
    const [showUserProfileModal, setShowUserProfileModal] = useState([])
    const [selectedUser, setSelectedUser] = useState({})

    const limitOptions = [10, 25, 50, 100];

    //  Fetch Blocked Users
    const fetchBlockedUsers = async () => {
        try {
            const query = `?page=${page}&limit=${limit}`;
            const res = await fetchData({
                url: `/api/v1/admin/rolebase/getAllUser${query}`,
                method: 'GET',
            });

            if (res.success) {
                const filteredData = (res.data?.users || []).map(u => {
                    const { tempPass, ...rest } = u;
                    return rest;
                });

                const blockedList = filteredData.filter(u => u.isBlocked);
                setAllUsers(blockedList);

                setTotalPages(res.data?.pagination?.totalPages || 1);
            } else {
                toast.error('Failed to fetch blocked users', toastStyle);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to fetch blocked users', toastStyle);
        }
    };

    useEffect(() => {
        fetchBlockedUsers();
    }, [page, limit]);

    // Activate User (Unblock)
    const ActivateUser = async (userId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to activate (unblock) this user?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, activate!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: colors.primary,
            cancelButtonColor: '#d33',
        });

        if (result.isConfirmed) {
            try {
                const res = await fetchData({
                    url: `/api/v1/admin/rolebase/blockUser/${userId}`,
                    method: 'POST',
                    data: { isBlocked: false },
                });

                if (res.success) {
                    toast.success('User activated successfully', toastStyle);
                    fetchBlockedUsers();
                } else {
                    toast.error('Failed to activate user', toastStyle);
                }
            } catch {
                toast.error('Failed to activate user', toastStyle);
            }
        }
    };

    // Handle Limit Change
    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
        setShowLimitDropdown(false);
    };


    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowUserProfileModal(true);
    };




    const tableHeaders = [
        { label: 'S.No', key: 'sno' },
        { label: 'User ID', key: 'userId' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Role', key: 'role' },
        { label: 'Joined Date', key: 'createdAt' },
        { label: 'Action', key: 'action' },
    ];

    return (
        <div className="users-container">
            <UserProfileModal
                visible={showUserProfileModal}
                onClose={() => setShowUserProfileModal(false)}
                user={selectedUser}
                buttonTitle={selectedUser?.isBlocked ? 'Unblock User' : 'Block User'}
                onButtonPress={selectedUser?.isBlocked ? ActivateUser : handleBlock}
            />
            <CCard className="users-card">
                <CCardHeader className="users-header">
                    <h2>Blocked Users</h2>

                    <div className="header-buttons">
                        <CButton
                            style={{
                                background: Colors.primary,
                                color: Colors.secondary,
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${Colors.primary}`,
                                height: '32px',
                            }}
                        >
                            Show Filters
                        </CButton>

                        <div className="custom-dropdown">
                            <CButton
                                onClick={() => setShowLimitDropdown(!showLimitDropdown)}
                                style={{
                                    background: Colors.primary,
                                    color: Colors.secondary,
                                    padding: '6px 12px',
                                    borderRadius: '6px',
                                    border: `1px solid ${Colors.primary}`,
                                    height: '32px',
                                }}
                            >
                                Show {limit} ▼
                            </CButton>

                            {showLimitDropdown && (
                                <div className="dropdown-menu-custom">
                                    {limitOptions.map((option) => (
                                        <div
                                            key={option}
                                            className={`dropdown-item-custom ${limit === option ? 'active' : ''}`}
                                            onClick={() => handleLimitChange(option)}
                                        >
                                            Show {option}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <CButton
                            style={{
                                background: Colors.primary,
                                color: Colors.secondary,
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${Colors.primary}`,
                                height: '32px',
                            }}
                        >
                            Export
                        </CButton>
                    </div>
                </CCardHeader>

                <CCardBody className="users-body">
                    <div className="users-table-container">
                        <CTable hover className="users-table">
                            <CTableHead>
                                <CTableRow>
                                    {tableHeaders.map((h) => (
                                        <CTableHeaderCell key={h.key}>{h.label}</CTableHeaderCell>
                                    ))}
                                </CTableRow>
                            </CTableHead>

                            <CTableBody>
                                {allUsers.map((user, index) => (
                                    <CTableRow key={user._id || index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{user.userId || user._id}</CTableDataCell>
                                        <CTableDataCell>{user.name}</CTableDataCell>
                                        <CTableDataCell>{user.email}</CTableDataCell>
                                        <CTableDataCell>{user.phone || 'N/A'}</CTableDataCell>
                                        <CTableDataCell>{user.role}</CTableDataCell>
                                        <CTableDataCell>{new Date(user.createdAt).toLocaleDateString()}</CTableDataCell>

                                        <CTableDataCell>
                                            <div className="d-flex gap-2">
                                                <button
                                                    className="btn btn-action btn-view"
                                                    onClick={() => handleViewUser(user)}
                                                >
                                                    <FaEye size={16} />
                                                </button>

                                                <CButton
                                                    size="sm"
                                                    style={{
                                                        background: colors.primary,
                                                        color: colors.secondary,
                                                        borderRadius: "6px",
                                                        padding: "6px 12px",
                                                    }}
                                                    onClick={() => ActivateUser(user._id)}
                                                >
                                                    Activate
                                                </CButton>
                                            </div>
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>

                        {/* Pagination */}
                        <div className="pagination-container">
                            <CPagination align="center">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <CPaginationItem
                                        key={i + 1}
                                        active={i + 1 === page}
                                        onClick={() => setPage(i + 1)}
                                        style={{
                                            cursor: "pointer",
                                            background: i + 1 === page ? colors.primary : "white",
                                            color: i + 1 === page ? "white" : colors.primary,
                                        }}
                                    >
                                        {i + 1}
                                    </CPaginationItem>
                                ))}
                            </CPagination>
                        </div>

                    </div>
                </CCardBody>
            </CCard>
        </div>
    );
};

export default BlockedUser;
