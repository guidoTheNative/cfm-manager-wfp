import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { AppSidebarNav } from './AppSidebarNav'
import { logo } from 'src/assets/brand/logo'
import navigation from '../_nav'

// Import custom CSS for sidebar styling
import '../assets/css/AppSidebar.css'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end custom-sidebar shadow-sm"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom bg-dark">
        <CSidebarBrand to="/" className="d-flex align-items-center p-3">
          <CIcon customClassName="sidebar-brand-full" icon={logo} height={40} className="me-2" />
          <CIcon
            className="ml-7"
            customClassName="sidebar-brand-narrow sidebar-narrow"
            icon={logo}
            height={80}
          />

          {/* Align and modernize the header text */}
          {!unfoldable && (
            <span
              className="text-white fw-bold fs-5 d-inline-block text-truncate"
              style={{ textDecoration: 'none' }} // Ensures the text is not underlined
            >
              CFM Manager
            </span>
          )}
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          buttonType="button"
          color="white"
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top bg-dark d-none d-lg-flex justify-content-center p-3">
        <CSidebarToggler
          className="text-white"
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
