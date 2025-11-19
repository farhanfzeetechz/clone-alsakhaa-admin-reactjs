import React, { useState, useEffect } from 'react';
import { CCard, CCardHeader, CCardBody, CTable, CButton, CTableHeaderCell, CTableHead, CTableBody, CTableDataCell, CTableRow, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CPagination, CPaginationItem } from '@coreui/react';
import './Allusers.css';
import Colors from '../helper/Colors'
import toast from 'react-hot-toast';
import toastStyle from './../helper/taoststyle';
import Useaxios from '../utility/Useaxios';
import colors from '../helper/Colors';
import ActionUser from '../helper/ActionUser';





const Allusers = () => {

    const { fetchData } = Useaxios();
    const [allUsers, setAllUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    const [role] = useState('');
    const [blockedStatus] = useState('');
    const [showLimitDropdown, setShowLimitDropdown] = useState(false);

    const limitOptions = [10, 25, 50, 100];

    const fetchAllUsers = async () => {
        try {
            const query = `?page=${page}&limit=${limit}${role && `&role=${role}`}`
            const res = await fetchData({
                url: `/api/v1/admin/rolebase/getAllUser${query}`,
                method: 'GET',
            });
            if (res.success) {
                const filteredData = (res.data?.users || []).map(user => {
                    const { tempPass, ...rest } = user
                    return rest
                })

                if (blockedStatus === "blocked") {
                    const blockedUser = filteredData.filter((user) => user.isBlocked)
                    setAllUsers(blockedUser)
                } else {
                    setAllUsers(filteredData)
                }
                setTotalPages(res.data.pagination?.totalPages || 1)
            } else {
                toast.error('Failed to fetch users', toastStyle)
            }
        } catch (err) {
            console.error('API Error:', err);
            toast.error(err.response?.data?.message || 'Failed to fetch users', toastStyle)
        }
    }

    useEffect(() => {
        fetchAllUsers();
    }, [page, limit]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);
        setPage(1);
        setShowLimitDropdown(false);
    };


    const users = [
        { label: 'S.No', key: 'sno' },
        { label: 'User ID', key: 'userId' },
        { label: 'Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Role', key: 'role' },
        { label: 'Joined Date', key: 'createdAt' },
        { label: 'Actions', key: 'actions' },
    ]


    return (
        <div className="users-container">
            <CCard className="users-card">
                <CCardHeader className="users-header">
                    <h2>Registered User</h2>
                    <div className="header-buttons">
                        <CButton
                            style={{
                                background: Colors.primary,
                                color: Colors.secondary,
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${Colors.primary}`,
                                fontWeight: '600',
                                height: '32px',
                                fontSize: '0.875rem',
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
                                    fontWeight: '600',
                                    height: '32px',
                                    fontSize: '0.875rem',
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
                                fontWeight: '600',
                                height: '32px',
                                fontSize: '0.875rem',
                            }}
                        >
                            Export
                        </CButton>
                        <CButton
                            style={{
                                background: Colors.primary,
                                color: Colors.secondary,
                                padding: '6px 12px',
                                borderRadius: '6px',
                                border: `1px solid ${Colors.primary}`,
                                fontWeight: '600',
                                height: '32px',
                                fontSize: '0.875rem',
                            }}
                        >
                            Create User
                        </CButton>
                    </div>
                </CCardHeader>
                <CCardBody className="users-body">
                    <div className='users-table-container'>
                        <CTable hover className="users-table">
                            <CTableHead>
                                <CTableRow>
                                    {users.map((col) => (
                                        <CTableHeaderCell key={col.key}>
                                            {col.label}
                                        </CTableHeaderCell>
                                    ))}
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {allUsers.map((user, index) => (
                                    <CTableRow key={user._id || index}>
                                        <CTableDataCell>{index + 1}</CTableDataCell>
                                        <CTableDataCell>{user.userId || user._id || 'N/A'}</CTableDataCell>
                                        <CTableDataCell>{user.name}</CTableDataCell>
                                        <CTableDataCell>{user.email}</CTableDataCell>
                                        <CTableDataCell>{user.phone || 'N/A'}</CTableDataCell>
                                        <CTableDataCell>{user.role}</CTableDataCell>
                                        <CTableDataCell>{new Date(user.createdAt).toLocaleDateString()}</CTableDataCell>
                                        <CTableDataCell>
                                            <ActionUser
                                                userId={user._id}
                                                isBlocked={user.isBlocked}
                                                user={user}
                                                onUpdate={()=>fetchAllUsers()}
                                                 />
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                        <div className="pagination-container">
                            <CPagination align="center">
                                {Array.from({ length: totalPages }, (_, i) => (
                                    <CPaginationItem
                                        key={i + 1}
                                        style={{
                                            backgroundColor: i + 1 === page ? colors.primary : 'white',
                                            color: i + 1 === page ? colors.secondary : colors.primary,
                                            border: `1px solid ${colors.primary}`,
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => setPage(i + 1)}
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
    )
}

export default Allusers;