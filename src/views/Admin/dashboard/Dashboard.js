import React, { useState } from 'react'
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
} from '@coreui/react'
import WidgetsDropdown from '../../widgets/WidgetsDropdown'

// Example data array for table rows
const tableData = [
  {
    date: '2024-11-01',
    agentName: 'John Doe',
    district: 'District A',
    ta: 'TA Example',
    gvh: 'GVH Example',
    village: 'Community X',
    idNumber: '123456789',
    issueDescription: 'Issue description example',
    caseCategory: 'Category A',
    programme: 'Programme X',
    priority: 'High',
    accountNumber: 'ACC123456',
    phoneNumber: '123-456-7890',
    nationality: 'Country Y',
    age: 34,
    gender: 'Male',
    disability: 'No',
    comment: 'Comment example',
    status: 'Open',
    feedback: 'Pending feedback',
    dateClosed: 'N/A',
  },
  // Add more data objects as needed
]

// Customizable page size
const pageSize = 5

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate the number of pages
  const totalPages = Math.ceil(tableData.length / pageSize)

  // Get the current data to display
  const currentData = tableData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )



  return (
    <>
      <WidgetsDropdown className="mb-4" />


    </>
  )
}

export default Dashboard
