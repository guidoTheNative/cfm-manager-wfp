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
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '../../../assets/css/Cases.css' // Import custom CSS file
import Swal from 'sweetalert2' // Import Swal
import { createCase, updateCase, deleteCase, getCase } from '../../../api/caseService' // Import your API functions

import moment from 'moment'
const initialTableData = []

const caseCategories = ['Category A', 'Category B', 'Category C']
const priorities = ['High', 'Medium', 'Low']
const status = ['Opened', 'Closed']

const districts = [
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
const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (char) => char.toUpperCase())
}

const AdminCases = () => {
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
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  )
  const currentData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  useEffect(() => {
    // Fetch initial data when the component mounts
    const fetchCases = async () => {
      const cases = await getCase() // Fetch cases from the API
      setTableData(cases)
    }
    fetchCases()
  }, [])

  const handlePageChange = (page) => setCurrentPage(page)
  const handleAddClick = () => {
    setFormData({})
    setEditIndex(null)
    setShowModal(true)
  }

  const handleEditClick = (index) => {
    const caseData = tableData[index]
    // If dateClosed is 'N/A', set it to null
    const dateClosed = caseData.dateClosed !== 'N/A' ? new Date(caseData.dateClosed) : null
    setFormData({ ...caseData, dateClosed })
    setEditIndex(index)
    setShowModal(true)
  }

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateClosed: date })
  }

  const handleDeleteClick = (index) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action will delete the case permanently.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33', // Red for the delete confirmation
      cancelButtonColor: '#3085d6', // Blue for cancel
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'text-white', // White text for confirm button
        cancelButton: 'text-white', // White text for cancel button
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteCase(tableData[index].id) // Delete the case via API using its ID
          const updatedData = tableData.filter((_, i) => i !== index)
          setTableData(updatedData)

          Swal.fire({
            text: 'The case has been deleted!',
            icon: 'success',
            toast: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
          })

        } catch (error) {
          Swal.fire('Error', 'An error occurred while deleting the case.', 'error')
        }
      }
    })
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  const handleDateReportedChange = (date) => {
    setFormData((prev) => ({ ...prev, date: date }))
  }
  const handleFormSubmit = async () => {
    try {
      if (editIndex !== null) {
        // Update case
        await updateCase(formData.id, formData) // Update the case via API
        const updatedData = [...tableData]
        updatedData[editIndex] = formData
        setTableData(updatedData)

        Swal.fire({
          text: 'Case updated successfully',
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      } else {
        // Create case
        await createCase(formData) // Create a new case via API
        setTableData([...tableData, formData])
        Swal.fire({
          text: 'Case added successfully',
          icon: 'success',
          toast: true,
          position: 'top-right',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        })
      }
      setShowModal(false)
    } catch (error) {
      Swal.fire({
        text: 'An error occurred while saving the case.',
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
      await deleteCase(tableData[deleteIndex].id) // Delete the case via API using its ID
      const updatedData = tableData.filter((_, index) => index !== deleteIndex)
      setTableData(updatedData)
      setShowDeleteConfirm(false)
      await Swal('Deleted!', 'Case has been deleted.', 'success')
    } catch (error) {
      await Swal('Error', 'An error occurred while deleting the case.', 'error')
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </CInputGroup>
        <CButton color="primary" onClick={handleAddClick} style={{ color: 'white' }}>
          <CIcon icon={cilPlus} className="me-2" style={{ color: 'white' }} />
          Add Case
        </CButton>
      </div>
      <CCard className="mb-4">
        <CCardBody>
          <CTable align="middle" className="table-sm mb-0 border table-hover" hover responsive>
            <CTableHead className="text-nowrap">
              <CTableRow>
                {[
                  'Date',
                  'Agent Name',
                  'District',
                  'T/A',
                  'GVH',
                  'Village',
                  'ID #',
                  'Issue Description',
                  'Case Category',
                  'Programme',
                  'Priority',
                  'Account #',
                  'Phone #',
                  'Nationality',
                  'Age',
                  'Gender',
                  'Disability',
                  'Comment',
                  'Status',
                  'Feedback',
                  'Date Closed',
                  'Actions',
                ].map((header) => (
                  <CTableHeaderCell key={header}>{header}</CTableHeaderCell>
                ))}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.map((caseItem, index) => (
                <CTableRow key={caseItem.id}>
                  {/* Render date */}
                  <CTableDataCell>{moment(caseItem.date).format('MM/DD/YYYY')}</CTableDataCell>
                  {/* Render agentName */}
                  <CTableDataCell>{caseItem.agentName}</CTableDataCell>
                  {/* Render district */}
                  <CTableDataCell>{caseItem.district}</CTableDataCell>
                  {/* Render ta (T/A) */}
                  <CTableDataCell>{caseItem.ta}</CTableDataCell>
                  {/* Render gvh (GVH) */}
                  <CTableDataCell>{caseItem.gvh}</CTableDataCell>
                  {/* Render village */}
                  <CTableDataCell>{caseItem.village}</CTableDataCell>
                  {/* Render idNumber */}
                  <CTableDataCell>{caseItem.idNumber}</CTableDataCell>
                  {/* Render issueDescription */}
                  <CTableDataCell>{caseItem.issueDescription}</CTableDataCell>
                  {/* Render caseCategory */}
                  <CTableDataCell>{caseItem.caseCategory}</CTableDataCell>
                  {/* Render programme */}
                  <CTableDataCell>{caseItem.programme}</CTableDataCell>
                  {/* Render priority */}
                  <CTableDataCell>{caseItem.priority}</CTableDataCell>
                  {/* Render accountNumber */}
                  <CTableDataCell>{caseItem.accountNumber}</CTableDataCell>
                  {/* Render phoneNumber */}
                  <CTableDataCell>{caseItem.phoneNumber}</CTableDataCell>
                  {/* Render nationality */}
                  <CTableDataCell>{caseItem.nationality}</CTableDataCell>
                  {/* Render age */}
                  <CTableDataCell>{caseItem.age}</CTableDataCell>
                  {/* Render gender */}
                  <CTableDataCell>{caseItem.gender}</CTableDataCell>
                  {/* Render disability */}
                  <CTableDataCell>{caseItem.disability}</CTableDataCell>
                  {/* Render comment */}
                  <CTableDataCell>{caseItem.comment}</CTableDataCell>
                  {/* Render status */}
                  <CTableDataCell>{caseItem.status}</CTableDataCell>
                  {/* Render feedback */}
                  <CTableDataCell>{caseItem.feedback}</CTableDataCell>
                  {/* Render dateClosed */}
                  <CTableDataCell>
                    {caseItem.dateClosed ? moment(caseItem.dateClosed).format('MM/DD/YYYY') : 'N/A'}
                  </CTableDataCell>
                  {/* Actions */}

                  {/* Actions */}
                  <CTableDataCell>
                    <div className="d-flex justify-content-between">
                      <CButton
                        color="info"
                        onClick={() => handleEditClick(index)}
                        style={{ color: 'white' }}
                        className="mx-2"
                      >
                        <CIcon icon={cilPencil} />
                      </CButton>
                      <CButton
                        color="danger"
                        onClick={() => handleDeleteClick(index)}
                        style={{ color: 'white' }}
                        className="mx-2"
                      >
                        <CIcon icon={cilTrash} />
                      </CButton>
                    </div>
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
          <CModalTitle>{editIndex !== null ? 'Edit Case' : 'Add Case'}</CModalTitle>
        </CModalHeader>

        <CModalBody style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <CForm>
            <CRow>
              {[
                'agentName',
                'ta',
                'gvh',
                'village',
                'idNumber',
                'issueDescription',
                'accountNumber',
                'phoneNumber',
                'nationality',
                'comment',
                'feedback',
              ].map((field) => (
                <CCol md={4} key={field}>
                  <CFormLabel htmlFor={field} className="form-label">
                    {capitalizeWords(field.replace(/([A-Z])/g, ' $1').trim())}
                  </CFormLabel>
                  <CFormInput
                    type="text"
                    id={field}
                    name={field}
                    value={formData[field] || ''}
                    onChange={handleFormChange}
                  />
                </CCol>
              ))}

              <CCol md={4}>
                <CFormLabel htmlFor="district" className="form-label">
                  District
                </CFormLabel>
                <CFormSelect
                  id="district"
                  name="district"
                  value={formData.district || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="programme" className="form-label">
                  Programme
                </CFormLabel>
                <CFormSelect
                  id="programme"
                  name="programme"
                  value={formData.programme || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select Programme</option>
                  <option value="Programme">Programme</option>
                  <option value="School Meals">School Meals</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="priority" className="form-label">
                  Priority
                </CFormLabel>
                <CFormSelect
                  id="priority"
                  name="priority"
                  value={formData.priority || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select Priority</option>
                  {priorities.map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="age" className="form-label">
                  Age
                </CFormLabel>
                <CFormInput
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age || 0}
                  onChange={handleFormChange}
                />
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="disability" className="form-label">
                  Disability
                </CFormLabel>
                <CFormSelect
                  id="disability"
                  name="disability"
                  value={formData.disability || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="gender" className="form-label">
                  Gender
                </CFormLabel>
                <CFormSelect
                  id="gender"
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="date" className="form-label">
                  Date Reported
                </CFormLabel>
                <ReactDatePicker
                  selected={formData.date ? new Date(formData.date) : null}
                  onChange={handleDateReportedChange}
                  className="form-control"
                  placeholderText="Select date"
                  dateFormat="MM/dd/yyyy"
                />
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="caseCategory" className="form-label">
                  Case Category
                </CFormLabel>
                <CFormSelect
                  id="caseCategory"
                  name="caseCategory"
                  value={formData.caseCategory || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select Case Category</option>
                  {caseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="status" className="form-label">
                  Status
                </CFormLabel>
                <CFormSelect
                  id="status"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleFormChange}
                >
                  <option value="">Select Status</option>
                  {status.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>

              <CCol md={4}>
                <CFormLabel htmlFor="dateClosed" className="form-label">
                  Date Closed
                </CFormLabel>
                <ReactDatePicker
                  selected={formData.dateClosed ? new Date(formData.dateClosed) : null}
                  onChange={handleDateChange}
                  className="form-control"
                  placeholderText="Select date"
                  dateFormat="MM/dd/yyyy"
                />
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleFormSubmit}>
            Save
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Confirmation modal for deletion */}
      <CModal visible={showDeleteConfirm} onClose={() => setShowDeleteConfirm(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Confirm Deletion</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure you want to delete this case?</CModalBody>
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

export default AdminCases
