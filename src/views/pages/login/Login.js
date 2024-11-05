import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Swal from 'sweetalert2' // Import Swal
import feedbackImage from '../../../assets/wfp-logo-emblem-white.png' // Adjust the path as needed
import { login } from '../../../api/authService' // Import the login function

const Login = () => {
  const navigate = useNavigate() // Initialize the useNavigate hook
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const userData = await login(username, password)

      const userRole = userData.user?.role?.id
      const userEmail = userData.user?.email

      // Save user role to localStorage
      localStorage.setItem('userRole', userRole)

      localStorage.setItem('userEmail', userEmail)
      localStorage.setItem('token', userData.token.id)

      Swal.fire({
        text: 'Successfully signed in',
        icon: 'success',
        toast: true,
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })

      // Redirect based on user role
      if (userRole === 'ADMIN1') {
        navigate('/dashboard')
      } else if (userRole === 'ADMIN2') {
        navigate('/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        toast: true,
        text: 'Login Failed!, Please check your credentials and try again.',
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>CFM Manager</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          style={{ backgroundColor: '#212631' }}
                          type="submit"
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5"
                style={{ width: '44%', backgroundColor: '#212631' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign in</h2>
                    <p>
                      <img
                        src={feedbackImage}
                        alt="CFM Manager"
                        style={{
                          width: '200px',
                          height: '200px',
                          padding: '10px',
                          borderRadius: '8px',
                        }}
                      />
                    </p>
                    <h6>CFM Manager | WFP Malawi M&E Unit</h6>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
