import React, { useState } from 'react'
import { FaEye, FaUnlock } from 'react-icons/fa'
import { MdBlock, MdDelete } from 'react-icons/md'
import './ActionUser.css'
import toastStyle from '../helper/taoststyle'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'
import Useaxios from '../utility/Useaxios'
import colors from './Colors'

const ActionUser = ({ onview,user, onUpdate,handleBlock }) => {

    // console.log(user)
    const { fetchData } = Useaxios()
    const [loading, setLoading] = useState(false)

    const handleBlock = async (id, isCurrentlyBlocked) => {
    console.log(id);
    
        const actionText = isCurrentlyBlocked ? 'unblock' : 'block'
        const actionMessage = isCurrentlyBlocked
            ? 'Do you want to unblock this user?'
            : 'Do you want to block this user?'

        const successMessage = isCurrentlyBlocked
            ? 'User unblocked successfully'
            : 'User blocked successfully'

        const result = await Swal.fire({
            title: `Are you sure?`,
            text: actionMessage,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, ${actionText} this user!`,
            cancelButtonText: 'Cancel',
            confirmButtonColor: isCurrentlyBlocked ? '#28a745' : colors.primary,
            cancelButtonColor: '#6c757d',
        })

        if (result.isConfirmed) {
            setLoading(true)
            try {
                const res = await fetchData({
                    url: `/api/v1/admin/rolebase/blockUser/${id}`,
                    method: 'POST',
                    data: {
                        userId: id,
                        action: !isCurrentlyBlocked
                    },
                })

                if (res.success) {
                    toast.success(successMessage, toastStyle)
                    onUpdate && onUpdate()
                } else {
                    toast.error(res.message || `Failed to ${actionText} user`, toastStyle)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Something went wrong', toastStyle)
            } finally {
                setLoading(false)
            }
        }
    }

    const handleDelete = async (id) => {

        if (!id) {
            toast.error("User ID missing", toastStyle)
            return
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'Do you want to delete this user? This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete!',
            cancelButtonText: 'Cancel',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
        })

        if (result.isConfirmed) {
            try {
                const res = await fetchData({
                    url: `/api/v1/admin/rolebase/deleteUser/${id}`,
                    method: 'DELETE',
                })

                if (res?.success) {
                    toast.success('User deleted successfully', toastStyle)
                    onUpdate && onUpdate()
                } else {
                    toast.error('User delete failed', toastStyle)
                }
            } catch (error) {
                toast.error(error?.response?.data?.message || 'Failed to delete user', toastStyle)
            }
        }
    }

    const isUserBlocked = user?.isBlocked || user?.blocked

    return (
        <div className="d-flex">
            <button
                className="btn-action btn-view"
                onClick={() => onview(user)}
                title="View user details"
            >
                <FaEye size={16} />
            </button>

            <button
                className={`btn-action ${
                   user?.isBlocked ? 'btn-unblock' : 'btn-block'
                }`}
                onClick={() => handleBlock(user._id, user?.isBlocked)}
                title={user?.isBlocked ? 'Unblock User' : 'Block User'}
                disabled={loading}
            >
                {user?.isBlocked ? <FaUnlock size={16} /> : <MdBlock size={16} />}
            </button>

            <button
                className="btn-action btn-delete"
                onClick={() => handleDelete(user?._id)}
                title="Delete user"
                disabled={loading}
            >
                <MdDelete size={16} />
            </button>
        </div>
    )
}

export default ActionUser
