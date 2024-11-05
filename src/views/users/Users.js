import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { cilPlus, cilPencil, cilTrash, cilSearch } from '@coreui/icons'
import '../../assets/css/Cases.css' // Import custom CSS file
import ReactSelect from 'react-select'
import { create, getUser, updateUser, deleteUser } from '../../api/authService' // Adjust the path as necessary
import Swal from 'sweetalert2'
const initialTableData = []

const priorityOptions = [
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
]
const districtOptions = [
  'National',
  'Balaka',
  'Blantyre',
  'Chikwawa',
  'Chiradzulu',
  'Chitipa',
  'Dedza',
  'Dowa',
  'Karonga',
  'Kasungu',
  'Likoma',
  'Lilongwe',
  'Machinga',
  'Mangochi',
  'Mchinji',
  'Mulanje',
  'Mzuzu',
  'Mwanza',
  'Neno',
  'Nkhatabay',
  'Nkhotakota',
  'Nsanje',
  'Ntcheu',
  'Ntchisi',
  'Phalombe',
  'Rumphi',
  'Salima',
  'Thyolo',
  'Zomba',
]

const roleOptions = [
  { label: 'Admin', value: 'ADMIN1' },
  { label: 'Manager', value: 'ADMIN2' },
  { label: 'Call Center Agent', value: 'ADMIN3' },
]

const programmeOptions = ['Programme', 'School Meals']
const loggedInUserEmail = localStorage.getItem('userEmail') // Replace this with the actual logged-in user's email

