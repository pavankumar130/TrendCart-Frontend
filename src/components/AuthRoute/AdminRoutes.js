import React from 'react'
import Login from '../Users/Forms/Login'

const AdminRoute = ({ children }) => {
  //get user from localstorage
  const user = JSON.parse(localStorage.getItem('userInfo'))
  const isAdmin = user?.userFound?.isAdmin ? true : false
  if (!isAdmin) {
    return <h1>Access Denied , Admin only</h1>
  }
  return <>{children}</>
}

export default AdminRoute
