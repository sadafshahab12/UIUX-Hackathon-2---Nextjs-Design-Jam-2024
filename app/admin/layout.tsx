import React from 'react'
import Dashboard from './component/Dashboard'

const AdminLayout = ({children} : {children : React.ReactNode}) => {
  return (
    <div>
      <Dashboard/>
      <main>{children}</main>
    </div>
  )
}

export default AdminLayout