const Users = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [tableData, setTableData] = useState(initialTableData)
  const [currentPage, setCurrentPage] = useState(1)
  const [showModal, setShowModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [formData, setFormData] = useState({})
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteIndex, setDeleteIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null)

  const pageSize = 5
  const totalPages = Math.ceil(tableData.length / pageSize)
  const filteredData = tableData.filter((item) =>
    Object.values(item).some((value) => {
      // Check if value is not null or undefined before calling toString()
      if (value !== null && value !== undefined) {
        return value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      }
      return false // If value is null or undefined, don't include it in the filter
    }),
  )

  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  const handlePageChange = (page) => setCurrentPage(page)
  const handleAddClick = () => {
    setFormData({})
    setEditIndex(null)
    setShowModal(true)
  }

  const debounce = (fn, delay) => {
    let timeoutId
    return (...args) => {
      if (timeoutId) clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        fn.apply(null, args)
      }, delay)
    }
  }

  const handleSearch = debounce((query) => {
    setSearchQuery(query)
    setCurrentPage(1) // Reset to first page on new search
  }, 300)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUser()
        setTableData(users)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }

    fetchUsers()
  }, []) // Empty dependency array ensures this runs once on mount

  const handleEditClick = (index) => {
    setFormData(tableData[index])
    setEditIndex(index)
    setShowModal(true)
  }

  const handleDeleteClick = (index) => {
    setDeleteIndex(index)
    setShowDeleteConfirm(true)
  }

  const handleFormChange = (e) => {
    const { name, value, options } = e.target
    if (e.target.multiple) {
      const selectedValues = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value)
      setFormData({ ...formData, [name]: selectedValues })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleFormSubmit = async () => {
    try {
      if (editIndex !== null) {
        // Prepare the updated user data
        const updatedUser = {
          ...formData,
          priority: formData.priority
            ? formData.priority.map((option) => option.value).join(', ')
            : '', // Handle undefined case
          status: true,
          delegations: '',
        }

        // Send updatedUser to the API for updating
        await updateUser(updatedUser.id, updatedUser) // Assuming `id` is part of formData

        // Update table data locally
        const updatedTableData = [...tableData]
        updatedTableData[editIndex] = updatedUser
        setTableData(updatedTableData)

        Swal.fire({
          text: 'User updated successfully',
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      } else {
        // Handle creation logic
        const newUser = {
          ...formData,
          priority: formData.priority
            ? formData.priority.map((option) => option.value).join(', ')
            : '',
        }
        await create(newUser)
        setTableData([...tableData, newUser])

        Swal.fire({
          text: 'User created successfully',
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      }

      setShowModal(false) // Close modal on success
    } catch (error) {
      console.error('Error saving user:', error)

      Swal.fire({
        text: 'Failed to save user. Please try again.',
        icon: 'error',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    }
  }
  const confirmDelete = async () => {
    try {
      const userId = tableData[deleteIndex].id // Adjust if ID field is different

      // Send delete request to the API
      await deleteUser(userId)

      // Update table data locally
      const updatedData = tableData.filter((_, index) => index !== deleteIndex)
      setTableData(updatedData)
      setShowDeleteConfirm(false)
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Failed to delete user. Please try again.')
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between mb-3">
        <CInputGroup className="w-50">
          <CInputGroupText>
            <CIcon icon={cilSearch} />
          </CInputGroupText>
          <CFormInput
            placeholder="Search"
            onChange={(e) => handleSearch(e.target.value)} // Use the debounced search function
          />
        </CInputGroup>
        <CButton color="primary" onClick={handleAddClick} style={{ color: 'white' }}>
          <CIcon icon={cilPlus} className="me-2" style={{ color: 'white' }} />
          Add User
        </CButton>
      </div>

      <CCard className="mb-4">
        <CCardBody>
          <CTable align="middle" className="table-sm mb-0 border table-hover" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                {[
                  'First Name',
                  'Last Name',
                  'Email',
                  'District',
                  'Role',
                  'Priority Category',
                  'Programme',
                  'Actions',
                ].map((header) => (
                  <CTableHeaderCell key={header}>{header}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData
                .filter((item) => item.email !== loggedInUserEmail) // Exclude the logged-in user
                .map((item, index) => (
                  <CTableRow
                    key={index}
                    className="table-row-hover"
                    onMouseEnter={() => setHoveredRowIndex(index)}
                    onMouseLeave={() => setHoveredRowIndex(null)}
                  >
                    {/* Map each column explicitly */}
                    <CTableDataCell>{item.firstname}</CTableDataCell>
                    <CTableDataCell>{item.lastname}</CTableDataCell>
                    <CTableDataCell>{item.email}</CTableDataCell>
                    <CTableDataCell>{item.district}</CTableDataCell>
                    <CTableDataCell>
                      {item.roleId === 'ADMIN1'
                        ? 'Admin'
                        : item.roleId === 'ADMIN2'
                          ? 'Manager'
                          : item.roleId === 'ADMIN3'
                            ? 'Call Center'
                            : 'Unknown Role'}
                    </CTableDataCell>
                    <CTableDataCell>{item.priority}</CTableDataCell>
                    <CTableDataCell>{item.programme}</CTableDataCell>
                    <CTableDataCell className="actions-cell">
                      {hoveredRowIndex === index && (
                        <div className="action-buttons">
                          <CButton
                            color="info"
                            size="sm"
                            onClick={() => handleEditClick((currentPage - 1) * pageSize + index)}
                            style={{ color: 'white' }}
                          >
                            <CIcon icon={cilPencil} />
                          </CButton>
                          <CButton
                            color="danger"
                            size="sm"
                            className="ms-2"
                            onClick={() => handleDeleteClick((currentPage - 1) * pageSize + index)}
                            style={{ color: 'white' }}
                          >
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </div>
                      )}
                    </CTableDataCell>
                  </CTableRow>
                ))}
            </CTableBody>
          </CTable>

          <CPagination align="center" className="mt-3">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </CPaginationItem>
            {[...Array(totalPages)].map((_, pageIndex) => (
              <CPaginationItem
                key={pageIndex}
                active={pageIndex + 1 === currentPage}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>

      {/* Modal for adding/editing */}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader closeButton>
          <CModalTitle>{editIndex !== null ? 'Edit User' : 'Add User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel>First Name</CFormLabel>
            <CFormInput
              name="firstname"
              value={formData.firstname || ''}
              onChange={handleFormChange}
              required
            />
            <CFormLabel>Last Name</CFormLabel>
            <CFormInput
              name="lastname"
              value={formData.lastname || ''}
              onChange={handleFormChange}
              required
            />
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleFormChange}
              required
            />
            <CFormLabel>Phone</CFormLabel>
            <CFormInput
              type="phone"
              name="phone"
              value={formData.phone || ''}
              onChange={handleFormChange}
              required
            />

            <CFormLabel>District</CFormLabel>
            <CFormSelect
              name="district"
              value={formData.district || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Select District</option>
              {districtOptions.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </CFormSelect>
            <CFormLabel>Priority Category</CFormLabel>
            <ReactSelect
              isMulti
              options={priorityOptions}
              onChange={(selectedOptions) =>
                setFormData({ ...formData, priority: selectedOptions })
              }
              value={formData.priority || []}
            />
            <CFormLabel>Programme</CFormLabel>
            <CFormSelect
              name="programme"
              value={formData.programme || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Programme</option>
              {programmeOptions.map((programme, index) => (
                <option key={index} value={programme}>
                  {programme}
                </option>
              ))}
            </CFormSelect>
            {/* New Role ID Field */}
            <CFormLabel>Role</CFormLabel>
            <CFormSelect
              name="roleId"
              value={formData.roleId || ''}
              onChange={handleFormChange}
              required
            >
              <option value="">Select Role</option>
              {roleOptions.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </CFormSelect>
            <CFormLabel>Password</CFormLabel>
            <CInputGroup>
              <CFormInput
                name="password"
                type={showPassword ? 'text' : 'password'} // Toggle input type
                value={formData.password || ''}
                onChange={handleFormChange}
                required
              />
              <CInputGroupText
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                <CIcon icon={showPassword ? cilPencil : cilTrash} />
              </CInputGroupText>
            </CInputGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleFormSubmit}>
            {editIndex !== null ? 'Update User' : 'Add User'}
          </CButton>
        </CModalFooter>
      </CModal>
      {/* Confirmation Modal for Delete */}
      <CModal visible={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <CModalBody>Are you sure you want to delete this user?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </CButton>
          <CButton color="danger" onClick={confirmDelete}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default Users
